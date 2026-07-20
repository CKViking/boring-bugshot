import type { Metadata } from "next";
import Link from "next/link";
import { BoringWorksSignature } from "@/app/boring-works-signature";

export const metadata: Metadata = {
  title: "Impressum / Legal notice — boring Bugshot",
  description: "Impressum, Anbieterkennzeichnung, and legal notice for boring Bugshot.",
};

export default function ImpressumPage() {
  return <main className="legal-page">
    <header className="legal-header"><div><Link className="brand" href="/"><strong>boring</strong><span>Bugshot</span></Link><Link className="legal-back" href="/">Zurück zu Bugshot / Back to Bugshot</Link></div></header>
    <article className="legal-content">
      <p className="eyebrow"><i aria-hidden="true" /> RECHTLICHE ANGABEN · LEGAL INFORMATION</p>
      <h1>Impressum / Legal notice</h1>

      <section className="legal-language" lang="de">
        <p className="legal-language-label">DEUTSCH</p>
        <h2>Angaben gemäß § 5 DDG</h2>
        <address>
          Christian Kubisch<br />
          boring works by Kubisch Digital<br />
          Hörsterstraße 20<br />
          48143 Münster
        </address>

        <h2>Kontakt</h2>
        <p>Telefon: <a href="tel:+4915164579952">+49 151 64579952</a><br />
        E-Mail: <a href="mailto:chris@kubisch-design.de">chris@kubisch-design.de</a></p>

        <h2>Umsatzsteuer-ID</h2>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:</p>
        <p>DE244843302</p>

        <h2>Redaktionell verantwortlich</h2>
        <address>
          Christian Kubisch<br />
          Hörsterstraße 20<br />
          48143 Münster
        </address>
      </section>

      <section className="legal-language legal-language-secondary" lang="en">
        <p className="legal-language-label">ENGLISH</p>
        <p className="legal-note">This English translation is provided for convenience. In case of discrepancies, the German version above takes precedence.</p>

        <h2>Information pursuant to Section 5 DDG</h2>
        <address>
          Christian Kubisch<br />
          boring works by Kubisch Digital<br />
          Hörsterstraße 20<br />
          48143 Münster<br />
          Germany
        </address>

        <h2>Contact</h2>
        <p>Phone: <a href="tel:+4915164579952">+49 151 64579952</a><br />
        Email: <a href="mailto:chris@kubisch-design.de">chris@kubisch-design.de</a></p>

        <h2>VAT identification number</h2>
        <p>VAT identification number pursuant to Section 27a of the German Value Added Tax Act:</p>
        <p>DE244843302</p>

        <h2>Editorially responsible</h2>
        <address>
          Christian Kubisch<br />
          Hörsterstraße 20<br />
          48143 Münster<br />
          Germany
        </address>
      </section>
    </article>
    <footer className="legal-footer"><BoringWorksSignature /><nav><Link href="/" target="_blank" rel="noreferrer">Tool</Link><Link href="/datenschutz" target="_blank" rel="noreferrer">Datenschutz / Privacy</Link></nav></footer>
  </main>;
}
