import { task } from "@renderinc/sdk/workflows";

/** Minimal task so the workflow service has something to register (see Render docs). */
export const hello = task(
  { name: "hello" },
  function hello(): string {
    return "Hello from Render Workflows";
  },
);
