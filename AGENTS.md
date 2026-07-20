# Codex Project Rules

Dieses Projekt ist die aktive Entwicklungsumgebung fuer **boring Bugshot**.

boring Bugshot ist ein Hackathon-/Build-Week-Projekt fuer ein visuelles Bug-Reporting-Tool: Ein Screenshot rein, ein strukturierter Bug Report raus.

## Projektkontext

- Dachmarke: boring works
- Produktname: boring Bugshot
- Claim: One screenshot in. One bug report out.
- Deutscher Claim: Ein Screenshot rein. Ein Bug Report raus.
- Wettbewerbskontext: OpenAI Build Week, https://openai.com/build-week/
- Submission-Kontext: Challenge-Projekt mit Fokus auf Codex als Build-Werkzeug und OpenAI/GPT-5.6 als Produktkern.

## Zweck

Dieses Projekt soll eine kleine Web-App entwickeln, die aus einem einzelnen Screenshot einen strukturierten, editierbaren und exportierbaren Bug Report erzeugt.

Das Produktversprechen:

> Screenshots in. Useful reports out. No drama.

## Produktkern

Der Nutzer soll:

1. einen Screenshot hochladen koennen,
2. optional Kontext hinzufuegen koennen,
3. eine Analyse ueber die OpenAI API starten koennen,
4. strukturierte Bug Reports erhalten,
5. Reports bearbeiten und speichern koennen,
6. Reports als Markdown oder issue-ready Text exportieren koennen.

Der OpenAI-Kern ist multimodale Bildanalyse plus Structured Outputs. Die KI soll kein Chatfenster sein, sondern aus visuellem Input ein klares, validierbares Report-Schema erzeugen.

## Report-Schema

Ein generierter Report soll mindestens enthalten:

- title
- category
- priority
- problem
- impact
- fix_suggestion
- ticket_text

Moegliche Kategorien:

- layout
- copy
- accessibility
- ux
- visual_hierarchy
- responsiveness
- other

Moegliche Prioritaeten:

- critical
- important
- medium
- nice_to_have

## MVP-Scope

Must-have fuer die erste Version:

- Screenshot Upload
- optionales Kontextfeld
- serverseitiger OpenAI API Call
- Vision Input
- Structured Output
- editierbare Report-Anzeige
- Speichern in einem einfachen Workspace
- PDF-, Markdown- oder GitHub-Issue-Export

Bewusst nicht im ersten MVP:

- WordPress-Plugin-Version
- Team-Accounts
- komplexe Projektverwaltung
- mehrere Export-Integrationen
- Kundenreport-Branding
- mehrsprachiger Workflow

## Architektur-Leitplanken

- API Keys bleiben immer serverseitig.
- Kein OpenAI API Key im Frontend.
- Modellname konfigurierbar halten, zum Beispiel ueber `OPENAI_MODEL`.
- `OPENAI_API_KEY` nur ueber Environment-Variable laden.
- Structured Output serverseitig validieren, bevor Daten gespeichert werden.
- Fuer den Hackathon ist ein kleiner, nachvollziehbarer Stack wichtiger als maximale Plattform-Reife.

## Build-Week-Pitch

Elevator Pitch:

> boring Bugshot turns a single screenshot into a structured, editable bug report. Upload a screenshot, add optional context, and OpenAI analyzes the image to generate a clear report with title, category, priority, problem, impact, and fix suggestion. Edit it, save it, and export it as Markdown or issue-ready text. Screenshots in, useful reports out. No drama.

Problem:

Viele Web-, Plugin- und App-Probleme entstehen zuerst visuell. Man sieht sofort, dass etwas nicht stimmt, aber daraus ein klares, priorisiertes Ticket zu machen kostet Zeit. boring Bugshot schliesst die Luecke zwischen visuellem Fund und brauchbarem Bug Report.

## Bewertungskriterien im Blick behalten

Das Projekt soll fuer die OpenAI Build Week zeigen:

- Technological Implementation: OpenAI Vision + Structured Outputs, nicht nur ein Chat-Wrapper.
- Design: ein durchgaengiger Flow von Upload zu Analyse zu Edit zu Export.
- Potential Impact: konkreter Nutzen fuer Entwickler, Designer, Freelancer, Agenturen und kleine Produktteams.
- Quality of the Idea: eine fokussierte, nicht ueberladene Loesung fuer ein echtes wiederkehrendes Problem.

## boring Markenregeln

- Ruhig, praktisch, klar, nicht hype-getrieben.
- Keine AI-Magic-Sprache.
- Kein ueberladenes QA- oder Projektmanagement-System bauen.
- Das Tool soll eine laestige Zwischenaufgabe abnehmen und dann aus dem Weg gehen.
- Public-facing Copy bevorzugt Englisch, interne Strategie und Zusammenarbeit bevorzugt Deutsch.

## Beziehung zum Lab

Strategische Entscheidungen, Markenentscheidungen, Roadmap-Aenderungen und finale Produkttexte muessen im selben Arbeitsgang auch im Lab-Projekt aktualisiert werden:

`E:\OneDrive\Dokumente\CODEX\boring\boring-plugin-lab\current-state\`

Dieses DEV-Projekt ist fuer konkrete Implementierung. Das Lab bleibt zentrale Quelle fuer Marke, Strategie und aktuellen Stand der boring-Familie.
