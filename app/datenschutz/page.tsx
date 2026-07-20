import type { Metadata } from "next";
import Link from "next/link";
import { BoringWorksSignature } from "@/app/boring-works-signature";

export const metadata: Metadata = {
  title: "Datenschutz / Privacy — boring Bugshot",
  description: "Datenschutzhinweise and privacy information for boring Bugshot.",
};

export default function DatenschutzPage() {
  return <main className="legal-page">
    <header className="legal-header"><div><Link className="brand" href="/"><strong>boring</strong><span>Bugshot</span></Link><Link className="legal-back" href="/">Zurück zu Bugshot / Back to Bugshot</Link></div></header>
    <article className="legal-content">
      <p className="eyebrow"><i aria-hidden="true" /> DATENSCHUTZ · PRIVACY</p>
      <h1>Datenschutz / Privacy</h1>

      <section className="legal-language" lang="de">
        <p className="legal-language-label">DEUTSCH</p>
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
      </section>

      <section className="legal-language legal-language-secondary" lang="en">
        <p className="legal-language-label">ENGLISH</p>
        <p className="legal-note"><strong>In short:</strong> When you start an analysis, your screenshot, optional context, selected report type, and output language are sent through our server to the OpenAI API. Only if you then select “Save” are the report and screenshot also stored locally in this browser. Do not upload confidential or personal data unless you are authorized to share it.</p>
        <p>This English translation is provided for convenience. In case of discrepancies, the German version above takes precedence.</p>

        <h2>1. Controller</h2>
        <address>
          Christian Kubisch<br />
          boring works by Kubisch Digital<br />
          Hörsterstraße 20<br />
          48143 Münster<br />
          Germany<br />
          Email: <a href="mailto:chris@kubisch-design.de">chris@kubisch-design.de</a><br />
          Phone: <a href="tel:+4915164579952">+49 151 64579952</a>
        </address>

        <h2>2. Hosting and technical access data</h2>
        <p>This website is provided through Netlify. When you access it, technically necessary data may be processed, in particular your IP address, the time of access, the requested address, and browser and device information. This processing supports the secure and stable provision of the website. The legal basis is Article 6(1)(f) GDPR; our legitimate interest is the secure operation of this service.</p>
        <p>Service provider: Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA. For transfers to third countries, Netlify states that it uses appropriate safeguards such as Standard Contractual Clauses and the EU-US Data Privacy Framework. More information: <a href="https://www.netlify.com/privacy/" target="_blank" rel="noreferrer">Netlify Privacy Statement</a>.</p>

        <h2>3. Screenshot analysis with OpenAI</h2>
        <p>Only when you start the analysis using “Create bug report” does Bugshot send the selected screenshot, any optional context, the selected report type, and the output language to the OpenAI API. OpenAI processes this information to create the requested structured bug report. Depending on the screenshot or context, the submitted data may also contain personal data.</p>
        <p>An optional page URL is validated by the Bugshot server and added unchanged to the report and its exports as metadata. It is not sent to OpenAI.</p>
        <p>The legal basis is Article 6(1)(b) GDPR where the processing is necessary to provide the analysis you requested. The analysis function cannot be provided without transmitting the input to OpenAI.</p>
        <p>Service provider for users in the European Economic Area: OpenAI Ireland Ltd., 1st Floor, The Liffey Trust Centre, 117–126 Sheriff Street Upper, Dublin 1, D01 YC43, Ireland. For API customer data, OpenAI acts as a processor under its Data Processing Addendum. Bugshot configures the API request with <code>store: false</code>. OpenAI nevertheless states that abuse monitoring logs may by default contain content and metadata and may be retained for up to 30 days unless a longer retention period is required by law.</p>
        <p>According to OpenAI, API inputs and outputs are not used to train its models by default unless the API account owner explicitly opts in to data sharing. More information: <a href="https://platform.openai.com/docs/models/default-usage-policies-by-endpoint" target="_blank" rel="noreferrer">OpenAI API data controls</a> and the <a href="https://openai.com/policies/data-processing-addendum/" target="_blank" rel="noreferrer">OpenAI Data Processing Addendum</a>.</p>

        <h2>4. Local storage in the browser</h2>
        <p>The preview of the selected screenshot initially remains available only for the current browser session. If you explicitly click “Save” after the analysis, Bugshot stores the generated report in local storage and the associated screenshot in this browser&apos;s local IndexedDB. This allows the screenshot to be displayed again, downloaded, and embedded in a PDF when you reopen the saved report.</p>
        <p>These locally stored report and screenshot data are not sent to Netlify for storage or sent to OpenAI again. They are not synchronized between devices and are available only in this browser on this device. If you delete a saved report using “Remove” and “Confirm remove”, Bugshot also deletes the associated screenshot from the local browser database. You can also remove all local data through your browser&apos;s website-data settings.</p>
        <p>The selected output language is also stored locally so that Bugshot can remember it for your next visit.</p>

        <h2>5. Cookies and analytics</h2>
        <p>Bugshot currently does not use its own analytics, advertising, or marketing cookies.</p>

        <h2>6. Your rights</h2>
        <p>Subject to the applicable legal requirements, you have rights including access, rectification, erasure, restriction of processing, data portability, and objection. You may withdraw consent with effect for the future. You also have the right to lodge a complaint with a data protection supervisory authority.</p>
        <p>For questions or to exercise your rights, email <a href="mailto:chris@kubisch-design.de">chris@kubisch-design.de</a>.</p>

        <h2>7. Last updated</h2>
        <p>20 July 2026</p>
      </section>
    </article>
    <footer className="legal-footer"><BoringWorksSignature /><nav><Link href="/" target="_blank" rel="noreferrer">Tool</Link><Link href="/impressum" target="_blank" rel="noreferrer">Impressum / Legal notice</Link></nav></footer>
  </main>;
}
