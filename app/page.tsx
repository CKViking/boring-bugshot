"use client";

import { ChangeEvent, DragEvent, useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BoringWorksSignature } from "@/app/boring-works-signature";
import { BugReport, categories, priorities, reportToIssueText, reportToMarkdown, reportTypes } from "@/lib/report";
import { deleteScreenshot, getScreenshot, saveScreenshot } from "@/lib/screenshot-store";

type SavedReport = BugReport & { id: string; savedAt: string; hasScreenshot: boolean };
type ReportLanguage = "en" | "de" | "es" | "nl";
type RequestedReportType = "auto" | BugReport["report_type"];
type AudienceIconName = "developers" | "designers" | "freelancers" | "agencies" | "teams" | "projects";

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

function AudienceIcon({ name }: { name: AudienceIconName }) {
  const paths: Record<AudienceIconName, React.ReactNode> = {
    developers: <><path d="m8 8-4 4 4 4" /><path d="m16 8 4 4-4 4" /><path d="m14 5-4 14" /></>,
    designers: <><path d="m12 3 3 6-3 12-3-12 3-6Z" /><path d="M9 9h6" /></>,
    freelancers: <><path d="M9 7V5h6v2" /><rect x="3" y="7" width="18" height="13" /><path d="M3 12h18" /><path d="M10 12v2h4v-2" /></>,
    agencies: <><rect x="4" y="3" width="16" height="18" /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2M10 21v-3h4v3" /></>,
    teams: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20c0-4 2-6 6-6s6 2 6 6" /><path d="M15 15c3 0 5 2 5 5" /></>,
    projects: <><rect x="5" y="4" width="14" height="17" /><path d="M9 4V2h6v2" /><path d="m9 13 2 2 4-5" /></>,
  };

  return <svg className="audience-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="square" strokeLinejoin="miter">{paths[name]}</svg>;
}

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [context, setContext] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [language, setLanguage] = useState<ReportLanguage>("en");
  const [requestedReportType, setRequestedReportType] = useState<RequestedReportType>("auto");
  const [report, setReport] = useState<BugReport | null>(null);
  const [reportImage, setReportImage] = useState<File | null>(null);
  const [saved, setSaved] = useState<SavedReport[]>([]);
  const [pendingRemovalId, setPendingRemovalId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [reportFeedback, setReportFeedback] = useState<{ source: "save" | "pdf" | "screenshot"; type: "success" | "error"; message: string } | null>(null);
  const [hasAnalyzedCurrentForm, setHasAnalyzedCurrentForm] = useState(false);

  useEffect(() => {
    const loadSaved = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("bugshot-reports") || "[]") as SavedReport[];
        setSaved(stored.map((item) => ({ ...item, report_type: item.report_type || "technical", page_url: item.page_url || "", hasScreenshot: Boolean(item.hasScreenshot) })));
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
    setFile(next); setPreview(URL.createObjectURL(next)); setError(""); setNotice(""); setHasAnalyzedCurrentForm(false);
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
    if (pageUrl) {
      try {
        const parsedUrl = new URL(pageUrl);
        if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error("Unsupported URL protocol");
      } catch {
        setError("Enter a complete page URL starting with http:// or https://.");
        return;
      }
    }
    setLoading(true); setError(""); setNotice("");
    const body = new FormData(); body.append("image", file); body.append("context", context); body.append("page_url", pageUrl); body.append("language", language); body.append("report_type", requestedReportType);
    try {
      const response = await fetch("/api/analyze", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Analysis failed.");
      setReport(data.report); setReportImage(file); setNotice("Report ready. Review and edit before saving."); setHasAnalyzedCurrentForm(true);
      setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (err) { setError(err instanceof Error ? err.message : "Analysis failed."); }
    finally { setLoading(false); }
  }

  function update(field: keyof BugReport, value: string) {
    setReport((current) => current ? ({ ...current, [field]: value }) : current);
  }
  function chooseLanguage(value: ReportLanguage) {
    setLanguage(value);
    setHasAnalyzedCurrentForm(false);
    localStorage.setItem("bugshot-report-language", value);
  }
  function clearForm() {
    if (loading) return;
    setFile(null);
    setPreview("");
    setContext("");
    setPageUrl("");
    setRequestedReportType("auto");
    setHasAnalyzedCurrentForm(false);
    setError("");
    setNotice("Form cleared. Ready for a new screenshot.");
    if (inputRef.current) inputRef.current.value = "";
  }
  function showReportFeedback(source: "save" | "pdf" | "screenshot", type: "success" | "error", message: string) {
    if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    setReportFeedback({ source, type, message });
    feedbackTimerRef.current = window.setTimeout(() => setReportFeedback(null), 3200);
  }
  async function saveReport() {
    if (!report) return;
    const id = crypto.randomUUID();
    let hasScreenshot = false;
    try {
      if (reportImage) {
        try {
          await saveScreenshot(id, reportImage);
          hasScreenshot = true;
        } catch {
          hasScreenshot = false;
        }
      }
      const item: SavedReport = { ...report, id, savedAt: new Date().toISOString(), hasScreenshot };
      const allReports = [item, ...saved];
      const next = allReports.slice(0, 30);
      localStorage.setItem("bugshot-reports", JSON.stringify(next));
      setSaved(next);
      await Promise.allSettled(allReports.slice(30).map((oldReport) => deleteScreenshot(oldReport.id)));
      showReportFeedback(
        "save",
        hasScreenshot || !reportImage ? "success" : "error",
        hasScreenshot ? "Report and screenshot saved in this browser." : reportImage ? "Report saved, but the screenshot could not be stored." : "Report saved in this browser.",
      );
    } catch {
      if (hasScreenshot) await deleteScreenshot(id).catch(() => undefined);
      showReportFeedback("save", "error", "Could not save this report. Please try again.");
    }
  }
  async function removeSavedReport(id: string) {
    if (pendingRemovalId !== id) {
      setPendingRemovalId(id);
      return;
    }
    try {
      const removedReport = saved.find((item) => item.id === id);
      const next = saved.filter((item) => item.id !== id);
      if (removedReport?.hasScreenshot) await deleteScreenshot(id);
      localStorage.setItem("bugshot-reports", JSON.stringify(next));
      setSaved(next);
      setPendingRemovalId(null);
    } catch {
      setError("Could not remove the saved report. Please try again.");
    }
  }
  async function openSavedReport(item: SavedReport) {
    setPendingRemovalId(null);
    setReport(item);
    setReportImage(null);
    if (item.hasScreenshot) {
      try {
        const screenshot = await getScreenshot(item.id);
        setReportImage(screenshot);
        if (!screenshot) showReportFeedback("screenshot", "error", "The saved screenshot could not be found in this browser.");
      } catch {
        showReportFeedback("screenshot", "error", "The saved screenshot could not be opened.");
      }
    }
    window.setTimeout(() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" }), 0);
  }
  function fileToDataUrl(image: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === "string" ? resolve(reader.result) : reject(new Error("Could not read screenshot."));
      reader.onerror = () => reject(reader.error || new Error("Could not read screenshot."));
      reader.readAsDataURL(image);
    });
  }
  async function downloadPdf() {
    if (!report || pdfLoading) return;
    setPdfLoading(true);
    try {
      const { downloadReportPdf } = await import("@/lib/report-pdf");
      const screenshot = reportImage ? await fileToDataUrl(reportImage) : undefined;
      downloadReportPdf(report, language, screenshot);
      showReportFeedback("pdf", "success", "PDF download started.");
    } catch {
      showReportFeedback("pdf", "error", "Could not create the PDF. Please try again.");
    } finally {
      setPdfLoading(false);
    }
  }
  function downloadScreenshot() {
    if (!report || !reportImage) return;
    try {
      const extension = reportImage.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "png";
      const url = URL.createObjectURL(reportImage);
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = `${slug(report.title)}-screenshot.${extension}`; anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 0);
      showReportFeedback("screenshot", "success", "Screenshot download started. Attach it to your ticket.");
    } catch {
      showReportFeedback("screenshot", "error", "Could not download the screenshot. Please try again.");
    }
  }
  function download(filename: string, content: string) {
    const url = URL.createObjectURL(new Blob([content], { type: "text/markdown;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
  }
  function slug(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "bug-report"; }
  const canClearForm = Boolean(file || context || pageUrl || requestedReportType !== "auto");

  return <main>
    <header className="topbar"><div className="header-inner"><a className="brand" href="#top"><strong>boring</strong><span>Bugshot</span></a><nav><a href="#how">How it works</a><a href="#output">What you get</a><a href="#openai-core">OpenAI core</a><a href="#workspace">Workspace <b>{saved.length}</b></a><a className="nav-cta" href="#tool">Try Bugshot</a></nav></div></header>
    <div className="hero-layout" id="top">
    <section className="hero">
      <p className="eyebrow"><i aria-hidden="true" /> OPENAI BUILD WEEK PROJECT</p>
      <h1><span>boring</span> Bugshot</h1>
      <p className="hero-kicker">One screenshot in. One <span className="keep-together">bug report</span> out.</p>
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
        <textarea id="context" value={context} maxLength={4000} onChange={(e) => { setContext(e.target.value); setHasAnalyzedCurrentForm(false); }} placeholder="What were you trying to do? Where did this happen?" />
        <label htmlFor="page-url">Page URL <span>optional · added to exports</span></label>
        <input id="page-url" type="url" value={pageUrl} maxLength={2048} onChange={(e) => { setPageUrl(e.target.value); setHasAnalyzedCurrentForm(false); }} placeholder="https://example.com/page" />
        <div className="request-settings">
          <label className="report-type-select" htmlFor="report-type">Report type <span>choose per request</span><select id="report-type" value={requestedReportType} onChange={(e) => { setRequestedReportType(e.target.value as RequestedReportType); setHasAnalyzedCurrentForm(false); }}>{requestedReportTypes.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}</select><small>{requestedReportTypes.find((item) => item.code === requestedReportType)?.description}</small></label>
          <label className="language-select" htmlFor="report-language">Language <span>remembered</span><select id="report-language" value={language} onChange={(e) => chooseLanguage(e.target.value as ReportLanguage)}>{reportLanguages.map((item) => <option key={item.code} value={item.code}>{item.short} · {item.label}</option>)}</select></label>
        </div>
        <p className="privacy"><strong>Before you analyze:</strong> Your screenshot, optional context, report type, and output language are sent to OpenAI through our server to create the report. The optional page URL is not sent to OpenAI. If you save the result, its report and screenshot stay only in this browser on this device; removing the saved report deletes both. Do not upload confidential or personal data unless you are authorized to share it. <Link href="/datenschutz" target="_blank" rel="noreferrer">Privacy details</Link></p>
        <div className="form-actions"><button className="primary" onClick={analyze} disabled={loading || !file}>{loading ? "Reading the screenshot…" : hasAnalyzedCurrentForm ? "Create report again →" : "Create bug report →"}</button><button className="clear-form" type="button" onClick={clearForm} disabled={loading || !canClearForm} title="Remove the current screenshot and reset the request fields. Generated and saved reports are not deleted.">Clear form</button></div>
        {error && <p className="message error">{error}</p>}{notice && <p className="message success">{notice}</p>}
      </div>
    </section>
    </div>
    <section className="build-strip"><div><strong>Built with Codex for OpenAI Build Week.</strong><p>GPT-5.6 reads the screenshot. Structured Outputs turn the result into an editable, server-validated report — a focused workflow instead of a chat wrapper.</p></div></section>
    {report && <section className="report" id="report">
      <div className="section-heading"><div><p className="eyebrow">STRUCTURED OUTPUT</p><h2>Review the report</h2></div><div className="report-actions"><div className="actions"><button className={reportFeedback?.source === "save" && reportFeedback.type === "success" ? "is-saved" : ""} onClick={saveReport}>{reportFeedback?.source === "save" && reportFeedback.type === "success" ? "Saved ✓" : "Save"}</button><button className="pdf-action" onClick={downloadPdf} disabled={pdfLoading}>{pdfLoading ? "Creating PDF…" : "PDF ↓"}</button><button onClick={() => download(`${slug(report.title)}.md`, reportToMarkdown(report))}>Markdown ↓</button><button onClick={() => download(`${slug(report.title)}-issue.md`, reportToIssueText(report))}>Issue text ↓</button><button onClick={downloadScreenshot} disabled={!reportImage} title={reportImage ? "Download the original screenshot to attach to your ticket." : "No screenshot is available for this report."}>Screenshot ↓</button></div>{reportFeedback && <p className={`report-feedback ${reportFeedback.type}`} role="status" aria-live="polite">{reportFeedback.type === "success" ? "✓ " : ""}{reportFeedback.message}</p>}</div></div>
      <div className="report-grid">
        <label className="wide">Title<input value={report.title} onChange={(e) => update("title", e.target.value)} /></label>
        <label className="wide">Page URL<input type="url" value={report.page_url} onChange={(e) => update("page_url", e.target.value)} placeholder="Not supplied" /></label>
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
      <div className="audience-grid"><h2>For people who find bugs.<br />And people who have to fix them.</h2><div><p><AudienceIcon name="developers" /><span>Developers</span></p><p><AudienceIcon name="designers" /><span>Designers</span></p><p><AudienceIcon name="freelancers" /><span>Freelancers</span></p><p><AudienceIcon name="agencies" /><span>Agencies</span></p><p><AudienceIcon name="teams" /><span>Small product teams</span></p><p><AudienceIcon name="projects" /><span>Client projects</span></p></div></div>
    </section>
    <section className="principles" id="openai-core">
      <div><p className="eyebrow">TECHNICAL IMPLEMENTATION</p><h2>Vision in.<br />Structured data out.</h2></div>
      <div><p>Bugshot sends the screenshot and optional context to GPT-5.6 through the Responses API. Structured Outputs are parsed into a Zod schema on the server before the interface can use them.</p><blockquote>The model is the product core. The interface turns it into a dependable handoff.</blockquote></div>
    </section>
    <section className="workspace" id="workspace">
      <div className="section-heading"><div><p className="eyebrow">THIS BROWSER</p><h2>Saved reports</h2></div></div>
      {saved.length === 0 ? <p className="empty">No saved reports yet. Your first useful ticket will land here.</p> : <div className="saved-list">{saved.map((item) => <article className="saved-card" key={item.id}><button className="saved-open" onClick={() => openSavedReport(item)}><span>{item.title}</span><small>{item.category} · {new Date(item.savedAt).toLocaleDateString()}{item.hasScreenshot ? " · Screenshot saved" : ""}</small></button><button className={`saved-remove ${pendingRemovalId === item.id ? "is-confirming" : ""}`} onClick={() => removeSavedReport(item.id)} aria-label={`${pendingRemovalId === item.id ? "Confirm removing" : "Remove"} ${item.title} from saved reports`}>{pendingRemovalId === item.id ? "Confirm remove" : "Remove"}</button></article>)}</div>}
    </section>
    <section className="process" id="process">
      <div className="process-intro"><div><p className="eyebrow">HOW BUGSHOT WORKS</p><h2>A focused path from visual evidence to a usable ticket.</h2></div><p>Bugshot is built for the handoff, not for a long conversation. It combines visual analysis with a constrained report structure, then leaves the final wording in human hands.</p></div>
      <div className="process-layout">
        <ol className="process-flow">
          <li><span>01</span><div><h3>Add the evidence</h3><p>Paste, drop, or choose one screenshot. Optional context can clarify the intent; a page URL stays separate as report metadata.</p></div></li>
          <li><span>02</span><div><h3>Read the visible issue</h3><p>GPT-5.6 uses vision input to inspect what is actually shown. Automatic mode selects the most useful technical, design, UX, or accessibility perspective.</p></div></li>
          <li><span>03</span><div><h3>Constrain the result</h3><p>Structured Outputs place the response into a fixed report schema. The server validates that structure with Zod before the interface accepts it.</p></div></li>
          <li><span>04</span><div><h3>Review and hand off</h3><p>Every field remains editable. Save the report and screenshot locally, then export PDF, Markdown, issue text, or the original image.</p></div></li>
        </ol>
        <aside className="process-principles"><h3>What makes the result useful</h3><ul><li><strong>One primary issue</strong><span>A focused report instead of an unfocused list.</span></li><li><strong>Evidence over guesses</strong><span>Visible findings are separated from unverified technical causes.</span></li><li><strong>Clear triage</strong><span>Category, report type, and a four-level priority scale support the next decision.</span></li><li><strong>Human control</strong><span>Edit before saving or exporting; review is available without becoming a required extra workflow.</span></li><li><strong>Browser-local workspace</strong><span>Saved reports and screenshots stay on the current device.</span></li></ul></aside>
      </div>
    </section>
    <footer><BoringWorksSignature withTagline /><nav><a href="#top" target="_blank" rel="noreferrer">Top</a><a href="#openai-core" target="_blank" rel="noreferrer">OpenAI core</a><a href="#workspace" target="_blank" rel="noreferrer">Workspace</a><Link href="/impressum" target="_blank" rel="noreferrer">Impressum</Link><Link href="/datenschutz" target="_blank" rel="noreferrer">Datenschutz</Link><Link className="demo-link" href="/demo" target="_blank" rel="noreferrer">Demo lab</Link></nav></footer>
  </main>;
}
