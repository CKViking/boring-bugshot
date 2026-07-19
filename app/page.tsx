"use client";

import { ChangeEvent, DragEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BugReport, categories, priorities, reportToMarkdown, reportTypes } from "@/lib/report";

type SavedReport = BugReport & { id: string; savedAt: string };
type ReportLanguage = "en" | "de" | "es" | "nl";
type RequestedReportType = "auto" | BugReport["report_type"];

const reportLanguages: { code: ReportLanguage; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "de", label: "Deutsch", short: "DE" },
  { code: "es", label: "Español", short: "ES" },
  { code: "nl", label: "Nederlands", short: "NL" },
];
const requestedReportTypes: { code: RequestedReportType; label: string; description: string }[] = [
  { code: "auto", label: "Automatic", description: "Bugshot chooses the most useful perspective." },
  { code: "technical", label: "Technical", description: "An implementation-ready engineering ticket." },
  { code: "design", label: "Design", description: "Focused visual and design-system feedback." },
  { code: "ux", label: "UX", description: "User friction, impact, and expected flow." },
  { code: "accessibility", label: "Accessibility", description: "A visible accessibility concern." },
];
const acceptedImageTypes = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);
const maxImageSize = 4 * 1024 * 1024;

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [context, setContext] = useState("");
  const [language, setLanguage] = useState<ReportLanguage>("en");
  const [requestedReportType, setRequestedReportType] = useState<RequestedReportType>("auto");
  const [report, setReport] = useState<BugReport | null>(null);
  const [saved, setSaved] = useState<SavedReport[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [reportFeedback, setReportFeedback] = useState<{ source: "save" | "pdf"; type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    const loadSaved = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("bugshot-reports") || "[]") as SavedReport[];
        setSaved(stored.map((item) => ({ ...item, report_type: item.report_type || "technical" })));
      } catch { setSaved([]); }
      const storedLanguage = localStorage.getItem("bugshot-report-language");
      if (reportLanguages.some((item) => item.code === storedLanguage)) {
        setLanguage(storedLanguage as ReportLanguage);
      }
    };
    const timer = window.setTimeout(loadSaved, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  useEffect(() => () => { if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current); }, []);

  const chooseFile = useCallback((next: File | null) => {
    if (!next) return;
    if (!acceptedImageTypes.has(next.type)) { setError("Use a PNG, JPEG, WebP, or GIF image."); return; }
    if (next.size > maxImageSize) { setError("The screenshot must be 4 MB or smaller."); return; }
    if (preview) URL.revokeObjectURL(preview);
    setFile(next); setPreview(URL.createObjectURL(next)); setError(""); setNotice("");
  }, [preview]);

  useEffect(() => {
    function pasteScreenshot(event: ClipboardEvent) {
      const imageItem = Array.from(event.clipboardData?.items || []).find((item) => item.type.startsWith("image/"));
      const pastedImage = imageItem?.getAsFile();
      if (!pastedImage) return;
      event.preventDefault();
      chooseFile(new File([pastedImage], `pasted-screenshot-${Date.now()}.png`, { type: pastedImage.type || "image/png" }));
      setNotice("Screenshot pasted from your clipboard.");
    }
    window.addEventListener("paste", pasteScreenshot);
    return () => window.removeEventListener("paste", pasteScreenshot);
  }, [chooseFile]);

  async function analyze() {
    if (!file) { setError("Add a screenshot first."); return; }
    setLoading(true); setError(""); setNotice("");
    const body = new FormData(); body.append("image", file); body.append("context", context); body.append("language", language); body.append("report_type", requestedReportType);
    try {
      const response = await fetch("/api/analyze", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");
      setReport(data.report); setNotice("Report ready. Review and edit before saving.");
      setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (err) { setError(err instanceof Error ? err.message : "Analysis failed."); }
    finally { setLoading(false); }
  }

  function update(field: keyof BugReport, value: string) {
    setReport((current) => current ? ({ ...current, [field]: value }) : current);
  }
  function chooseLanguage(value: ReportLanguage) {
    setLanguage(value);
    localStorage.setItem("bugshot-report-language", value);
  }
  function showReportFeedback(source: "save" | "pdf", type: "success" | "error", message: string) {
    if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    setReportFeedback({ source, type, message });
    feedbackTimerRef.current = window.setTimeout(() => setReportFeedback(null), 3200);
  }
  function saveReport() {
    if (!report) return;
    try {
      const item = { ...report, id: crypto.randomUUID(), savedAt: new Date().toISOString() };
      const next = [item, ...saved].slice(0, 30);
      localStorage.setItem("bugshot-reports", JSON.stringify(next));
      setSaved(next);
      showReportFeedback("save", "success", "Saved in this browser.");
    } catch {
      showReportFeedback("save", "error", "Could not save this report. Please try again.");
    }
  }
  async function downloadPdf() {
    if (!report || pdfLoading) return;
    setPdfLoading(true);
    try {
      const { downloadReportPdf } = await import("@/lib/report-pdf");
      downloadReportPdf(report, language);
      showReportFeedback("pdf", "success", "PDF download started.");
    } catch {
      showReportFeedback("pdf", "error", "Could not create the PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }
  function download(filename: string, content: string) {
    const url = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
  }
  function slug(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "bug-report"; }

  return <main>
    <header className="topbar"><div className="header-inner"><a className="brand" href="#top"><strong>boring</strong><span>Bugshot</span></a><nav><a href="#how">How it works</a><a href="#output">What you get</a><a href="#openai-core">OpenAI core</a><a href="#workspace">Workspace <b>{saved.length}</b></a><a className="nav-cta" href="#tool">Try Bugshot</a></nav></div></header>
    <div className="hero-layout" id="top">
    <section className="hero">
      <p className="eyebrow"><i aria-hidden="true" /> OPENAI BUILD WEEK PROJECT</p>
      <h1><span>boring</span> Bugshot</h1>
      <p className="hero-kicker">One screenshot in. One bug report out.</p>
      <p className="lead">Drop in what looks wrong. Get a structured, editable ticket your team can actually use.</p>
      <div className="meta-row"><span>GPT-5.6 vision</span><span>Structured Outputs</span><span>Server-validated schema</span><span>Issue-ready exports</span></div>
    </section>
    <section className="workbench" id="tool">
      <div className={`dropzone ${preview ? "has-image" : ""}`} role="button" tabIndex={0} aria-label="Add a screenshot by pasting, dropping, or choosing an image file" onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inputRef.current?.click(); } }} onDragOver={(e) => e.preventDefault()} onDrop={(e: DragEvent) => { e.preventDefault(); chooseFile(e.dataTransfer.files[0]); }} onClick={() => inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={(e: ChangeEvent<HTMLInputElement>) => chooseFile(e.target.files?.[0] || null)} />
        {preview ? <img src={preview} alt="Screenshot preview" /> : <><div className="plus">+</div><h2>Drop or paste your screenshot</h2><p>Press Ctrl+V anywhere · or click to browse · max 4 MB</p></>}{/* eslint-disable-line @next/next/no-img-element */}
        {preview && <span className="change">Click to replace</span>}
      </div>
      <div className="controls">
        <label htmlFor="context">A little context <span>optional</span></label>
        <textarea id="context" value={context} maxLength={4000} onChange={(e) => setContext(e.target.value)} placeholder="What were you trying to do? Where did this happen?" />
        <div className="request-settings">
          <label className="report-type-select" htmlFor="report-type">Report type <span>choose per request</span><select id="report-type" value={requestedReportType} onChange={(e) => setRequestedReportType(e.target.value as RequestedReportType)}>{requestedReportTypes.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><small>{requestedReportTypes.find((item) => item.code === requestedReportType)?.description}</small></label>
          <label className="language-select" htmlFor="report-language">Language <span>remembered</span><select id="report-language" value={language} onChange={(e) => chooseLanguage(e.target.value as ReportLanguage)}>{reportLanguages.map((item) => <option key={item.code} value={item.code}>{item.short} · {item.label}</option>)}</select></label>
        </div>
        <p className="privacy"><strong>Before you analyze:</strong> Your screenshot, optional context, report type, and output language are sent to OpenAI through our server to create the report. Bugshot does not add the screenshot to your saved browser workspace. Do not upload confidential or personal data unless you are authorized to share it. <Link href="/datenschutz">Privacy details</Link></p>
        <button className="primary" onClick={analyze} disabled={loading || !file}>{loading ? "Reading the screenshot…" : "Create bug report →"}</button>
        {error && <p className="message error">{error}</p>}{notice && <p className="message success">{notice}</p>}
      </div>
    </section>
    </div>
    <section className="build-strip"><div><strong>Built with Codex for OpenAI Build Week.</strong><p>GPT-5.6 reads the screenshot. Structured Outputs turn the result into an editable, server-validated report — a focused workflow instead of a chat wrapper.</p></div></section>
    {report && <section className="report" id="report">
      <div className="section-heading"><div><p className="eyebrow">STRUCTURED OUTPUT</p><h2>Review the report</h2></div><div className="report-actions"><div className="actions"><button className={reportFeedback?.source === "save" && reportFeedback.type === "success" ? "is-saved" : ""} onClick={saveReport}>{reportFeedback?.source === "save" && reportFeedback.type === "success" ? "Saved ✓" : "Save"}</button><button className="pdf-action" onClick={downloadPdf} disabled={pdfLoading}>{pdfLoading ? "Creating PDF…" : "PDF ↓"}</button><button onClick={() => download(`${slug(report.title)}.md`, reportToMarkdown(report))}>Markdown ↓</button><button onClick={() => download(`${slug(report.title)}-issue.md`, report.ticket_text)}>Issue text ↓</button></div>{reportFeedback && <p className={`report-feedback ${reportFeedback.type}`} role="status" aria-live="polite">{reportFeedback.type === "success" ? "✓ " : ""}{reportFeedback.message}</p>}</div></div>
      <div className="report-grid">
        <label className="wide">Title<input value={report.title} onChange={(e) => update("title", e.target.value)} /></label>
        <label>Report type<select value={report.report_type} onChange={(e) => update("report_type", e.target.value)}>{reportTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Category<select value={report.category} onChange={(e) => update("category", e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Priority<select value={report.priority} onChange={(e) => update("priority", e.target.value)}>{priorities.map((item) => <option key={item}>{item}</option>)}</select></label>
        {(["problem", "impact", "fix_suggestion", "ticket_text"] as const).map((field) => <label className={field === "ticket_text" ? "wide" : ""} key={field}>{field.replace("_", " ")}<textarea value={report[field]} onChange={(e) => update(field, e.target.value)} /></label>)}
      </div>
    </section>}
    <section className="story" id="how">
      <div className="story-intro">
        <p className="eyebrow">FROM VISUAL FIND TO USEFUL TICKET</p>
        <h2>You can see the problem.<br />Now make it <em>actionable.</em></h2>
        <p>A screenshot often explains what is wrong faster than a meeting. But screenshots alone leave developers guessing. boring Bugshot closes the gap with one focused, structured report.</p>
      </div>
      <div className="steps">
        <article><span>01</span><h3>Capture it</h3><p>Take a screenshot and paste it straight from your clipboard. Add context only when it helps.</p></article>
        <article><span>02</span><h3>Structure it</h3><p>Vision input and schema-validated output turn the visible issue into a consistent bug report.</p></article>
        <article><span>03</span><h3>Use it</h3><p>Review the result, fix the wording, save it locally, or export it as PDF or ticket-ready Markdown.</p></article>
      </div>
    </section>
    <section className="proof" id="output">
      <div><p className="eyebrow">WHAT YOU GET</p><h2>Enough structure.<br />No dashboard circus.</h2></div>
      <div className="proof-list">
        <p><b>Clear title</b><span>A short summary people can scan.</span></p>
        <p><b>Category & priority</b><span>Useful triage without a complex QA system.</span></p>
        <p><b>Problem & impact</b><span>What is visible and why it matters.</span></p>
        <p><b>Suggested fix</b><span>A practical starting point, ready for review.</span></p>
        <p><b>Ticket-ready text</b><span>Observed result, expected result, and acceptance criteria.</span></p>
      </div>
    </section>
    <section className="audience" id="for-whom">
      <p className="eyebrow">BUILT FOR THE HANDOFF</p>
      <div className="audience-grid"><h2>For people who find bugs.<br />And people who have to fix them.</h2><div><p>Developers</p><p>Designers</p><p>Freelancers</p><p>Agencies</p><p>Small product teams</p><p>Client projects</p></div></div>
    </section>
    <section className="principles" id="openai-core">
      <div><p className="eyebrow">TECHNICAL IMPLEMENTATION</p><h2>Vision in.<br />Structured data out.</h2></div>
      <div><p>Bugshot sends the screenshot and optional context to GPT-5.6 through the Responses API. Structured Outputs are parsed into a Zod schema on the server before the interface can use them.</p><blockquote>The model is the product core. The interface turns it into a dependable handoff.</blockquote></div>
    </section>
    <section className="workspace" id="workspace">
      <div className="section-heading"><div><p className="eyebrow">THIS BROWSER</p><h2>Saved reports</h2></div></div>
      {saved.length === 0 ? <p className="empty">No saved reports yet. Your first useful ticket will land here.</p> : <div className="saved-list">{saved.map((item) => <button key={item.id} onClick={() => { setReport(item); setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" }), 0); }}><span>{item.title}</span><small>{item.category} · {new Date(item.savedAt).toLocaleDateString()}</small></button>)}</div>}
    </section>
    <footer><div><span><strong>boring</strong> Bugshot</span>. <p>Screenshots in. Useful reports out. No drama.</p></div><nav><a href="#top">Top</a><a href="#openai-core">OpenAI core</a><a href="#workspace">Workspace</a><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><Link className="demo-link" href="/demo">Demo lab</Link></nav></footer>
  </main>;
}
