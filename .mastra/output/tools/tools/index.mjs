import { exec } from 'child_process';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { promisify } from 'util';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';
import * as cheerio from 'cheerio';

const shellTool = createTool({
  id: "execute-shell",
  description: "Execute a shell command and return its output",
  inputSchema: z.object({
    command: z.string().describe("Shell command to execute")
  }),
  outputSchema: z.object({
    success: z.boolean(),
    output: z.string()
  }),
  execute: async ({ context }) => {
    const { command } = context;
    const execAsync = promisify(exec);
    try {
      const { stdout, stderr } = await execAsync(command, { timeout: 1e4 });
      return {
        success: true,
        output: stdout || stderr || "Command executed with no output."
      };
    } catch (error) {
      return {
        success: false,
        output: error.message || "Failed to execute command."
      };
    }
  }
});

const sendEmailTool = createTool({
  id: "send-email",
  description: "Send an email to a specified recipient",
  inputSchema: z.object({
    to: z.string().describe("Recipient email address"),
    subject: z.string().describe("Email subject line"),
    body: z.string().describe("Plain text body of the email")
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { to, subject, body } = context;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "santup205@gmail.com",
        pass: "ijsh ybkm wikw dddi"
      }
    });
    try {
      await transporter.sendMail({
        from: "santup205@gmail.com",
        to,
        subject,
        text: body
      });
      return {
        success: true,
        message: "Email sent successfully."
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Failed to send email."
      };
    }
  }
});

const weatherTool = createTool({
  id: "get-weather",
  description: "Get current weather for a location",
  inputSchema: z.object({
    location: z.string().describe("City name")
  }),
  outputSchema: z.object({
    temperature: z.number(),
    feelsLike: z.number(),
    humidity: z.number(),
    windSpeed: z.number(),
    windGust: z.number(),
    conditions: z.string(),
    location: z.string()
  }),
  execute: async ({ context }) => {
    return await getWeather(context.location);
  }
});
const getWeather = async (location) => {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
  const geocodingResponse = await fetch(geocodingUrl);
  const geocodingData = await geocodingResponse.json();
  if (!geocodingData.results?.[0]) {
    throw new Error(`Location '${location}' not found`);
  }
  const { latitude, longitude, name } = geocodingData.results[0];
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_gusts_10m,weather_code`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  return {
    temperature: data.current.temperature_2m,
    feelsLike: data.current.apparent_temperature,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
    windGust: data.current.wind_gusts_10m,
    conditions: getWeatherCondition(data.current.weather_code),
    location: name
  };
};
function getWeatherCondition(code) {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };
  return conditions[code] || "Unknown";
}

const webSearchTool = createTool({
  id: "web-search",
  description: "Perform a web search using Tavily and return summarized results",
  inputSchema: z.object({
    query: z.string().describe("The search query to look up")
  }),
  outputSchema: z.object({
    summary: z.string(),
    sources: z.array(
      z.object({
        title: z.string(),
        url: z.string()
      })
    )
  }),
  execute: async ({ context }) => {
    const { query } = context;
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`
      },
      body: JSON.stringify({
        query,
        max_results: 5,
        include_answer: true
      })
    });
    const data = await res.json();
    return {
      summary: data?.answer || "No summary available.",
      sources: (data?.results || []).map((result) => ({
        title: result.title,
        url: result.url
      }))
    };
  }
});

