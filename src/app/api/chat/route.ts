import { mastra } from "@/mastra";
 import { mastraClient } from '@/lib/mastra'
export async function POST(req: Request) {
  const { messages } = await req.json();
  const agent = mastraClient.getAgent('shellAgent')
  const stream = await agent.stream(messages);
 
  return stream;
}