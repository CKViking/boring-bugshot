import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";
import { reportSchema } from "@/lib/report";

export const runtime = "nodejs";
export const maxDuration = 60;
const allowedTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMaxRequests = 12;
type RateLimitEntry = { count: number; resetAt: number };
const globalRateLimitStore = globalThis as typeof globalThis & { bugshotRateLimits?: Map<string, RateLimitEntry> };
const rateLimits = globalRateLimitStore.bugshotRateLimits ??= new Map<string, RateLimitEntry>();
const reportLanguages = {
  en: "English",
  de: "German",
  es: "Spanish",
  nl: "Dutch",
} as const;
const reportTypeInstructions = {
  auto: "Choose the single most useful primary report type from technical, design, ux, or accessibility. Base the decision on the visible evidence, the likely owner of the fix, and the framing that makes the report most actionable. Set report_type to your choice.",
  technical: "Create an implementation-ready technical ticket. Focus on observed versus expected behavior and actionable acceptance criteria. Set report_type to technical. Do not invent a hidden technical cause.",
  design: "Create focused design feedback. Emphasize the affected visual element, inconsistency, hierarchy or clarity impact, desired visual result, and a concrete design recommendation. Set report_type to design.",
  ux: "Create a UX finding. Emphasize the likely user situation, visible friction, user impact, expected understandable flow, and verification criteria. Set report_type to ux.",
  accessibility: "Create an accessibility issue based only on visible evidence. Identify the visible barrier, likely affected users, impact, and remediation, without claiming a complete WCAG audit. Set report_type to accessibility.",
} as const;

function clientId(request: Request) {
  return request.headers.get("x-nf-client-connection-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "local";
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const id = clientId(request);
  const current = rateLimits.get(id);
  if (!current || current.resetAt <= now) {
    rateLimits.set(id, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }
  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OPENAI_API_KEY is not configured." }, { status: 503 });
    }
    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Too many reports from this connection. Please try again in a few minutes." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }
    const formData = await request.formData();
    const image = formData.get("image");
    const context = String(formData.get("context") ?? "").trim().slice(0, 4000);
    const requestedLanguage = String(formData.get("language") ?? "en");
    const language = requestedLanguage in reportLanguages
      ? reportLanguages[requestedLanguage as keyof typeof reportLanguages]
      : reportLanguages.en;
    const requestedReportType = String(formData.get("report_type") ?? "auto");
    const reportTypeInstruction = requestedReportType in reportTypeInstructions
      ? reportTypeInstructions[requestedReportType as keyof typeof reportTypeInstructions]
      : reportTypeInstructions.auto;
    if (!(image instanceof File) || image.size === 0) {
      return NextResponse.json({ error: "Please choose a screenshot." }, { status: 400 });
    }
    if (!allowedTypes.has(image.type)) {
      return NextResponse.json({ error: "Use a PNG, JPEG, WebP, or GIF image." }, { status: 415 });
    }
    if (image.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "The screenshot must be 4 MB or smaller." }, { status: 413 });
    }

    const base64 = Buffer.from(await image.arrayBuffer()).toString("base64");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 55_000 });
    const response = await openai.responses.parse({
      model: process.env.OPENAI_MODEL || "gpt-5.6",
      store: false,
      input: [
        {
          role: "system",
          content: `You are a precise product QA analyst. Inspect the screenshot and return one useful, evidence-based report for the most important visible issue. Do not invent hidden behavior. ${reportTypeInstruction} Write the title, problem, impact, fix_suggestion, and ticket_text in concise professional ${language}. Keep report_type, category, and priority in their schema-defined English enum format. The ticket_text must be ready to hand off and use the structure most appropriate for the selected report type. For technical reports, include observed result, expected result, and acceptance criteria. Use optional context only when consistent with the screenshot.`,
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: context ? `Optional reporter context:\n${context}` : "No additional context was supplied." },
            { type: "input_image", image_url: `data:${image.type};base64,${base64}`, detail: "high" },
          ],
        },
      ],
      text: { format: zodTextFormat(reportSchema, "bug_report") },
    });
    if (!response.output_parsed) {
      return NextResponse.json({ error: "The screenshot could not be turned into a report." }, { status: 422 });
    }
    return NextResponse.json({ report: reportSchema.parse(response.output_parsed) });
  } catch (error) {
    console.error("Bugshot analysis failed", error);
    if (error instanceof OpenAI.APIError && error.status === 429) {
      return NextResponse.json({ error: "OpenAI rate limit reached. Please try again shortly." }, { status: 429 });
    }
    if (error instanceof OpenAI.APIError && error.status === 401) {
      return NextResponse.json({ error: "The analysis service is not configured correctly." }, { status: 503 });
    }
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
