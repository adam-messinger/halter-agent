import { getAgent } from "@/lib/agent";
import type { UIMessage } from "ai";

export const maxDuration = 300;

type SimpleMessage = { role: string; content: string };

function isUIMessage(msg: unknown): msg is UIMessage {
  return typeof msg === "object" && msg !== null && "parts" in msg;
}

function isSimpleMessage(msg: unknown): msg is SimpleMessage {
  return typeof msg === "object" && msg !== null && "content" in msg && "role" in msg;
}

function toUIMessages(messages: SimpleMessage[]): UIMessage[] {
  return messages.map((msg, index) => ({
    id: `msg-${index}`,
    role: msg.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: msg.content }],
  }));
}

function parseMessages(body: unknown): UIMessage[] {
  if (typeof body !== "object" || body === null) return [];

  const { messages } = body as { messages?: unknown[] };
  if (!Array.isArray(messages) || messages.length === 0) return [];

  const first = messages[0];

  if (isUIMessage(first)) {
    return messages as UIMessage[];
  }

  if (isSimpleMessage(first)) {
    return toUIMessages(messages as SimpleMessage[]);
  }

  return [];
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const agent = await getAgent();

    if (!agent) {
      return Response.json({ error: "Agent initialization failed" }, { status: 500 });
    }

    const messages = parseMessages(body);

    // The AI SDK's experimental Agent API has incomplete types for UIMessage.
    // This assertion is safe because parseMessages() validates the structure.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return agent.respond({ messages: messages as any });
  } catch (error) {
    console.error("Chat route error:", error);
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
