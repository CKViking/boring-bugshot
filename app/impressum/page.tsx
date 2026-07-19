import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum — boring Bugshot",
  description: "Impressum und Anbieterkennzeichnung für boring Bugshot.",
};

export default function ImpressumPage() {
  return <main className="legal-page" lang="de">
    <header className="legal-header"><div><Link className="brand" href="/"><strong>boring</strong><span>Bugshot</span></Link><Link className="legal-back" href="/">Zurück zu Bugshot</Link></div></header>
    <article className="legal-content">
      <p className="eyebrow"><i aria-hidden="true" /> RECHTLICHE ANGABEN</p>
      <h1>Impressum</h1>

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
    </article>
    <footer className="legal-footer"><div><span><strong>boring</strong> Bugshot</span></div><nav><Link href="/">Tool</Link><Link href="/datenschutz">Datenschutz</Link></nav></footer>
  </main>;
}
