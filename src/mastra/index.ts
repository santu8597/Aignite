
import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { weatherAgent,shellAgent,twitterAgent,emailAgent,nextjsAgent,docsAgent,phishingDetectorAgent,fraudMailDetectorAgent } from './agents';
import {recommendationWorkflow} from './workflows/app';
export const mastra = new Mastra({
  workflows: { weatherWorkflow ,recommendationWorkflow},
  agents: { weatherAgent,shellAgent,twitterAgent,emailAgent,nextjsAgent,docsAgent,phishingDetectorAgent,fraudMailDetectorAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
