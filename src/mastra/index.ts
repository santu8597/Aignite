
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent,shellAgent,twitterAgent,emailAgent,nextjsAgent,docsAgent,phishingDetectorAgent,fraudMailDetectorAgent,audioAnalysisAgent } from './agents';
import {recommendationWorkflow} from './workflows/app';
import { mcpAgent } from './agents/mcp';
import { researchNetwork } from './agents/network';
export const mastra = new Mastra({
  workflows: { weatherWorkflow ,recommendationWorkflow},
  agents: { weatherAgent,shellAgent,twitterAgent,emailAgent,nextjsAgent,docsAgent,phishingDetectorAgent,fraudMailDetectorAgent,audioAnalysisAgent,mcpAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
  networks:{
    researchNetwork,
  }
 
});
