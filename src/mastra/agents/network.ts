import { AgentNetwork } from '@mastra/core/network';
import { emailAgent,docsAgent } from '.';
import { google } from '@ai-sdk/google';
import { Memory } from '@mastra/memory';

export const researchNetwork = new AgentNetwork({
    name: 'Research Network',
    instructions: 'Coordinate specialized agents to research docs thoroughly and write a good email.',
    model: google('gemini-2.0-flash'),
    agents: [emailAgent, docsAgent],
    memory: new Memory()
  });