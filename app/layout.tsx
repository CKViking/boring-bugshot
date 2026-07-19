import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "boring Bugshot — Screenshot to bug report",
  description: "Turn one screenshot into a structured, editable bug report with GPT-5.6 vision and Structured Outputs.",
  applicationName: "boring Bugshot",
  keywords: ["bug report", "screenshot", "GPT-5.6", "OpenAI Build Week", "visual QA"],
  openGraph: {
    title: "boring Bugshot",
    description: "One screenshot in. One structured bug report out.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
