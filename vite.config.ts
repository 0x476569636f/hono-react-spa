import path from "path";
import pages from "@hono/vite-cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import { getPlatformProxy } from "wrangler";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(async ({ mode }) => {
  const { env } = await getPlatformProxy();

  const globalConfig = {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  if (mode === "client") {
    return {
      ...globalConfig,
      build: {
        rollupOptions: {
          input: ["./src/client/main.tsx", "./src/client/assets/style.css"],
          output: {
            entryFileNames: "static/client.js",
            assetFileNames: "static/assets/[name].[ext]",
            chunkFileNames: "static/[name]-[hash].js",
          },
        },
        plugins: [TanStackRouterVite()],
      },
    };
  } else {
    return {
      ...globalConfig,
      ssr: {
        external: ["react", "react-dom"],
      },
      plugins: [
        pages(),
        devServer({
          entry: "src/index.tsx",
          env: env,
        }),
      ],
    };
  }
});
