import { getAgent } from "@/lib/agent";

export async function GET() {
  try {
    await getAgent();
    return Response.json({ ready: true });
  } catch {
    return Response.json({ ready: false }, { status: 500 });
  }
}
