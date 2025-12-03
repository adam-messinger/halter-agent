import {
  Experimental_Agent as Agent,
  Experimental_InferAgentUIMessage as InferAgentUIMessage,
  stepCountIs,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { getHalterTools, getFarmSummary } from "./mcp-client";
import { readFileSync } from "fs";
import { join } from "path";

type HalterAgent = Awaited<ReturnType<typeof createAgent>>;
let halterAgent: HalterAgent | null = null;

// Cache the system prompt template
let systemPromptTemplate: string | null = null;

function getSystemPromptTemplate(): string {
  if (!systemPromptTemplate) {
    try {
      const promptPath = join(process.cwd(), "prompts", "system.md");
      systemPromptTemplate = readFileSync(promptPath, "utf-8");
    } catch (error) {
      console.error("Failed to load system prompt:", error);
      systemPromptTemplate = `You are a dairy farming advisor for Halter. Help farmers with their herd management.

## Current Farm Summary
{{FARM_SUMMARY}}`;
    }
  }
  return systemPromptTemplate;
}

function buildSystemPrompt(farmSummary: string): string {
  return getSystemPromptTemplate().replace("{{FARM_SUMMARY}}", farmSummary);
}

async function createAgent() {
  // Fetch tools and farm summary in parallel for faster initialization
  const [halterTools, farmSummaryResult] = await Promise.all([
    getHalterTools(),
    getFarmSummary().catch(() => null),
  ]);

  const farmSummaryData = farmSummaryResult
    ? JSON.stringify(farmSummaryResult, null, 2)
    : "Farm summary could not be loaded";

  const systemPrompt = buildSystemPrompt(farmSummaryData);

  return new Agent({
    model: anthropic("claude-sonnet-4-5-20250929"),
    system: systemPrompt,
    tools: halterTools,
    stopWhen: stepCountIs(10),
    maxOutputTokens: 8192,
  });
}

export async function getAgent() {
  if (!halterAgent) {
    halterAgent = await createAgent();
  }
  return halterAgent;
}

export type HalterAgentUIMessage = InferAgentUIMessage<typeof halterAgent>;
