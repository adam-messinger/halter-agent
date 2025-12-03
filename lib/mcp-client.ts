import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

let mcpClient: Awaited<ReturnType<typeof createMCPClient>> | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let cachedTools: Record<string, any> | null = null;

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
  if (!cachedTools) {
    const client = await getMCPClient();
    cachedTools = await client.tools();
  }
  return cachedTools;
}

export async function getFarmSummary() {
  // Get tools (uses cache if available)
  const tools = await getHalterTools();

  // Call the tool directly without going through Claude
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getFarmSummaryTool = tools.get_farm_summary as any;
  if (!getFarmSummaryTool?.execute) {
    console.error("get_farm_summary tool not found or has no execute method");
    return null;
  }

  // Execute the tool directly
  const result = await getFarmSummaryTool.execute({
    include: ["herd", "pasture", "health", "mating", "hardware", "alerts"],
  });

  return result;
}
