/**
 * Minimal Render Workflows SDK usage: list recent task runs (read-only).
 * Requires RENDER_API_KEY (see https://render.com/docs/workflows-sdk-typescript.md).
 * To run a specific task instead, use render.workflows.runTask("workflow-slug/taskName", [...args]).
 */
import { AbortError, ClientError, Render, RenderError, ServerError } from "@renderinc/sdk";
import { printRenderInjectedEnv } from "./render-env";

printRenderInjectedEnv();
console.log("");

try {
  const render = new Render();
  const runs = await render.workflows.listTaskRuns({ limit: 5 });
  console.log(`listTaskRuns(limit: 5) returned ${runs.length} row(s):`);
  for (const row of runs) {
    console.log(`  ${JSON.stringify(row)}`);
  }
} catch (err) {
  if (err instanceof ClientError) {
    console.error("ClientError:", err.message);
  } else if (err instanceof ServerError) {
    console.error("ServerError:", err.message);
  } else if (err instanceof AbortError) {
    console.error("AbortError:", err.message);
  } else if (err instanceof RenderError) {
    console.error("RenderError:", err.message);
  } else {
    console.error("Unexpected error:", err);
  }
  process.exitCode = 1;
}
