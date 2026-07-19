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

Status: umgesetzt und vor dem Deployment erneut zu testen.

## Export und Speicher-Feedback vom 17. Juli 2026

- Nach dem Speichern bestaetigt der Save-Button den Vorgang sichtbar mit `Saved ✓`.
- Direkt am Report erscheint zusaetzlich eine kurze Erfolgs- oder Fehlermeldung.
- Reports koennen als gestaltete A4-PDF mit boring-works-Farben heruntergeladen werden.
- Lange Reports erhalten automatische Folgeseiten und Seitenzahlen.

Status: umgesetzt.
