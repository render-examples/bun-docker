/**
 * Workflow-only entry: registers tasks and lets @renderinc/sdk start the task server
 * over RENDER_SDK_SOCKET_PATH (do not bind Bun.serve to PORT — it conflicts during registration).
 *
 * Use as Render Workflow start command: `bun workflow.ts` (or `bun run workflow`).
 * Alternatively, `bun start` / Dockerfile CMD `bun start` works when RENDER_SDK_SOCKET_PATH is set;
 * see app.ts.
 */
import { printRenderInjectedEnv } from "./render-env";
import "./workflow-tasks";

printRenderInjectedEnv();
console.log("Workflow tasks loaded.");
