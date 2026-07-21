import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildPreviewFromPlan } from "./lib/preview.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredEnvironment = [
  "DASHSCOPE_API_KEY",
  "DASHSCOPE_BASE_URL",
  "DEMO_SHARED_SECRET",
];

/**
 * Create the Express app.
 * @param {{
 *   demoSecret?: string,
 *   model?: string,
 *   qwen?: { chat: { completions: { create: Function } } },
 *   publicDir?: string,
 * }} [options]
 */
export function createApp(options = {}) {
  const demoSecret =
    options.demoSecret ?? process.env.DEMO_SHARED_SECRET;
  const model =
    options.model ?? process.env.QWEN_MODEL ?? "qwen-plus";
  const publicDir =
    options.publicDir ?? path.join(__dirname, "public");

  const qwen =
    options.qwen ??
    new OpenAI({
      apiKey: process.env.DASHSCOPE_API_KEY,
      baseURL: process.env.DASHSCOPE_BASE_URL,
    });

  if (!demoSecret) {
    throw new Error("Missing required environment variable: DEMO_SHARED_SECRET");
  }

  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "32kb" }));
  app.use(
    express.static(publicDir, {
      index: "index.html",
      fallthrough: true,
    }),
  );

  app.get("/health", (_request, response) => {
    response.json({
      ok: true,
      service: "nanokat-forge-orchestrator",
      provider: "Alibaba Cloud Model Studio",
      model,
    });
  });

  app.post("/api/plan", async (request, response) => {
    const suppliedToken = request.get("x-nanokat-demo-token");

    if (suppliedToken !== demoSecret) {
      return response.status(401).json({
        ok: false,
        error: "Unauthorized",
      });
    }

    const brief =
      typeof request.body?.brief === "string"
        ? request.body.brief.trim()
        : "";

    if (!brief || brief.length > 8_000) {
      return response.status(400).json({
        ok: false,
        error: "brief must contain between 1 and 8,000 characters",
      });
    }

    const systemPrompt = [
      "You are the planning orchestrator for NANOKAT Forge.",
      "Turn a small-business website request into a safe build plan.",
      "Return only one valid JSON object with no Markdown fences.",
      "Include these properties:",
      "businessName, businessSummary, archetype, pages, palette, motif,",
      "approvalCheckpoints, validationSteps, and risks.",
      "pages must be an array of 3 to 6 short page names.",
      "palette must be an array of exactly 3 hex color strings,",
      "for example [\"#8B5C3E\",\"#F9F5F0\",\"#3A2E26\"].",
      "Do not claim that files were created or anything was deployed.",
    ].join(" ");

    try {
      const result = await qwen.chat.completions.create({
        model,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: brief,
          },
        ],
      });

      const content = result.choices[0]?.message?.content;

      if (!content) {
        throw new Error("Qwen returned no message content");
      }

      const normalized = content
        .trim()
        .replace(/^```(?:json)?\s*/i, "")
        .replace(/\s*```$/, "");

      const plan = JSON.parse(normalized);

      return response.json({
        ok: true,
        model,
        plan,
        usage: result.usage ?? null,
      });
    } catch (error) {
      const record =
        typeof error === "object" && error !== null ? error : {};

      const nested =
        typeof record.error === "object" && record.error !== null
          ? record.error
          : {};

      const upstream = {
        status: record.status ?? null,
        code: record.code ?? nested.code ?? null,
        type: record.type ?? nested.type ?? null,
        message:
          error instanceof Error
            ? error.message
            : "Unknown upstream error",
        requestId:
          record.request_id ??
          record.requestId ??
          null,
      };

      console.error("Qwen request failed", upstream);

      return response.status(502).json({
        ok: false,
        error: "Qwen request failed",
        ...(process.env.DEBUG_ERRORS === "true"
          ? { upstream }
          : {}),
      });
    }
  });

  app.post("/api/build-preview", (request, response) => {
    const suppliedToken = request.get("x-nanokat-demo-token");

    if (suppliedToken !== demoSecret) {
      return response.status(401).json({
        ok: false,
        error: "Unauthorized",
      });
    }

    const approved = request.body?.approved === true;
    const plan = request.body?.plan;

    if (!approved) {
      return response.status(409).json({
        ok: false,
        error: "Human approval is required before preview generation",
      });
    }

    const result = buildPreviewFromPlan(plan);

    if (!result.ok) {
      const { status, error, validation } = result;
      return response.status(status).json({
        ok: false,
        error,
        ...(validation ? { validation } : {}),
      });
    }

    return response.json({
      ok: true,
      trace: result.trace,
      validation: result.validation,
      preview: result.preview,
    });
  });

  return app;
}

function assertRequiredEnvironment() {
  for (const name of requiredEnvironment) {
    if (!process.env[name]) {
      throw new Error(`Missing required environment variable: ${name}`);
    }
  }
}

function isMainModule() {
  const entry = process.argv[1];
  if (!entry) return false;
  return import.meta.url === pathToFileURL(path.resolve(entry)).href;
}

if (isMainModule()) {
  assertRequiredEnvironment();

  const app = createApp();
  const port = Number(
    process.env.FC_CUSTOM_LISTEN_PORT ??
      process.env.PORT ??
      9000,
  );

  app.listen(port, "0.0.0.0", () => {
    console.log(`NANOKAT Forge listening on ${port}`);
  });
}
