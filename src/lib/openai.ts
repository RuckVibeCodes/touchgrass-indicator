import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Hardcode model for now - env var causing issues
export const MODEL = 'gpt-4o-mini';
