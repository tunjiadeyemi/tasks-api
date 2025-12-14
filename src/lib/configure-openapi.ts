import { Scalar } from "@scalar/hono-api-reference";

import env from "@/env";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json";

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Tasks API",
      description: "A simple tasks API built with Hono, Zod, and OpenAPI",
    },
  });

  app.get("/reference", Scalar(() => {
    return {
      url: "/doc",
      pageTitle: "Tasks API Reference",
      theme: "purple",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
      proxyUrl:
        env.NODE_ENV === "development"
          ? "https://proxy.scalar.com"
          : undefined,
    };
  }));
}
