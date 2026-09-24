import pluginQuery from "@tanstack/eslint-plugin-query";
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...nextVitals,
  ...pluginQuery.configs["flat/recommended"],
  {
    // New in eslint-plugin-react-hooks v7. The existing hooks set state after mount
    // on purpose (localStorage reads that must not run during SSR).
    rules: { "react-hooks/set-state-in-effect": "warn" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
