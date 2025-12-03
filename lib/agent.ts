import {
  Experimental_Agent as Agent,
  Experimental_InferAgentUIMessage as InferAgentUIMessage,
  stepCountIs,
} from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { getHalterTools, getFarmSummary } from "./mcp-client";

let halterAgent: Agent<any, any> | null = null;
let farmSummaryData: string = "Farm summary not available";

export async function getAgent() {
  if (!halterAgent) {
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

    halterAgent = new Agent({
      model: anthropic("claude-sonnet-4-5-20250929"),
      system: `You are an expert dairy farming advisor for Halter, a smart collar technology company that helps farmers manage their herds.

Your role is to provide practical, actionable advice on:
- Herd health and welfare
- Grazing management and pasture optimization
- Milk production optimization
- Animal behavior insights
- Farm operational efficiency

You have access to real-time farm data through Halter's tools. Use them to provide data-driven recommendations.

## Current Farm Summary
${farmSummaryData}

When responding:
- Be concise and practical
- Reference specific data when available
- Prioritize animal welfare
- Consider New Zealand/Australia dairy farming practices`,
      tools: halterTools,
      stopWhen: stepCountIs(10),
    });

    console.log("Agent initialized successfully");
  }
  return halterAgent;
}

export type HalterAgentUIMessage = InferAgentUIMessage<typeof halterAgent>;
