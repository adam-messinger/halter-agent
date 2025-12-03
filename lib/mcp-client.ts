import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

let mcpClient: Awaited<ReturnType<typeof createMCPClient>> | null = null;

export async function getMCPClient() {
  if (!mcpClient) {
    const transport = new StreamableHTTPClientTransport(
      new URL(process.env.HALTER_MCP_URL!)
    );
    mcpClient = await createMCPClient({ transport });
  }
  return mcpClient;
}

export async function getHalterTools() {
  const client = await getMCPClient();
  return client.tools();
}

export async function getFarmSummary() {
  const client = await getMCPClient();
  const tools = await client.tools();

  // Use generateText to invoke the get_farm_summary tool
  const result = await generateText({
    model: anthropic("claude-opus-4-5-20251101"),
    tools,
    toolChoice: { type: "tool", toolName: "get_farm_summary" },
    prompt: "Get the farm summary.",
  });

  // Extract the tool result from the response
  const toolResults = result.steps[0]?.toolResults;
  if (toolResults && toolResults.length > 0) {
    return toolResults[0];
  }
  return null;
}
