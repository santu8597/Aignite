import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import axios from 'axios';

export const emailHeaderAnalysisTool = createTool({
  id: 'email-header-analysis',
  description: 'Analyze email headers to detect suspicious senders or authentication issues.',
  inputSchema: z.object({
    sender: z.string().describe('Email sender address'),
    subject: z.string().describe('Subject of the email'),
    headers: z.string().describe('Full email headers'),
  }),
  outputSchema: z.object({
    isSuspiciousSender: z.boolean(),
    isMissingAuth: z.boolean(),
    domainReputation: z.string(),
  }),
  execute: async ({ context }) => {
    const { sender, headers } = context;
    
    // Check for suspicious sender (e.g., suspicious domains)
    const suspiciousDomains = ['@phishing.com', '@fraud.com'];
    const domain = sender.split('@')[1];
    const isSuspiciousSender = suspiciousDomains.includes(domain);
    
    // Placeholder for checking missing authentication (e.g., SPF, DKIM, DMARC)
    const isMissingAuth = !headers.includes('SPF=pass') && !headers.includes('DKIM=pass');
    
    // Dummy domain reputation check (can be replaced with a real service)
    const domainReputation = domain.includes('fraud') ? 'malicious' : 'good';
    
    return {
      isSuspiciousSender,
      isMissingAuth,
      domainReputation,
    };
  },
});


export const emailContentAnalysisTool = createTool({
  id: 'email-content-analysis',
  description: 'Analyze the email body for phishing indicators, such as suspicious links or urgent language.',
  inputSchema: z.object({
    body: z.string().describe('Full email body'),
    sender: z.string().describe('Sender email address'),
  }),
  outputSchema: z.object({
    containsSuspiciousLinks: z.boolean(),
    containsUrgentLanguage: z.boolean(),
    phishingDetected: z.boolean(),
  }),
  execute: async ({ context }) => {
    const { body, sender } = context;
    
    // Check for suspicious links (URLs that don’t match the sender’s domain)
    const links = body.match(/https?:\/\/[^\s]+/g) || [];
    const containsSuspiciousLinks = links.some(link => !link.includes(sender.split('@')[1]));
    
    // Check for urgent language
    const urgentKeywords = ['urgent', 'verify immediately', 'act now', 'important action required'];
    const containsUrgentLanguage = urgentKeywords.some(keyword => body.toLowerCase().includes(keyword));
    
    // If any suspicious links or urgent language found, flag it
    const phishingDetected = containsSuspiciousLinks || containsUrgentLanguage;
    
    return {
      containsSuspiciousLinks,
      containsUrgentLanguage,
      phishingDetected,
    };
  },
});
