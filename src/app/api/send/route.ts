import { mastra } from '@/mastra'
import { NextResponse } from 'next/server'
 
export async function POST(req: Request) {
  const { messages } = await req.json()
  const agent = mastra.getAgent('emailAgent')
 
  const result = await agent.stream(messages)
 
  return result.toDataStreamResponse()
}