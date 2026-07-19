# boring Bugshot - reproduzierbare Demo-Beispiele

Stand: 17. Juli 2026

Zweck dieses Dokuments:

- reproduzierbare Screenshots fuer Produktseite, Pitch und Submission erstellen,
- ein kurzes Demo-Video aufnehmen,
- unterschiedliche Reporttypen und Ausgabesprachen zeigen,
- keine fremden Websites oder vertraulichen Kundendaten verwenden.

Alle Beispiele sollen spaeter als kontrollierte lokale Demo-Seiten gebaut werden. Jede Seite enthaelt absichtlich einen oder mehrere klar definierte Fehler.

## Empfohlene Reihenfolge

Die drei wichtigsten Demos:

1. Schwacher CTA - Design
2. Mobiler Overflow - Automatic / Technical
3. Newsletter-Formular ohne Labels - Accessibility

Diese Kombination zeigt Design-Feedback, technische Analyse und sichtbare Accessibility-Probleme.

---

## Demo 1: Schwacher CTA

### Ziel

Zeigen, wie Bugshot aus einem sichtbaren Hierarchieproblem konkretes Design-Feedback erstellt.

### Viewport

```text
Desktop: 1440 x 900 Pixel
```

### Aufbau der Beispielseite

- heller Hero-Hintergrund,
- kleine Navigation,
- grosse Produktueberschrift,
- zwei Absaetze Fliesstext,
- kleiner blasser Primaerbutton,
- zwei weitere Links mit aehnlicher visueller Staerke,
- wenig Abstand zwischen Fliesstext und Button,
- kein klar dominantes Seitenelement.

### Exakte Copy

```text
Eyebrow:
WORK BETTER

Headline:
Everything your team needs to move projects forward

Body:
Plan tasks, share ideas, and keep everyone aligned in one flexible workspace. Bring projects, documents, and conversations together without changing how your team works.

Primary CTA:
Learn more

Secondary links:
View features
Contact sales
```

### Absichtlich eingebaute Probleme

- `Learn more` ist unspezifisch.
- Der Primaerbutton ist klein und kontrastarm.
- Alle drei Handlungen wirken fast gleich wichtig.
- Zu wenig Abstand vor der CTA-Gruppe.
- Der eigentliche Conversion-Pfad ist nicht erkennbar.

### Bugshot-Einstellungen

```text
Report type: Design
Language: Deutsch
```

### Kontext fuer Bugshot

```text
The main goal of this page is to get visitors to start a free trial.
```

### Erwartete Kernaussagen

- primaerer CTA ist visuell nicht dominant,
- CTA-Text kommuniziert die Handlung nicht,
- konkurrierende Links schwaechen die Hierarchie,
- Kontrast, Groesse und Abstand sind zu gering,
- Empfehlung: ein klarer Primaerbutton `Start free trial` oder `Kostenlos testen`,
- sekundaere Handlungen visuell zuruecknehmen.

### Gewuenschtes Nachher-Bild

- ein kontrastreicher Primaerbutton,
- Text `Start free trial`,
- nur eine sekundaere Textaktion,
- mehr Weissraum oberhalb der CTA-Gruppe,
- klar sichtbare Conversion-Hierarchie.

---

## Demo 2: Responsiv abgeschnittener CTA

### Ziel

Zeigen, wie `Automatic` einen sichtbaren responsiven Fehler der sinnvollsten Perspektive zuordnet.

### Viewport

```text
Mobile: 390 x 844 Pixel
```

### Aufbau der Beispielseite

- mobile Produktdetailseite,
- Produktbild oben,
- Produktname und Preis,
- Variantenwahl,
- breiter Kaufbutton,
- Desktop-Navigation, die nicht korrekt umbricht.

### Exakte Copy

```text
Navigation:
Products  Collections  About us  Support

Product:
Everyday Work Bag

Price:
EUR 149.00

Variant label:
Choose color

Options:
Forest / Navy / Black

CTA:
Add to cart
```

### Absichtlich eingebaute Probleme

- Inhaltscontainer ist etwa 460 Pixel breit.
- Der Kaufbutton laeuft rechts aus dem 390-Pixel-Viewport.
- Ein Teil des Preises ist abgeschnitten.
- Horizontales Scrollen ist moeglich.
- Die Desktop-Navigation passt nicht in den Viewport.

### Bugshot-Einstellungen

```text
Report type: Automatic
Language: English
```

### Kontext fuer Bugshot

```text
Mobile product page at 390 pixels width. The purchase button should be fully usable.
```

### Erwartete Kernaussagen

- sichtbarer horizontaler Overflow,
- CTA nicht vollstaendig erreichbar,
- Kaufprozess fuer mobile Nutzer blockiert oder erschwert,
- wahrscheinlich primaere Perspektive `technical` oder `ux`,
- responsive Breiten, Padding und Navigation pruefen,
- Akzeptanzkriterium fuer kleine Viewports formulieren.

### Akzeptanzkriterien fuer das Demo-Ticket

