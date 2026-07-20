import type { Metadata } from "next";
import Link from "next/link";
import { BoringWorksSignature } from "@/app/boring-works-signature";

export const metadata: Metadata = {
  title: "Datenschutz — boring Bugshot",
  description: "Datenschutzhinweise für boring Bugshot.",
};

export default function DatenschutzPage() {
  return <main className="legal-page" lang="de">
    <header className="legal-header"><div><Link className="brand" href="/"><strong>boring</strong><span>Bugshot</span></Link><Link className="legal-back" href="/">Zurück zu Bugshot</Link></div></header>
    <article className="legal-content">
      <p className="eyebrow"><i aria-hidden="true" /> DATENSCHUTZHINWEISE</p>
      <h1>Datenschutz</h1>
      <p className="legal-note"><strong>Kurz gesagt:</strong> Wenn du eine Analyse startest, werden der Screenshot, dein optionaler Kontext, der gewählte Report-Typ und die Ausgabesprache über unseren Server an die OpenAI API übermittelt. Erst wenn du anschließend „Save“ auswählst, werden Report und Screenshot zusätzlich ausschließlich lokal in diesem Browser gespeichert. Lade keine vertraulichen oder personenbezogenen Daten hoch, wenn du nicht zu ihrer Weitergabe berechtigt bist.</p>

      <h2>1. Verantwortlicher</h2>
      <address>
        Christian Kubisch<br />
        boring works by Kubisch Digital<br />
        Hörsterstraße 20<br />
        48143 Münster<br />
        E-Mail: <a href="mailto:chris@kubisch-design.de">chris@kubisch-design.de</a><br />
        Telefon: <a href="tel:+4915164579952">+49 151 64579952</a>
      </address>

      <h2>2. Hosting und technische Zugriffsdaten</h2>
      <p>Die Website wird über Netlify bereitgestellt. Beim Aufruf können technisch erforderliche Daten verarbeitet werden, insbesondere IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Adresse sowie Browser- und Geräteinformationen. Die Verarbeitung dient der sicheren und stabilen Bereitstellung der Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren Betrieb dieses Angebots.</p>
      <p>Dienstleister: Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA. Bei Übermittlungen in Drittländer setzt Netlify nach eigenen Angaben geeignete Schutzmechanismen wie Standardvertragsklauseln und das EU-US Data Privacy Framework ein. Weitere Informationen: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer">Datenschutzhinweise von Netlify</a>.</p>

      <h2>3. Screenshot-Analyse mit OpenAI</h2>
      <p>Erst wenn du die Analyse über „Create bug report“ startest, übermittelt Bugshot den ausgewählten Screenshot, den optional eingetragenen Kontext, den gewählten Report-Typ und die Ausgabesprache an die OpenAI API. OpenAI verarbeitet diese Angaben, um den angeforderten strukturierten Bug Report zu erzeugen. Abhängig vom Screenshot oder Kontext können dabei auch personenbezogene Daten enthalten sein.</p>
      <p>Eine optional eingetragene Seiten-URL wird vom Bugshot-Server validiert und unverändert als Metadatum in den Report und seine Exporte übernommen. Sie wird nicht an OpenAI übermittelt.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Bereitstellung der von dir angeforderten Analyse erforderlich ist. Ohne die Übermittlung an OpenAI kann die Analysefunktion nicht angeboten werden.</p>
      <p>Dienstleister für Nutzer im Europäischen Wirtschaftsraum: OpenAI Ireland Ltd., 1st Floor, The Liffey Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, D01 YC43, Irland. OpenAI handelt bei API-Kundendaten nach seinem Data Processing Addendum als Auftragsverarbeiter. Der API-Aufruf ist durch Bugshot mit <code>store: false</code> konfiguriert. OpenAI weist dennoch darauf hin, dass Missbrauchsüberwachungsprotokolle standardmäßig Inhalte und Metadaten enthalten und bis zu 30 Tage aufbewahrt werden können, sofern keine längere gesetzliche Aufbewahrung erforderlich ist.</p>
      <p>OpenAI verwendet Eingaben und Ausgaben der API nach eigenen Angaben standardmäßig nicht zum Training seiner Modelle, sofern der API-Kontoinhaber nicht ausdrücklich einer Datenfreigabe zugestimmt hat. Weitere Informationen: <a href="https://platform.openai.com/docs/models/default-usage-policies-by-endpoint" target="_blank" rel="noreferrer">OpenAI API data controls</a> und <a href="https://openai.com/policies/data-processing-addendum/" target="_blank" rel="noreferrer">OpenAI Data Processing Addendum</a>.</p>

      <h2>4. Lokale Speicherung im Browser</h2>
      <p>Die Vorschau des ausgewählten Screenshots bleibt zunächst nur für die aktuelle Nutzung im Browser. Wenn du nach der Analyse ausdrücklich auf „Save“ klickst, speichert Bugshot den erzeugten Report im lokalen Speicher und den dazugehörigen Screenshot in der lokalen IndexedDB dieses Browsers. Dadurch kann der Screenshot beim späteren Öffnen des Saved Reports erneut angezeigt, heruntergeladen und in ein PDF eingebettet werden.</p>
      <p>Diese lokal gespeicherten Report- und Screenshot-Daten werden nicht zur Speicherung an Netlify oder erneut an OpenAI übermittelt, nicht zwischen Geräten synchronisiert und sind nur in diesem Browser auf diesem Gerät verfügbar. Wenn du einen Saved Report über „Remove“ und „Confirm remove“ löschst, entfernt Bugshot auch den dazugehörigen Screenshot aus der lokalen Browser-Datenbank. Du kannst alle lokalen Daten außerdem über die Website-Daten deines Browsers löschen.</p>
      <p>Die gewählte Ausgabesprache wird ebenfalls lokal gespeichert, damit Bugshot sie bei der nächsten Nutzung wieder auswählt.</p>

      <h2>5. Cookies und Reichweitenmessung</h2>
      <p>Bugshot setzt derzeit keine eigene Reichweitenmessung, Werbung oder Marketing-Cookies ein.</p>

      <h2>6. Deine Rechte</h2>
      <p>Du hast im Rahmen der gesetzlichen Voraussetzungen insbesondere das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung kannst du mit Wirkung für die Zukunft widerrufen. Außerdem kannst du dich bei einer Datenschutzaufsichtsbehörde beschweren.</p>
      <p>Für Fragen oder die Ausübung deiner Rechte genügt eine Nachricht an <a href="mailto:chris@kubisch-design.de">chris@kubisch-design.de</a>.</p>

      <h2>7. Stand</h2>
      <p>20. Juli 2026</p>
    </article>
    <footer className="legal-footer"><BoringWorksSignature /><nav><Link href="/" target="_blank" rel="noreferrer">Tool</Link><Link href="/impressum" target="_blank" rel="noreferrer">Impressum</Link></nav></footer>
  </main>;
}
