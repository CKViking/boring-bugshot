import { z } from "zod";

export const categories = ["layout", "copy", "accessibility", "ux", "visual_hierarchy", "responsiveness", "other"] as const;
export const priorities = ["critical", "important", "nice_to_have"] as const;
export const reportTypes = ["technical", "design", "ux", "accessibility"] as const;

export const generatedReportSchema = z.object({
  title: z.string().min(1),
  report_type: z.enum(reportTypes),
  category: z.enum(categories),
  priority: z.enum(priorities),
  problem: z.string().min(1),
  impact: z.string().min(1),
  fix_suggestion: z.string().min(1),
  ticket_text: z.string().min(1),
});

export const reportSchema = generatedReportSchema.extend({
  page_url: z.string(),
});

export type BugReport = z.infer<typeof reportSchema>;

export function reportToIssueText(report: BugReport) {
  const url = report.page_url ? `Page URL: ${report.page_url}\n` : "";
  return `${url}Screenshot: Attach the downloaded screenshot file to this ticket.\n\n${report.ticket_text}`;
}

export function reportToMarkdown(report: BugReport) {
  const url = report.page_url ? `\n**Page URL:** ${report.page_url}` : "";
  return `# ${report.title}\n\n**Report type:** ${report.report_type}\n**Category:** ${report.category}\n**Priority:** ${report.priority}${url}\n**Screenshot:** Attach the downloaded screenshot file to this ticket.\n\n## Problem\n\n${report.problem}\n\n## Impact\n\n${report.impact}\n\n## Suggested fix\n\n${report.fix_suggestion}\n\n## Ticket text\n\n${report.ticket_text}\n`;
}
