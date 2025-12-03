import { getAgent } from "@/lib/agent";
import type { UIMessage } from "ai";

export const maxDuration = 60;

type SimpleMessage = { role: string; content: string };

function toUIMessages(messages: SimpleMessage[]): UIMessage[] {
  return messages.map((msg, index) => ({
    id: `msg-${index}`,
    role: msg.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: msg.content }],
  }));
}

function parseMessages(body: { messages?: UIMessage[] | SimpleMessage[] }): UIMessage[] {
  const messages = body.messages;
  if (!messages?.length) return [];

  // Check if already in UIMessage format (has 'parts')
  if ("parts" in messages[0]) {
    return messages as UIMessage[];
  }

  // Convert simple format to UIMessage
  if ("content" in messages[0]) {
    return toUIMessages(messages as SimpleMessage[]);
  }

  return [];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const agent = await getAgent();

    if (!agent) {
      return Response.json({ error: "Agent initialization failed" }, { status: 500 });
    }

    const messages = parseMessages(body);

    // Type assertion needed due to AI SDK's experimental API types
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
