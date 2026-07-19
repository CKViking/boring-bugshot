import { z } from "zod";

export const categories = ["layout", "copy", "accessibility", "ux", "visual_hierarchy", "responsiveness", "other"] as const;
export const priorities = ["critical", "important", "nice_to_have"] as const;
export const reportTypes = ["technical", "design", "ux", "accessibility"] as const;

export const reportSchema = z.object({
  title: z.string().min(1),
  report_type: z.enum(reportTypes),
  category: z.enum(categories),
  priority: z.enum(priorities),
  problem: z.string().min(1),
  impact: z.string().min(1),
  fix_suggestion: z.string().min(1),
  ticket_text: z.string().min(1),
});

export type BugReport = z.infer<typeof reportSchema>;

export function reportToMarkdown(report: BugReport) {
  return `# ${report.title}\n\n**Report type:** ${report.report_type}\n**Category:** ${report.category}\n**Priority:** ${report.priority}\n\n## Problem\n\n${report.problem}\n\n## Impact\n\n${report.impact}\n\n## Suggested fix\n\n${report.fix_suggestion}\n\n## Ticket text\n\n${report.ticket_text}\n`;
}
