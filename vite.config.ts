import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/tests.ts"],
    isolate: false,
    sequence: {
      concurrent: true,
    },
  },
});
