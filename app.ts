const PORT: number = +(process.env.PORT || 8081);
const NODE_ENV = process.env.NODE_ENV ?? "development";

const server = Bun.serve({
  port: PORT,
  fetch() {
    return new Response("Welcome to Bun!");
  },
});

console.log(`[${NODE_ENV}] Serving http://localhost:${server.port}`);
