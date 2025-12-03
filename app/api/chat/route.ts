import { getAgent } from "@/lib/agent";
import { UIMessage } from "ai";

export const maxDuration = 60;

// Convert simple message format to UIMessage format
function toUIMessages(messages: { role: string; content: string }[]): UIMessage[] {
  return messages.map((msg, index) => ({
    id: `msg-${index}`,
    role: msg.role as "user" | "assistant",
    parts: [{ type: "text" as const, text: msg.content }],
  }));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", JSON.stringify(body, null, 2));

    const agent = await getAgent();
    console.log("Agent retrieved successfully");

    if (!agent) {
      console.error("Agent is null");
      return new Response("Agent initialization failed", { status: 500 });
    }

    // Check if messages are already in UIMessage format (have 'parts') or simple format
    let messages: UIMessage[];
    if (body.messages?.[0]?.parts) {
      // Already in UIMessage format
      messages = body.messages;
    } else if (body.messages?.[0]?.content) {
      // Simple format, convert to UIMessage
      messages = toUIMessages(body.messages);
    } else {
      messages = [];
    }

    console.log("Calling agent.respond with", messages.length, "messages");
    return agent.respond({ messages });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
