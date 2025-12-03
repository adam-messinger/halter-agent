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
let farmSummaryData: string = "Farm summary not available";

// Load the system prompt from the prompts directory
function loadSystemPrompt(farmSummary: string): string {
  try {
    const promptPath = join(process.cwd(), "prompts", "system.md");
    console.log("Loading system prompt from:", promptPath);
    let prompt = readFileSync(promptPath, "utf-8");

    // Replace the farm summary placeholder
    const hasFarmSummary = prompt.includes("{{FARM_SUMMARY}}");
    console.log("Prompt contains {{FARM_SUMMARY}} placeholder:", hasFarmSummary);
    console.log("Farm summary length:", farmSummary.length, "characters");

    prompt = prompt.replace("{{FARM_SUMMARY}}", farmSummary);

    console.log("System prompt loaded successfully, total length:", prompt.length, "characters");
    return prompt;
  } catch (error) {
    console.error("Failed to load system prompt:", error);
    // Fallback to a basic prompt if file can't be loaded
    return `You are a dairy farming advisor for Halter. Help farmers with their herd management.

## Current Farm Summary
${farmSummary}`;
  }
}

async function createAgent() {
  console.log("Initializing Halter Agent...");

  // Try to fetch farm summary, but don't fail if it doesn't work
  try {
    console.log("Fetching farm summary...");
    const farmSummary = await getFarmSummary();
    farmSummaryData = JSON.stringify(farmSummary, null, 2);
    console.log("Farm summary fetched successfully");
  } catch (error) {
    console.error("Failed to fetch farm summary:", error);
    farmSummaryData = "Farm summary could not be loaded";
  }

  // Get all Halter tools from MCP server
  console.log("Fetching Halter tools...");
  const halterTools = await getHalterTools();
  console.log("Halter tools fetched:", Object.keys(halterTools));

  // Load the system prompt from file
  const systemPrompt = loadSystemPrompt(farmSummaryData);

  const agent = new Agent({
    model: anthropic("claude-sonnet-4-5-20250929"),
    system: systemPrompt,
    tools: halterTools,
    stopWhen: stepCountIs(10),
  });

  console.log("Agent initialized successfully");
  return agent;
}

export async function getAgent() {
  if (!halterAgent) {
    halterAgent = await createAgent();
  }
  return halterAgent;
}

export type HalterAgentUIMessage = InferAgentUIMessage<typeof halterAgent>;
