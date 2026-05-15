import { printRenderInjectedEnv } from "./render-env";

printRenderInjectedEnv();

// Render Workflows inject RENDER_SDK_SOCKET_PATH; the SDK talks over a socket, not HTTP PORT.
// Binding Bun.serve to PORT here causes EADDRINUSE (e.g. port 9999) during "Registering your tasks".
if (process.env.RENDER_SDK_SOCKET_PATH) {
  await import("./workflow-tasks");
} else {
  const PORT: number = +(process.env.PORT || 8081);
  const NODE_ENV = process.env.NODE_ENV ?? "development";

  const server = Bun.serve({
    hostname: "0.0.0.0",
    port: PORT,
    fetch() {
      return new Response("Welcome to Bun!");
    },
  });

  console.log(`[${NODE_ENV}] Serving http://localhost:${server.port}`);
}
