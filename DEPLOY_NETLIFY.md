# boring Bugshot auf Netlify veroeffentlichen

Diese Anleitung ist fuer Einsteiger geschrieben. Arbeite sie von oben nach unten ab. Du musst nichts ueberspringen und keine Befehle erraten.

Am Ende hast du eine oeffentliche Internetadresse, die du externen Testern schicken kannst.

## Was du benoetigst

Du brauchst drei Konten:

1. **GitHub** speichert den Programmcode.
2. **Netlify** baut aus dem Code die oeffentliche Website.
3. **OpenAI Platform** analysiert die hochgeladenen Screenshots.

Netlify und GitHub koennen fuer diesen Test kostenlos verwendet werden. Die OpenAI API ist ein separater, kostenpflichtiger Dienst. Ein ChatGPT-Abo enthaelt nicht automatisch API-Guthaben.

## Teil 1: OpenAI API vorbereiten

### 1.1 API-Zahlung einrichten

1. Oeffne https://platform.openai.com/settings/organization/billing.
2. Melde dich mit deinem OpenAI-Konto an.
3. Richte eine Zahlungsmethode oder Prepaid-Guthaben ein.
4. Fuer erste Tests solltest du ein kleines Budget und, sofern in deinem Konto angeboten, ein monatliches Nutzungslimit setzen.

### 1.2 Geheimen API-Key erstellen

1. Oeffne https://platform.openai.com/api-keys.
2. Klicke auf **Create new secret key**.
3. Gib dem Key einen Namen wie `boring Bugshot Netlify`.
4. Kopiere den angezeigten Key sofort und bewahre ihn voruebergehend sicher auf.

Der Key beginnt normalerweise mit `sk-`. Er ist wie ein Passwort:

- nicht in einen Chat oder Screenshot kopieren,
- nicht in GitHub eintragen,
- nicht in eine normale Projektdatei schreiben,
- nicht an Tester weitergeben.

Du traegst ihn spaeter ausschliesslich in Netlify unter **Environment variables** ein.

## Teil 2: Projekt auf GitHub speichern

GitHub ist die Verbindung zwischen deinem lokalen Projektordner und Netlify.

### 2.1 Leeres Repository erstellen

1. Oeffne https://github.com/new.
2. Trage als Repository-Namen `boring-bugshot` ein.
3. Waehle fuer einen Hackathon je nach Wunsch **Public** oder **Private**. Netlify kann auch ein privates Repository verwenden, wenn du den Zugriff erlaubst.
4. Aktiviere auf dieser Seite **nicht** die Optionen fuer README, `.gitignore` oder License. Diese Dateien existieren bereits lokal.
5. Klicke auf **Create repository**.
6. Lasse die danach angezeigte GitHub-Seite offen. Du brauchst gleich die Repository-Adresse.

### 2.2 Lokalen Projektordner hochladen

Oeffne PowerShell direkt im Ordner:

`E:\OneDrive\Dokumente\CODEX\boring\boring Bugshot DEV`

Moeglichkeit unter Windows:

1. Oeffne den Ordner im Explorer.
2. Klicke oben in die Adresszeile.
3. Tippe `powershell` und druecke Enter.

Fuehre danach die folgenden Befehle einzeln aus. Warte nach jedem Befehl, bis wieder eine Eingabezeile erscheint.

```powershell
git init
git add .
git status
```

Kontrolliere die Ausgabe von `git status`:

- Dateien wie `app/page.tsx`, `package.json` und `netlify.toml` duerfen erscheinen.
- `.env.local` darf niemals erscheinen.
- `node_modules` und `.next` duerfen nicht erscheinen.

Danach:

```powershell
git commit -m "Build boring Bugshot MVP"
git branch -M main
```

Kopiere nun auf GitHub die HTTPS-Adresse deines neuen Repositorys. Sie sieht ungefaehr so aus:

`https://github.com/DEIN-BENUTZERNAME/boring-bugshot.git`

Setze deine echte Adresse in diesen Befehl ein:

```powershell
git remote add origin https://github.com/DEIN-BENUTZERNAME/boring-bugshot.git
git push -u origin main
```

GitHub kann dich dabei zur Anmeldung auffordern. Nach erfolgreichem Upload aktualisierst du die Repository-Seite im Browser. Dort sollten nun Ordner wie `app` und `lib` sichtbar sein.

## Teil 3: Netlify mit GitHub verbinden

1. Oeffne https://app.netlify.com.
2. Melde dich bei deinem vorhandenen Netlify-Konto an.
3. Klicke auf **Add new project**.
4. Waehle **Import an existing project**.
5. Waehle **GitHub** als Git-Anbieter.
6. Erlaube Netlify den Zugriff auf `boring-bugshot`. Falls das Repository nicht erscheint, musst du in der GitHub-Freigabe Netlify Zugriff auf dieses Repository geben.
7. Klicke auf das Repository `boring-bugshot`.

Netlify sollte Next.js automatisch erkennen. Kontrolliere diese Angaben:

```text
Branch to deploy: main
Build command: npm run build
Publish directory: .next
```

Die Datei `netlify.toml` im Projekt legt diese Werte ebenfalls fest. Du musst keinen Netlify-Adapter und kein Plugin manuell installieren.

Klicke noch nicht auf den finalen Deploy-Button, bevor die geheimen Variablen eingetragen sind.

