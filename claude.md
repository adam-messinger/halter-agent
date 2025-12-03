# Halter Farm Advisor

AI-powered dairy farming advisor built for Halter, a New Zealand agri-tech company.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **AI**: Vercel AI SDK with Anthropic Claude (claude-sonnet-4-5-20250929)
- **MCP**: Model Context Protocol integration for Halter farm data tools
- **UI**: React 19, TailwindCSS 4
- **Language**: TypeScript (strict mode)

## Project Structure

```
app/
  api/chat/route.ts   # Chat API endpoint
  page.tsx            # Main chat UI component
  layout.tsx          # Root layout with metadata
lib/
  agent.ts            # Agent initialization and configuration
  mcp-client.ts       # MCP client for Halter tools
prompts/
  system.md           # System prompt with NZ dairy farming expertise
```

## Key Concepts

### Agent Architecture
The agent is initialized in `lib/agent.ts` using the experimental Agent API from the AI SDK. It:
- Connects to a Halter MCP server via `HALTER_MCP_URL` env var
- Fetches farm summary data on startup
- Injects farm context into the system prompt via `{{FARM_SUMMARY}}` placeholder
- Has access to farm data tools (cattle, pasture, health, mating, etc.)

### MCP Tools
The Halter MCP server provides tools for:
- `get_farm_summary` - Farm overview and alerts
- `get_cattle_details` - Individual animal data
- `get_mob_details` - Mob composition and location
- `get_pasture_summary` - Paddock covers and grazing
- `get_health_summary` - Health events and alerts
- `get_mating_summary` - Heat detection and mating
- `get_calving_summary` - Calving progress

## Development

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run lint   # Run ESLint
```

## Environment Variables

- `HALTER_MCP_URL` - URL to Halter MCP server (required)
- `ANTHROPIC_API_KEY` - Anthropic API key (required)

## Domain Context

This is a New Zealand dairy farming application. Key terminology:
- **Paddock**: Field/pasture area
- **Mob**: Group of cattle
- **Dry-off**: End of lactation period
- **AB**: Artificial breeding/insemination
- **BCS**: Body Condition Score
- **SCC**: Somatic Cell Count (milk quality)
- **DairyNZ System 1-5**: Farm intensification classifications
