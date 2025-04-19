

import { createTool } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { z } from 'zod';
import { Mastra } from '@mastra/core/mastra';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
const google = createGoogleGenerativeAI({apiKey:"AIzaSyAVQpop5MJZpJg2x3DhEfWs4nCFmOQ-Op0"});
const copywriterAgent = new Agent({
  name: "Copywriter",
  instructions: "You are a copywriter agent that writes blog post copy.",
  model: google('models/gemini-2.5-pro-exp-03-25'),
});
 
const copywriterTool = createTool({
  id: "copywriter-agent",
  description: "Calls the copywriter agent to write blog post copy.",
  inputSchema: z.object({
    topic: z.string().describe("Blog post topic"),
  }),
  outputSchema: z.object({
    copy: z.string().describe("Blog post copy"),
  }),
  execute: async ({ context }) => {
    const result = await copywriterAgent.generate(
      `Create a blog post about ${context.topic}`,
    );
    return { copy: result.text };
  },
});
const editorAgent = new Agent({
    name: "Editor",
    instructions: "You are an editor agent that edits blog post copy.",
    model: google('models/gemini-2.0-flash'),
  });
   
  const editorTool = createTool({
    id: "editor-agent",
    description: "Calls the editor agent to edit blog post copy.",
    inputSchema: z.object({
      copy: z.string().describe("Blog post copy"),
    }),
    outputSchema: z.object({
      copy: z.string().describe("Edited blog post copy"),
    }),
    execute: async ({ context }) => {
      const result = await editorAgent.generate(
        `Edit the following blog post only returning the edited copy: ${context.copy}`,
      );
      return { copy: result.text };
    },
  });
  const publisherAgent = new Agent({
    name: "publisherAgent",
    instructions:
      "You are a publisher agent that first calls the copywriter agent to write blog post copy about a specific topic and then calls the editor agent to edit the copy. Just return the final edited copy.",
    model: google('models/gemini-2.5-pro-exp-03-25'),
    tools: { copywriterTool, editorTool },
  });
   
  const mastra = new Mastra({
    agents: { publisherAgent },
  });
  async function main() {
    const agent = mastra.getAgent("publisherAgent");
    const result = await agent.generate(
      "Write a blog post about React JavaScript frameworks. Only return the final edited copy.",
    );
    console.log(result.text);
  }
   
  main();