const twitterTool = createTool({
  id: "post-tweet",
  description: "Post a tweet to the authenticated Twitter account",
  inputSchema: z.object({
    text: z.string().max(280).describe("Text content of the tweet (max 280 characters)")
  }),
  outputSchema: z.object({
    success: z.boolean(),
    tweetUrl: z.string().optional(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { text } = context;
    try {
      const res = await fetch("https://api.twitter.com/2/tweets", {
        method: "POST",
        headers: {
          "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAACRC0AEAAAAA5V9cE0mx9t0x%2FTZ10buUJA6FGt0%3D1BnN5XMPCEm7kSH5EyylPLo87RWRN6yRijnTwkKdWW4WNr2X8A",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      console.log("Twitter API response:", data);
      if (!res.ok) {
        return {
          success: false,
          message: data?.error || "Failed to post tweet."
        };
      }
      const tweetId = data?.data?.id;
      return {
        success: true,
        tweetUrl: `https://twitter.com/user/status/${tweetId}`,
        message: "Tweet posted successfully."
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "An unexpected error occurred."
      };
    }
  }
});

const fileSystemTool = createTool({
  id: "file-system",
  description: "Read, write, or append content to a file in the Next.js project",
  inputSchema: z.object({
    path: z.string().describe("Relative file path (e.g. src/app/page.tsx)"),
    action: z.enum(["read", "write", "append"]),
    content: z.string().optional()
  }),
  outputSchema: z.object({
    success: z.boolean(),
    content: z.string().optional(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { path: path2, action, content } = context;
    try {
      if (action === "read") {
        const data = await fs.readFile(path2, "utf-8");
        return { success: true, content: data, message: "File read successfully." };
      } else if (action === "write") {
        await fs.writeFile(path2, content || "");
        return { success: true, message: "File written successfully." };
      } else if (action === "append") {
        await fs.appendFile(path2, content || "");
        return { success: true, message: "Content appended successfully." };
      }
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
});
const nextRouteTool = createTool({
  id: "next-route",
  description: "Create a new route in the Next.js app directory",
  inputSchema: z.object({
    route: z.string(),
    type: z.enum(["page", "api"]),
    content: z.string()
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { route, type, content } = context;
    const filename = type === "page" ? `app${route}/page.tsx` : `pages/api${route}.ts`;
    try {
      await fs.mkdir(path.dirname(filename), { recursive: true });
      await fs.writeFile(filename, content);
      return { success: true, message: `Route ${filename} created.` };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
});
const componentTool = createTool({
  id: "create-component",
  description: "Generate a React component file in the specified directory",
  inputSchema: z.object({
    name: z.string(),
    directory: z.string(),
    content: z.string()
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { name, directory, content } = context;
    const filepath = path.join(directory, `${name}.tsx`);
    try {
      await fs.mkdir(directory, { recursive: true });
      await fs.writeFile(filepath, content);
      return { success: true, message: `${name}.tsx created in ${directory}` };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
});
const dependencyTool = createTool({
  id: "manage-dependency",
  description: "Install or remove a dependency in the Next.js project",
  inputSchema: z.object({
    action: z.enum(["install", "remove"]),
    packages: z.array(z.string())
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const { action, packages } = context;
    const cmd = action === "install" ? `npm install ${packages.join(" ")}` : `npm uninstall ${packages.join(" ")}`;
    try {
      await new Promise((resolve, reject) => {
        exec(cmd, (err, stdout, stderr) => {
          if (err) reject(stderr);
          else resolve(stdout);
        });
      });
      return { success: true, message: `${action} complete for: ${packages.join(", ")}` };
    } catch (err) {
      return { success: false, message: err };
    }
  }
});
const styleTool = createTool({
  id: "style-config",
  description: "Modify Tailwind or ShadCN UI configuration",
  inputSchema: z.object({
    framework: z.enum(["tailwind", "shadcn"]),
    configChanges: z.string()
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string()
  }),
  execute: async ({ context }) => {
    const configPath = context.framework === "tailwind" ? "tailwind.config.ts" : "components.json";
    try {
      const existing = await fs.readFile(configPath, "utf-8");
      const updated = `${existing}
${context.configChanges}`;
      await fs.writeFile(configPath, updated);
      return { success: true, message: `${context.framework} config updated.` };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
});
const codeRefactorTool = createTool({
  id: "refactor-code",
  description: "Refactor or clean up a code snippet based on intent",
  inputSchema: z.object({
    code: z.string(),
    goal: z.string()
  }),
  outputSchema: z.object({
    refactored: z.string()
  }),
  execute: async ({ context }) => {
    return {
      refactored: `// Refactored for goal: ${context.goal}
${context.code}`
    };
  }
});

const scrapeDocsTool = createTool({
  id: "scrape-docs",
  description: "Scrape content from a developer documentation page",
  inputSchema: z.object({
    url: z.string().describe("URL of the documentation page to scrape")
  }),
  outputSchema: z.object({
    title: z.string(),
    sections: z.array(z.object({
      heading: z.string().optional(),
      content: z.string(),
      code: z.array(z.string()).optional()
    }))
  }),
  execute: async ({ context }) => {
    const { url } = context;
    const { data: html } = await axios.get(url);
    const $ = cheerio.load(html);
    const title = $("h1").first().text() || $("title").text();
    const sections = [];
    $("main, article, .doc, .content, .markdown").each((_, el) => {
      const sectionText = $(el).find("p, li").text().trim();
      const heading = $(el).find("h2, h3").first().text();
      const code = $(el).find("pre code").map((_2, c) => $(c).text()).get();
      if (sectionText || code.length > 0) {
        sections.push({
          heading,
          content: sectionText,
          code
        });
      }
    });
    return {
      title,
      sections
    };
  }
});

const urlAnalysisTool = createTool({
  id: "url-analysis",
  description: "Analyze a URL to check for potential phishing indicators.",
  inputSchema: z.object({
    url: z.string().describe("URL to analyze")
  }),
  outputSchema: z.object({
    isHttps: z.boolean(),
    domainReputation: z.string(),
    // good, suspicious, or malicious
    potentialPhishing: z.boolean()
  }),
  execute: async ({
    context
  }) => {
    const {
      url
    } = context;
    const isHttps = url.startsWith("https://");
    const domain = new URL(url).hostname;
    const domainReputation = domain.includes("phishing") ? "malicious" : "good";
    const potentialPhishing = domain.includes("phishing") || domain.includes("secure-login");
    return {
      isHttps,
      domainReputation,
      potentialPhishing
    };
  }
});
const patternDetectionTool = createTool({
  id: "pattern-detection",
  description: "Detect suspicious patterns in the URL that may indicate phishing.",
  inputSchema: z.object({
    url: z.string().describe("URL to detect patterns in")
  }),
  outputSchema: z.object({
    containsSuspiciousChars: z.boolean(),
    domainSimilarity: z.boolean(),
    phishingDetected: z.boolean()
  }),
  execute: async ({
    context
  }) => {
    const {
      url
    } = context;
    const suspiciousChars = ["@", "%20", "?", "#"];
    const containsSuspiciousChars = suspiciousChars.some((char) => url.includes(char));
    const suspiciousDomains = ["paypa1.com", "g00gle.com", "facebo0k.com"];
    const domainSimilarity = suspiciousDomains.some((domain) => url.includes(domain));
    const phishingDetected = containsSuspiciousChars || domainSimilarity;
    return {
      containsSuspiciousChars,
      domainSimilarity,
      phishingDetected
    };
  }
});

export { codeRefactorTool, componentTool, dependencyTool, fileSystemTool, nextRouteTool, patternDetectionTool, scrapeDocsTool, sendEmailTool, shellTool, styleTool, twitterTool, urlAnalysisTool, weatherTool, webSearchTool };