## Teil 4: Geheimen OpenAI-Key in Netlify eintragen

Je nach Netlify-Oberflaeche findest du die Eingabe bereits auf der Import-Seite oder spaeter unter:

**Project configuration -> Environment variables**

Lege zwei Variablen an. Achte exakt auf Grossschreibung und Unterstriche.

### Variable 1

```text
Key: OPENAI_API_KEY
Value: dein zuvor kopierter OpenAI-Key
```

### Variable 2

```text
Key: OPENAI_MODEL
Value: gpt-5.6
```

Der Name darf nicht `NEXT_PUBLIC_OPENAI_API_KEY` lauten. `NEXT_PUBLIC_` wuerde ein Geheimnis fuer den Browser sichtbar machen.

Speichere die Variablen. Falls Netlify nach dem Geltungsbereich fragt, aktiviere mindestens **Production** und **Deploy previews**.

## Teil 5: Website veroeffentlichen

1. Klicke auf **Deploy** beziehungsweise **Deploy boring-bugshot**.
2. Netlify installiert die Pakete und fuehrt `npm run build` aus.
3. Warte, bis der Status **Published** oder **Production deploy is live** erscheint.
4. Netlify zeigt eine Adresse wie `https://zufaelliger-name.netlify.app` an.
5. Oeffne diese Adresse in einem neuen Browser-Tab.

Falls du einen besseren Namen moechtest:

1. Oeffne in Netlify **Project configuration** oder **Domain management**.
2. Suche nach **Project name** beziehungsweise **Change project name**.
3. Versuche zum Beispiel `boring-bugshot`.

Wenn der Name frei ist, lautet die Adresse anschliessend:

`https://boring-bugshot.netlify.app`

## Teil 6: Den ersten echten Test durchfuehren

1. Oeffne die Netlify-Adresse.
2. Lade einen Screenshot unter 4 MB hoch.
3. Schreibe optional einen kurzen Kontext, zum Beispiel: `Mobile checkout page at 390px width.`
4. Klicke auf **Create bug report**.
5. Warte auf den strukturierten Report.
6. Veraendere testweise einen Text.
7. Klicke auf **Save**.
8. Lade den Report testweise ueber **PDF** und **Markdown** herunter.
9. Lade die Seite neu und kontrolliere, ob der gespeicherte Report im Workspace steht.

Die gespeicherten Reports liegen aktuell nur im Browser des jeweiligen Testers. Andere Tester und andere Geraete sehen diese Reports nicht.

## Teil 7: Externe Tester einladen

Du kannst die `netlify.app`-Adresse verschicken. Erklaere Testern dabei:

- nur Test-Screenshots ohne vertrauliche Kunden- oder Personendaten hochladen,
- Bilder muessen kleiner als 4 MB sein,
- die App erzeugt derzeit einen Report fuer den wichtigsten sichtbaren Fehler,
- gespeicherte Reports bleiben nur in ihrem eigenen Browser.

Jeder Klick auf **Create bug report** verwendet deinen OpenAI-API-Key und verursacht API-Nutzung. Teile die Adresse zuerst nur mit wenigen bekannten Testern.

## Spaetere Aktualisierungen veroeffentlichen

Nachdem Netlify mit GitHub verbunden ist, musst du Netlify nicht erneut manuell konfigurieren. Fuer eine neue Version werden lokale Aenderungen so hochgeladen:

```powershell
git add .
git status
git commit -m "Describe the update"
git push
```

Nach `git push` baut Netlify automatisch eine neue Version. Den Status siehst du in Netlify unter **Deploys**.

## Wenn etwas nicht funktioniert

### Netlify-Build ist rot

1. Oeffne in Netlify **Deploys**.
2. Klicke auf den fehlgeschlagenen Deploy.
3. Oeffne das **Deploy log**.
4. Kopiere die letzten roten Fehlermeldungen und sende sie mir. Kopiere dabei niemals den API-Key.

### Meldung `OPENAI_API_KEY is not configured`

Der Key fehlt in Netlify oder wurde erst nach dem letzten Deploy hinzugefuegt:

1. Kontrolliere **Project configuration -> Environment variables**.
2. Pruefe die exakte Schreibweise `OPENAI_API_KEY`.
3. Starte unter **Deploys** einen neuen Deploy, zum Beispiel ueber **Trigger deploy -> Deploy site**.

### Analyse endet mit `Analysis failed`

Kontrolliere:

1. Ist OpenAI API-Guthaben vorhanden?
2. Ist der Key noch aktiv?
3. Ist das Bild kleiner als 4 MB?
4. Zeigt Netlify unter **Logs -> Functions** einen Fehler?

### Repository erscheint nicht in Netlify

Oeffne in GitHub die Einstellungen der installierten Netlify-App und erlaube ihr Zugriff auf `boring-bugshot`. Kehre danach zu Netlify zurueck und lade die Repository-Liste neu.

## Sicherheitsregeln

- API-Key nur in Netlify Environment Variables und lokal in `.env.local` speichern.
- `.env.local` niemals committen oder hochladen.
- Einen versehentlich veroeffentlichten Key sofort unter https://platform.openai.com/api-keys loeschen und ersetzen.
- Vor einer breiten oeffentlichen Freigabe Rate Limiting und Missbrauchsschutz ergaenzen.