- bei 320 bis 430 Pixel Breite kein horizontaler Overflow,
- Produktname, Preis und CTA vollstaendig sichtbar,
- Kaufbutton innerhalb des Viewports,
- Navigation verwendet eine mobile Darstellung.

---

## Demo 3: Newsletter-Formular ohne Labels

### Ziel

Sichtbares Accessibility- und Verstaendlichkeitsproblem demonstrieren.

### Viewport

```text
Desktop: 1200 x 800 Pixel
```

### Aufbau der Beispielseite

- Newsletter-Karte in der Seitenmitte,
- kurze Ueberschrift,
- zwei Eingabefelder,
- keine sichtbaren Labels,
- nur Placeholder,
- kontrastarmer Button,
- keine Information zu Inhalt oder Frequenz.

### Exakte Copy

```text
Headline:
Stay in the loop

Body:
Get our latest updates.

First placeholder:
Name

Second placeholder:
Email

CTA:
Submit
```

### Absichtlich eingebaute Probleme

- keine dauerhaften sichtbaren Feldbeschriftungen,
- Placeholder verschwinden bei Eingabe,
- schwacher Farbkontrast,
- `Submit` beschreibt den Zweck nicht,
- kein Hinweis auf Inhalt oder Versandfrequenz,
- keine sichtbare Datenschutzinformation.

### Bugshot-Einstellungen

```text
Report type: Accessibility
Language: Deutsch
```

### Kontext fuer Bugshot

```text
Visitors should understand what they are signing up for and submit the form confidently.
```

### Erwartete Kernaussagen

- sichtbare Labels ergaenzen,
- ausreichenden Kontrast herstellen,
- konkreten Buttontext verwenden,
- Newsletter-Inhalt und Frequenz erklaeren,
- keine vollstaendige WCAG-Pruefung aus einem Screenshot behaupten.

### Gewuenschtes Nachher-Bild

- Labels `Name` und `Email address`,
- Button `Get product updates`,
- Erklaerung `One practical product update per month. Unsubscribe anytime.`,
- deutlich lesbare Farben,
- kurzer Datenschutzhinweis.

---

## Demo 4: Verwirrende Preistabelle

### Ziel

Zeigen, wie Bugshot Entscheidungsreibung und Informationshierarchie beschreibt.

### Viewport

```text
Desktop: 1440 x 900 Pixel
```

### Aufbau

- drei gleich grosse Preiskarten,
- alle Karten gleiche Farbe und gleiche visuelle Staerke,
- mittlerer Tarif soll eigentlich empfohlen sein,
- unterschiedliche CTA-Texte,
- inkonsistente Reihenfolge der Features,
- Zeitraum nur bei einem Preis sichtbar.

### Tarife und Copy

```text
Starter
EUR 9 / month
Button: Choose

Studio
EUR 24
Button: Start now

Agency
EUR 59
Button: Contact us
```

Badge auf Studio:

```text
Recommended
```

Das Badge soll absichtlich klein und kontrastarm sein.

### Bugshot-Einstellungen

```text
Report type: UX
Language: English
```

### Kontext

```text
The middle plan is the recommended option for small agencies.
```

### Erwartete Kernaussagen

- empfohlener Tarif wird nicht ausreichend hervorgehoben,
- Preise sind wegen fehlender Zeitraeume schwer vergleichbar,
- CTA-Texte sind inkonsistent,
- Feature-Reihenfolge verhindert schnelles Scannen,
- Entscheidung wird unnoetig erschwert.

---

## Demo 5: Cookie-Banner verdeckt den CTA

### Ziel

UX-Problem auf einer mobilen Seite und niederlaendische Ausgabe zeigen.

### Viewport

```text
Mobile: 390 x 844 Pixel
```

### Aufbau

- mobile Landingpage,
- CTA im unteren sichtbaren Bereich,
- Cookie-Banner nimmt etwa 45 Prozent der Hoehe ein,
- CTA der Seite wird verdeckt,
- `Accept all` ist dominant,
- alternative Consent-Option sehr klein und kontrastarm.

### Cookie-Copy

```text
We use cookies to improve your experience and measure site usage.

Primary:
Accept all

Secondary:
Manage settings
```

### Bugshot-Einstellungen

```text
Report type: UX
Language: Nederlands
```

### Kontext

```text
The visitor should still be able to understand the page and make a clear consent choice.
```

### Erwartete Kernaussagen

- Banner verdeckt zentrale Seitenhandlung,
- Consent-Optionen sind visuell unausgewogen,
- Inhalt der Seite ist kaum noch erfassbar,
- Bannerhoehe reduzieren,
- gleichwertig verstaendliche Auswahl anbieten.

---

## Demo 6: Ueberladene Hero-Sektion

### Ziel

Spanische Ausgabe und Design-Feedback zu Copy, Hierarchie und Fokus zeigen.

### Viewport

```text
Desktop: 1440 x 900 Pixel
```

### Aufbau

