import { NextRequest, NextResponse } from 'next/server';
import { verifyWhopWebhook, type WhopWebhookPayload, getPlanType } from '@/lib/whop';

/**
 * Whop Webhook Handler
 * 
 * Handles subscription events from Whop:
 * - membership.went_valid: User subscribed or renewed
 * - membership.went_invalid: Subscription expired/canceled
 * - payment.succeeded: Payment processed
 * - payment.failed: Payment failed
 * 
 * TODO: Connect to Supabase to sync user subscription status
 */

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text();
    const signature = req.headers.get('x-whop-signature') || '';

    // Verify webhook signature
    const isValid = await verifyWhopWebhook(payload, signature);
    if (!isValid) {
      console.error('Invalid Whop webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: WhopWebhookPayload = JSON.parse(payload);
    console.log('Whop webhook received:', event.event);

    switch (event.event) {
      case 'membership.went_valid':
        await handleMembershipValid(event);
        break;

      case 'membership.went_invalid':
        await handleMembershipInvalid(event);
        break;

      case 'membership.created':
        await handleMembershipCreated(event);
        break;

      case 'payment.succeeded':
        await handlePaymentSucceeded(event);
        break;

      case 'payment.failed':
        await handlePaymentFailed(event);
        break;

      default:
        console.log('Unhandled webhook event:', event.event);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Whop webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleMembershipValid(event: WhopWebhookPayload) {
  const membership = event.data.membership;
  if (!membership) return;

  const userId = membership.user.id;
  const email = membership.user.email;
  const planType = getPlanType(membership.product_id);
  const affiliatePageId = membership.affiliate_page_id;

  console.log('Membership activated:', {
    userId,
    email,
    planType,
    hasAffiliate: !!affiliatePageId,
  });

  // TODO: Update user in Supabase
  // await supabase.from('users').upsert({
  //   whop_user_id: userId,
  //   email,
  //   tier: 'pro',
  //   plan_type: planType,
  //   subscription_status: 'active',
  //   whop_membership_id: membership.id,
  //   updated_at: new Date().toISOString(),
  // });

  // TODO: If affiliate, credit the referrer
  // if (affiliatePageId) {
  //   await creditAffiliate(affiliatePageId, planType);
  // }
}

async function handleMembershipInvalid(event: WhopWebhookPayload) {
  const membership = event.data.membership;
  if (!membership) return;

  console.log('Membership invalidated:', membership.user.id);

  // TODO: Update user in Supabase
  // await supabase.from('users').update({
  //   tier: 'free',
  //   subscription_status: 'expired',
  //   updated_at: new Date().toISOString(),
  // }).eq('whop_user_id', membership.user.id);
}

async function handleMembershipCreated(event: WhopWebhookPayload) {
  const membership = event.data.membership;
  if (!membership) return;

  console.log('New membership created:', {
    userId: membership.user.id,
    email: membership.user.email,
  });

  // TODO: Create user record if doesn't exist
  // This is often followed by membership.went_valid
}

async function handlePaymentSucceeded(event: WhopWebhookPayload) {
  const payment = event.data.payment;
  if (!payment) return;

  console.log('Payment succeeded:', {
    amount: payment.amount,
    currency: payment.currency,
    membershipId: payment.membership_id,
  });

  // TODO: Log payment for analytics
  // await supabase.from('payments').insert({
  //   whop_payment_id: payment.id,
  //   membership_id: payment.membership_id,
  //   amount: payment.amount,
  //   currency: payment.currency,
  //   status: 'succeeded',
  //   created_at: new Date().toISOString(),
  // });
}

async function handlePaymentFailed(event: WhopWebhookPayload) {
  const payment = event.data.payment;
  if (!payment) return;

  console.log('Payment failed:', payment.membership_id);

  // TODO: Log failed payment, maybe send notification
  // await supabase.from('payments').insert({
  //   whop_payment_id: payment.id,
  //   membership_id: payment.membership_id,
  //   amount: payment.amount,
  //   currency: payment.currency,
  //   status: 'failed',
  //   created_at: new Date().toISOString(),
  // });
}

// For Whop to verify endpoint is live
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'whop-webhook' });
}
