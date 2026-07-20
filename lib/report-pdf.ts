import { jsPDF } from "jspdf";

import type { BugReport } from "./report";

export type PdfLanguage = "en" | "de" | "es" | "nl";

const copy = {
  en: {
    eyebrow: "STRUCTURED BUG REPORT",
    reportType: "Report type",
    category: "Category",
    priority: "Priority",
    pageUrl: "Page URL",
    screenshot: "Screenshot",
    problem: "Problem",
    impact: "Impact",
    fix: "Suggested fix",
    ticket: "Ticket text",
    created: "Created with boring Bugshot",
    page: "Page",
  },
  de: {
    eyebrow: "STRUKTURIERTER BUG REPORT",
    reportType: "Report-Typ",
    category: "Kategorie",
    priority: "Priorität",
    pageUrl: "Seiten-URL",
    screenshot: "Screenshot",
    problem: "Problem",
    impact: "Auswirkung",
    fix: "Lösungsvorschlag",
    ticket: "Ticket-Text",
    created: "Erstellt mit boring Bugshot",
    page: "Seite",
  },
  es: {
    eyebrow: "INFORME DE ERROR ESTRUCTURADO",
    reportType: "Tipo de informe",
    category: "Categoría",
    priority: "Prioridad",
    pageUrl: "URL de la página",
    screenshot: "Captura de pantalla",
    problem: "Problema",
    impact: "Impacto",
    fix: "Solución sugerida",
    ticket: "Texto del ticket",
    created: "Creado con boring Bugshot",
    page: "Página",
  },
  nl: {
    eyebrow: "GESTRUCTUREERD BUGRAPPORT",
    reportType: "Rapporttype",
    category: "Categorie",
    priority: "Prioriteit",
    pageUrl: "Pagina-URL",
    screenshot: "Schermafbeelding",
    problem: "Probleem",
    impact: "Impact",
    fix: "Voorgestelde oplossing",
    ticket: "Tickettekst",
    created: "Gemaakt met boring Bugshot",
    page: "Pagina",
  },
} as const;

const colors = {
  navy: [15, 55, 98] as const,
  green: [89, 158, 110] as const,
  blue: [196, 210, 227] as const,
  page: [240, 245, 251] as const,
  ink: [0, 0, 0] as const,
  muted: [82, 103, 125] as const,
  white: [255, 255, 255] as const,
};

function pdfSafeText(value: string) {
  return value
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, "-")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2026/g, "...")
    .replace(/\u2022/g, "-")
    .replace(/\u00a0/g, " ")
    .trim();
}

function filenameSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "bug-report";
}

function displayValue(value: string) {
  return pdfSafeText(value.replaceAll("_", " "));
}

