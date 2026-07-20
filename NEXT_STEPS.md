# boring Bugshot - Next steps

## UX-Idee fuer den naechsten Arbeitstag

Stand: 16. Juli 2026

Das aktuelle Upload-Formular wirkt durch die gleichzeitig sichtbaren Sprach- und Reporttyp-Optionen zu komplex. Die Kerninteraktion soll wieder einfacher und ruhiger werden.

Zu pruefende Richtung:

- Im normalen Formular nur die Standardwerte prominent anzeigen:
  - Sprache: `EN`
  - Reporttyp: `Automatic`
- Weitere Sprachen und Reporttypen nicht dauerhaft gleichberechtigt darstellen.
- Alternative Werte erst nach einer bewussten Aktion zeigen, zum Beispiel ueber:
  - Dropdown-Menues,
  - kompakte Select-Felder,
  - oder einen Bereich `More options` / `Advanced options`.
- Der Nutzer soll einen Screenshot ohne Konfigurationsaufwand einfuegen und direkt analysieren koennen.
- Die erweiterten Optionen sollen auffindbar bleiben, aber die Hauptaufgabe nicht visuell dominieren.

Offene UX-Frage fuer morgen:

> Welche reduzierte Darstellung macht `EN + Automatic` als sinnvolle Defaults sofort verstaendlich, ohne die weiteren Optionen zu verstecken oder das Formular wieder kompliziert wirken zu lassen?

## Entscheidung und Umsetzung vom 17. Juli 2026

- Der Reporttyp bleibt pro Anfrage gut sichtbar und wird als grosses Dropdown dargestellt.
- `Automatic` ist der Standardwert.
- Die Sprache wird als kleines Dropdown dargestellt.
- Die Sprachwahl wird im Browser gespeichert und bei spaeteren Anfragen wiederverwendet.
- Die dauerhaft sichtbaren Gruppen aus vier beziehungsweise fuenf gleichberechtigten Buttons wurden entfernt.

Status: umgesetzt.

## Pre-Launch-Haertung vom 18. Juli 2026

- Cross-Selling auf der Toolseite wurde reduziert; Bugshot und der OpenAI-Build-Week-Nachweis stehen im Vordergrund.
- GPT-5.6 Vision, Responses API, Structured Outputs und serverseitige Schema-Validierung werden sichtbar erklaert.
- Upload-Typ und 4-MB-Grenze werden bereits im Browser validiert.
- Die Datenschutzzusammenfassung macht die serverseitige OpenAI-Verarbeitung explizit.
- Ein einfaches Rate Limit begrenzt wiederholte Analyseaufrufe pro Verbindung.
- Das Responsive-Demo-Beispiel sitzt in einem neutralen Desktop-Browser-Rahmen; horizontale und vertikale Scrollbars machen den Fehler eindeutig.

Status: umgesetzt und auf dem oeffentlichen Netlify-Deployment erfolgreich getestet.

## Export und Speicher-Feedback vom 17. Juli 2026

- Nach dem Speichern bestaetigt der Save-Button den Vorgang sichtbar mit `Saved ✓`.
- Direkt am Report erscheint zusaetzlich eine kurze Erfolgs- oder Fehlermeldung.
- Reports koennen als gestaltete A4-PDF mit boring-works-Farben heruntergeladen werden.
- Lange Reports erhalten automatische Folgeseiten und Seitenzahlen.

Status: umgesetzt.

## Oeffentlicher Launch vom 19. Juli 2026

- Live-URL: https://boring-bugshot.netlify.app/
- GitHub: https://github.com/CKViking/boring-bugshot
- Netlify ist mit `main` verbunden und deployt neue Pushes automatisch.
- Der erste Production-Deploy basiert auf Commit `ac4b4f9`.
- Startseite, Demo Lab, Responsive-Demo, Impressum und Datenschutz liefern oeffentlich HTTP 200.
- Ein echter Screenshot wurde auf der Netlify-Version erfolgreich mit GPT-5.6 analysiert.
- Automatic waehlt eine passende Perspektive; Structured Output, editierbare Felder und Tickettext funktionieren.
- Save-Feedback sowie PDF- und Markdown-Download wurden auf der oeffentlichen Version erfolgreich getestet.

Status: MVP oeffentlich und end-to-end funktionsfaehig.

## Finaler Einreichungsstand vom 20. Juli 2026

- Der Anfragebereich bietet neben dem primaeren Analyse-Button die zurueckhaltende Aktion `Clear form`.
- Der Reset entfernt Screenshot, Kontext, Seiten-URL und die anfragespezifische Report-Perspektive, behaelt aber die gemerkte Ausgabesprache sowie erzeugte und gespeicherte Reports.
- Nach einem erfolgreichen Aufruf benennt `Create report again` einen erneuten Aufruf mit unveraenderten Eingaben ausdruecklich.
- Impressum und Datenschutz stehen auf ihren bestehenden Seiten jeweils zuerst auf Deutsch und danach vollstaendig auf Englisch bereit.
- README, Pre-Launch-Checkliste und zentraler Lab-Stand bilden denselben aktuellen Funktions-, Datenschutz- und Deployment-Stand ab.

Status: Technische Einreichungsversion abgeschlossen; offen bleiben Demo-Video und finale Projektbeschreibung.
