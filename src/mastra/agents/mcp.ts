import { MCPConfiguration } from "@mastra/mcp";
import { Agent } from "@mastra/core/agent";
import { google } from '@ai-sdk/google';
import { Memory } from '@mastra/memory';
const mcp = new MCPConfiguration({
  servers: {
    mcp_project: {
      url: new URL("http://localhost:3001/sse"),
    },
    // mastra: {
    //     command: 'npx',
    //     args: ['-y', '@mastra/mcp-docs-server@latest'],
    //   },
  },
});

export const mcpAgent = new Agent({
    name: "mcp Agent",
    instructions: "You are a expert in writing mastra code",
    model: google("gemini-2.0-flash"),
    tools: await mcp.getTools(),
    memory:new Memory() // Tools are fixed at agent creation
  });