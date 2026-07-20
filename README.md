# boring Bugshot

> One screenshot in. One bug report out.

Lauffaehige MVP-Version eines visuellen Bug-Reporting-Tools fuer die OpenAI Build Week.

## Live

**[boring-bugshot.netlify.app](https://boring-bugshot.netlify.app/)**

Der oeffentliche Netlify-Stand ist mit `main` im GitHub-Repository [CKViking/boring-bugshot](https://github.com/CKViking/boring-bugshot) verbunden. Ein vollstaendiger Smoke-Test am 19. Juli 2026 bestaetigte Screenshot-Analyse, GPT-5.6 Structured Output, Bearbeitung, lokales Speichern, PDF- und Markdown-Export sowie Demo Lab, Impressum und Datenschutz.

## Funktionen

- Screenshot-Upload, Drag-and-drop und direktes Einfuegen aus der Zwischenablage mit `Ctrl+V`
- optionaler Kontext
- optionale, separat validierte Seiten-URL in Report, PDF, Markdown und Issue-Text; die URL wird nicht an OpenAI gesendet
- serverseitige OpenAI-Vision-Analyse ueber die Responses API
- validierte Structured Outputs
- editierbarer Bug Report
- Browser-Workspace fuer bis zu 30 Reports; zugehoerige Screenshots werden lokal per IndexedDB gespeichert und beim Zwei-Klick-Entfernen mitgeloescht
- Download als gestaltete PDF mit Screenshot, Markdown, Issue-Text oder separate Screenshot-Anlage
- Ausgabesprache waehlen: Englisch, Deutsch, Spanisch oder Niederlaendisch
- Report-Perspektive waehlen: Automatic, Technical, Design, UX oder Accessibility
- fokussierte Produktseite mit sichtbarem OpenAI-Build-Week- und GPT-5.6-Kern
- englisches Demo Lab unter `/demo` mit vier reproduzierbaren Beispiel-Bugs
- originales boring-works-Favicon sowie dezentes boring-works-Wortzeichen als Absender im Footer

## Lokal starten

Voraussetzungen:

- Node.js 20.9 oder neuer
- OpenAI-API-Key mit aktivierter API-Abrechnung

Einmalige Einrichtung:

```powershell
npm install
Copy-Item .env.example .env.local
```

Danach `.env.local` oeffnen und den echten Key eintragen:

```env
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.6
```

App starten:

```powershell
npm run dev
```

Anschliessend http://localhost:3000 oeffnen.

Der API-Key wird nur serverseitig gelesen. `.env.local` wird durch `.gitignore` vom Git-Upload ausgeschlossen.

## Auf Netlify veroeffentlichen

Die App ist fuer GitHub plus Netlify vorbereitet. Die vollstaendige Anleitung fuer Einsteiger steht in:

**[DEPLOY_NETLIFY.md](./DEPLOY_NETLIFY.md)**

Der gepruefte Stand und die letzten Schritte vor der Hackathon-Einreichung stehen in:

**[PRELAUNCH_CHECKLIST.md](./PRELAUNCH_CHECKLIST.md)**

Netlify-Einstellungen:

```text
Branch: main
Build command: npm run build
Publish directory: .next
Node.js: 22
```

Erforderliche Netlify Environment Variables:

```text
OPENAI_API_KEY = geheimer OpenAI-API-Key
OPENAI_MODEL = gpt-5.6
```

Die Einstellungen fuer Build, Publish-Verzeichnis und Node.js sind zusaetzlich in `netlify.toml` hinterlegt.

## Grenzen dieser ersten Version

- Uploads sind wegen des Netlify-Limits auf 4 MB begrenzt.
- Reports werden im `localStorage` und ihre Screenshots in der IndexedDB des jeweiligen Browsers gespeichert, nicht auf Netlify oder in einer gemeinsamen Datenbank.
- Gespeicherte Screenshots bleiben dadurch auch nach einem Neuladen fuer PDF und Download verfuegbar. Die Daten werden nicht zwischen Browsern oder Geraeten synchronisiert und verschwinden beim Entfernen des Reports beziehungsweise beim Loeschen der Website-Daten.
- Jeder Analyseaufruf verbraucht das OpenAI-API-Budget des Betreibers.
- Ein einfaches serverseitiges Rate Limit bremst wiederholte Aufrufe pro Verbindung. Fuer eine breite oeffentliche Freigabe bleibt dauerhafter Missbrauchsschutz erforderlich.
- Pro Screenshot wird derzeit ein Report fuer den wichtigsten sichtbaren Fehler erzeugt.

## Pre-Launch-Fokus

- Die oeffentliche Seite stellt Bugshot und den OpenAI-Kern in den Vordergrund; die boring-Dachmarke bleibt dezent.
- Die technische Umsetzung wird direkt benannt: GPT-5.6-Bildinput, Responses API, Structured Outputs und serverseitige Zod-Validierung.
- Die Responsive-Demo zeigt den 390-Pixel-Viewport bewusst in einem neutralen Desktop-Browser-Rahmen mit sichtbaren Scrollbars.

## Technische Pruefung

```powershell
npm run lint
npm run build
```

## Produktversprechen

Screenshots in. Useful reports out. No drama.