- sehr lange Headline ueber vier bis fuenf Zeilen,
- drei Absaetze Beschreibung,
- zwei gleich starke Buttons,
- Produktbild erst unterhalb des sichtbaren Bereichs,
- wichtigster Produktnutzen im letzten Absatz.

### Copy

```text
Headline:
The complete flexible platform that helps modern teams organize every part of their work in one central place

Buttons:
Explore the platform
Book a conversation
```

### Bugshot-Einstellungen

```text
Report type: Design
Language: Espanol
```

### Kontext

```text
This landing page should explain the product and lead visitors to the demo.
```

### Erwartete Kernaussagen

- Nutzenversprechen ist zu lang und schwer scanbar,
- visuelle Hierarchie fehlt,
- Handlungen konkurrieren,
- Produktbild und konkreter Nutzen erscheinen zu spaet,
- Headline kuerzen und einen Primaer-CTA definieren.

---

## Demo 7: Fehlermeldung ohne Hilfe

### Ziel

Zeigen, wie aus einer technischen Meldung ein nutzerorientiertes Ticket entsteht.

### Viewport

```text
Desktop: 1200 x 850 Pixel
```

### Aufbau

- Checkout-Formular mit Adressfeldern,
- roter Fehlerblock oben,
- kein Feld ist markiert,
- eingegebene Werte bleiben sichtbar,
- Fokus oder Ursache nicht erkennbar.

### Exakte Fehlermeldung

```text
Error 422. Invalid input.
```

### Bugshot-Einstellungen

```text
Report type: UX
Language: Deutsch
```

### Kontext

```text
The user tried to complete checkout after entering their address.
```

### Erwartete Kernaussagen

- betroffene Eingabe ist nicht identifizierbar,
- Fehlermeldung bietet keine Loesung,
- Nutzer kann den Checkout nicht gezielt fortsetzen,
- fehlerhaftes Feld markieren,
- konkrete Korrekturanweisung anzeigen,
- Fokus zum Feld bewegen,
- Eingaben erhalten.

---

## Video-Storyboard, etwa 55 Sekunden

### Szene 1 - Problem, 0 bis 8 Sekunden

Bild:

- Demo 1 mit schwachem CTA.

Sprechertext:

```text
You can see when something is wrong. Turning it into a useful ticket is the annoying part.
```

### Szene 2 - Eingabe, 8 bis 18 Sekunden

Aktionen:

1. Screenshot mit `Ctrl+V` einfuegen.
2. Report type `Design` waehlen.
3. Sprache `Deutsch` waehlen.
4. vorbereiteten Kontext einfuegen.

Sprechertext:

```text
Paste the screenshot, choose the perspective, and add context only if it helps.
```

### Szene 3 - Analyse, 18 bis 32 Sekunden

Aktionen:

1. `Create bug report` anklicken.
2. Ladezustand kurz sichtbar lassen.
3. Zum strukturierten Report scrollen.

Sprechertext:

```text
Bugshot uses vision input and structured output to create a clear, editable report.
```

### Szene 4 - Ergebnis, 32 bis 45 Sekunden

Nacheinander zeigen:

- Title,
- Report type,
- Priority,
- Problem,
- Impact,
- Suggested fix,
- Ticket text.

### Szene 5 - Weiterverwendung, 45 bis 52 Sekunden

Aktionen:

1. einen Satz bearbeiten,
2. `Save` anklicken,
3. Markdown herunterladen.

Sprechertext:

```text
Review it, edit it, save it, and hand it off.
```

### Schluss, 52 bis 55 Sekunden

Bild:

- boring Bugshot Hero oder Logo.

Sprechertext beziehungsweise Einblendung:

```text
One screenshot in. One useful report out. No drama.
```

---

## Umgesetzte lokale Demo-Suite

Stand: 18. Juli 2026

Die Uebersicht ist ueber den dezenten Footer-Link `Demo lab` oder direkt unter dieser Route erreichbar:

```text
/demo
```

Die vier ausgewaehlten Beispiele sind:

```text
/demo/weak-cta
/demo/mobile-overflow
/demo/unlabelled-form
/demo/checkout-error
```

Umsetzungsregeln:

- Alle sichtbaren Inhalte und alle vorgeschlagenen Bugshot-Einstellungen sind Englisch.
- Jedes Beispiel verwendet eine eigene, bewusst farbenfrohe Fake-Marke und folgt nicht dem ruhigen boring-works-CI.
- Jede Detailroute zeigt ausschliesslich den absichtlich fehlerhaften Zustand und ist direkt screenshotbar.
- Die Uebersicht enthaelt Reporttyp, empfohlene Viewport-Groesse und den kopierbaren Kontext.
- Es werden keine externen Bilder, Fonts, Tracker oder APIs geladen.
- Illustrationen und Produktmotive sind vollstaendig mit HTML und CSS gebaut.
- Der mobile Overflow wird bei `390 x 844` Pixeln getestet; die anderen Beispiele sind fuer Desktop ausgelegt.

Moegliche spaetere Erweiterung:

- ein Umschalter `Show improved version` fuer Vorher-/Nachher-Vergleiche.
