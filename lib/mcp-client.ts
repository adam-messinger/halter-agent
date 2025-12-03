import { experimental_createMCPClient as createMCPClient } from "@ai-sdk/mcp";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

type MCPClient = Awaited<ReturnType<typeof createMCPClient>>;
type MCPTools = Awaited<ReturnType<MCPClient["tools"]>>;

let mcpClient: MCPClient | null = null;
let cachedTools: MCPTools | null = null;

async function getMCPClient(): Promise<MCPClient> {
  if (!mcpClient) {
    const url = process.env.HALTER_MCP_URL;
    if (!url) throw new Error("HALTER_MCP_URL environment variable not set");

    const transport = new StreamableHTTPClientTransport(new URL(url));
    mcpClient = await createMCPClient({ transport });
  }
  return mcpClient;
}

export async function getHalterTools(): Promise<MCPTools> {
  if (!cachedTools) {
    const client = await getMCPClient();
    cachedTools = await client.tools();
  }
  return cachedTools;
}

export async function getFarmSummary(): Promise<unknown> {
  const tools = await getHalterTools();

  const tool = tools.get_farm_summary;
  if (!tool?.execute) {
    throw new Error("get_farm_summary tool not available");
  }

  return tool.execute(
    { include: ["herd", "pasture", "health", "mating", "hardware"] },
    { toolCallId: "farm-summary-init", messages: [] }
  );
}
