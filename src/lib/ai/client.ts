/**
 * OpenAI Client for TouchGrass Indicator
 */

import OpenAI from 'openai'
import type { AIModel, AIResponse } from './types'

let clientInstance: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  if (!clientInstance) {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is required')
    }
    clientInstance = new OpenAI({ apiKey })
  }
  return clientInstance
}

export const DEFAULT_VISION_MODEL: AIModel = 'gpt-4o'
export const DEFAULT_TEMPERATURE = 0.7
export const DEFAULT_MAX_TOKENS = 1500

/**
 * Vision completion for chart analysis
 */
export async function visionCompletion<T>(
  systemPrompt: string,
  imageBase64: string,
  textPrompt: string,
  options: {
    temperature?: number
    maxTokens?: number
  } = {}
): Promise<AIResponse<T>> {
  const startTime = Date.now()
  const model = DEFAULT_VISION_MODEL
  const temperature = options.temperature ?? DEFAULT_TEMPERATURE
  const maxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS

  try {
    const client = getOpenAIClient()

    // Ensure proper data URL format
    const imageUrl = imageBase64.startsWith('data:')
      ? imageBase64
      : `data:image/png;base64,${imageBase64}`

    const completion = await client.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: imageUrl } },
            { type: 'text', text: textPrompt },
          ],
        },
      ],
      temperature,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      return {
        success: false,
        error: { code: 'API_ERROR', message: 'No response from OpenAI' },
        meta: { model, latencyMs: Date.now() - startTime, timestamp: new Date().toISOString() },
      }
    }

    let data: T
    try {
      data = JSON.parse(responseText) as T
    } catch {
      return {
        success: false,
        error: { code: 'PARSE_ERROR', message: 'Failed to parse AI response' },
        meta: { model, latencyMs: Date.now() - startTime, timestamp: new Date().toISOString() },
      }
    }

    return {
      success: true,
      data,
      meta: {
        model,
        tokensUsed: completion.usage?.total_tokens,
        latencyMs: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: 'API_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      meta: { model, latencyMs: Date.now() - startTime, timestamp: new Date().toISOString() },
    }
  }
}