export function createReportPdf(report: BugReport, language: PdfLanguage = "en", screenshot?: string) {
  const labels = copy[language] || copy.en;
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;
  const footerY = pageHeight - 10;
  const contentBottom = pageHeight - 23;
  let y = 0;

  pdf.setProperties({
    title: pdfSafeText(report.title),
    subject: "boring Bugshot report",
    author: "boring works",
    creator: "boring Bugshot",
  });

  function addFirstPageHeader() {
    pdf.setFillColor(...colors.navy);
    pdf.rect(0, 0, pageWidth, 23, "F");
    pdf.setFillColor(...colors.green);
    pdf.rect(margin, 7, 4, 9, "F");
    pdf.setTextColor(...colors.white);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(15);
    pdf.text("boring", margin + 7, 13.1);
    pdf.setFont("helvetica", "normal");
    pdf.text("Bugshot", margin + 26.5, 13.1);
    y = 34;
  }

  function addContinuationHeader() {
    pdf.setTextColor(...colors.navy);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.text("boring Bugshot", margin, 13);
    pdf.setDrawColor(...colors.blue);
    pdf.line(margin, 17, pageWidth - margin, 17);
    y = 26;
  }

  function addPage() {
    pdf.addPage();
    addContinuationHeader();
  }

  function ensureSpace(requiredHeight: number) {
    if (y + requiredHeight > contentBottom) addPage();
  }

  function addSection(label: string, value: string) {
    const lines = pdf.splitTextToSize(pdfSafeText(value), contentWidth) as string[];
    ensureSpace(19);
    pdf.setTextColor(...colors.navy);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text(pdfSafeText(label).toUpperCase(), margin, y);
    y += 3.5;
    pdf.setDrawColor(...colors.blue);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 6;
    pdf.setTextColor(...colors.ink);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10.2);

    for (const line of lines.length ? lines : [""]) {
      if (y + 5.2 > contentBottom) {
        addPage();
        pdf.setTextColor(...colors.ink);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10.2);
      }
      pdf.text(line, margin, y);
      y += 5.2;
    }
    y += 7;
  }

  function addScreenshot(dataUrl: string) {
    const properties = pdf.getImageProperties(dataUrl);
    let imageWidth = contentWidth;
    let imageHeight = imageWidth * (properties.height / properties.width);
    const maxImageHeight = 105;
    if (imageHeight > maxImageHeight) {
      imageHeight = maxImageHeight;
      imageWidth = imageHeight * (properties.width / properties.height);
    }
    ensureSpace(imageHeight + 17);
    pdf.setTextColor(...colors.navy);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.text(labels.screenshot.toUpperCase(), margin, y);
    y += 3.5;
    pdf.setDrawColor(...colors.blue);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 6;
    const imageX = margin + (contentWidth - imageWidth) / 2;
    pdf.addImage(dataUrl, properties.fileType, imageX, y, imageWidth, imageHeight, undefined, "FAST");
    y += imageHeight + 7;
  }

  addFirstPageHeader();

  pdf.setTextColor(...colors.green);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.text(labels.eyebrow, margin, y);
  y += 8;

  pdf.setTextColor(...colors.ink);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(20);
  const titleLines = pdf.splitTextToSize(pdfSafeText(report.title), contentWidth) as string[];
  pdf.text(titleLines, margin, y);
  y += Math.max(titleLines.length, 1) * 8.2 + 5;

  const metadata = [
    [labels.reportType, displayValue(report.report_type)],
    [labels.category, displayValue(report.category)],
    [labels.priority, displayValue(report.priority)],
  ];
  const gap = 3;
  const cardWidth = (contentWidth - gap * 2) / 3;
  ensureSpace(23);
  metadata.forEach(([label, value], index) => {
    const x = margin + index * (cardWidth + gap);
    pdf.setFillColor(...colors.page);
    pdf.setDrawColor(...colors.blue);
    pdf.rect(x, y, cardWidth, 19, "FD");
    pdf.setTextColor(...colors.muted);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.text(pdfSafeText(label).toUpperCase(), x + 4, y + 6);
    pdf.setTextColor(...colors.navy);
    pdf.setFontSize(9.5);
    pdf.text(value, x + 4, y + 13.5, { maxWidth: cardWidth - 8 });
  });
  y += 28;

  if (report.page_url) addSection(labels.pageUrl, report.page_url);
  if (screenshot) addScreenshot(screenshot);
  addSection(labels.problem, report.problem);
  addSection(labels.impact, report.impact);
  addSection(labels.fix, report.fix_suggestion);
  addSection(labels.ticket, report.ticket_text);

  const pageCount = pdf.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    pdf.setPage(page);
    pdf.setDrawColor(...colors.blue);
    pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
    pdf.setTextColor(...colors.muted);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.text(labels.created, margin, footerY);
    pdf.text(`${labels.page} ${page} / ${pageCount}`, pageWidth - margin, footerY, { align: "right" });
  }

  return pdf;
}

export function downloadReportPdf(report: BugReport, language: PdfLanguage = "en", screenshot?: string) {
  const pdf = createReportPdf(report, language, screenshot);
  pdf.save(`${filenameSlug(report.title)}.pdf`);
}
