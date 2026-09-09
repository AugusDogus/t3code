import type { APIRoute } from "astro";

import { buildBackplaneProjectFileJsonSchema } from "@backplane/shared/backplaneProjectFile";

// Rendered at build time as the marketing schema route for editor/LSP support.
export const GET: APIRoute = () =>
  new Response(`${JSON.stringify(buildBackplaneProjectFileJsonSchema(), null, 2)}\n`, {
    headers: { "Content-Type": "application/json" },
  });
