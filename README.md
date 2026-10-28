# Eclipse Markisen-Konfigurator für plentyShop LTS

**Version 1.0.1 · 28.10.2026 · Four & More GmbH**

Dieses Plugin überträgt das vorhandene Eclipse-PWA-Markisenmodul in ein eigenständiges ShopBuilder-Widget für plentyShop LTS. Grundlage sind **Step 8 FULL** und das kumulative Update **Step 16 – Bootstrap / Technische Daten** vom 16.10.2026. Die bisherigen Modelle, Texturen und Artikelzuordnungen sind enthalten.

## Funktionsumfang

- Vollkassetten-, Halbkassetten- und Gelenkarmmarkise mit originaler WebGL-3D-Darstellung.
- Auswahl von Größe, Gehäuse und Tuch; bei der Halbkassette zusätzlich Standard oder Elektrisch.
- Alle **299 originalen Varianten**: 211 Vollkassette, 80 Halbkassette, 8 Gelenkarm.
- **23 Tuchoptionen** über die drei Modellfamilien; die grüne Apfel-Textur und die Bezeichnung Kiesel sind aus Step 16 übernommen.
- Nur vorhandene Kombinationen sind auswählbar. Nach einem Wechsel abhängige Anpassungen werden sichtbar erklärt.
- Live-Produktdaten, Preis und Verfügbarkeit aus dem aktuellen LTS-Shopkontext.
- Originale LTS-Komponenten für Preis, Staffelpreise, Bestellmerkmale, Paketbestandteile, Verfügbarkeit, Menge und Warenkorb.
- Artikelbeschreibung und technische Daten der gewählten Variante optional als aufklappbare Bereiche. Vorhandene Bootstrap-Strukturklassen nutzen das LTS-Theme.
- Maus-, Touch- und Tastaturbedienung der 3D-Ansicht. Ohne WebGL2 bleibt die Produktkonfiguration bedienbar; die 3D-Ansicht zeigt einen Hinweis.

Das Widget heißt im ShopBuilder **„Eclipse Markisen-Konfigurator“**. Einstellbar sind Überschrift, Startmodell, Modellwechsel, Artikelbeschreibung, technische Daten und eine zusätzliche CSS-Klasse. Pro Inhalt ist eine Instanz vorgesehen. Der Editor zeigt eine statische Vorschau; der interaktive Konfigurator läuft in der Shop-Vorschau und im Frontend.

## Installation

Die ausführliche Anleitung steht in **INSTALLATION_DE.md**. Version 1.0.1 korrigiert die Plugin-Abhängigkeiten für den gemeldeten Buildfehler mit Ceres 5.0.86; Hinweise zum Aktualisieren von 1.0.0 stehen ebenfalls dort.

1. ZIP entpacken. Der Ordner `EclipseAwningConfigurator` ist das Plugin.
2. Dessen **Inhalt** in die Wurzel eines Git-Repositorys übernehmen. Dort muss `plugin.json` direkt liegen. Die Modelle und Texturen vollständig mit übertragen.
3. Das Repository in PlentyONE unter **Daten & Plugins → Git** hinzufügen.
4. Das Plugin in einer Kopie des LTS-Plugin-Sets installieren, aktivieren und das Set bereitstellen.
5. Das Widget auf einer ShopBuilder-**Inhaltsseite** oder der Startseite platzieren, speichern und den Inhalt aktivieren.
6. Die Shop-Vorschau öffnen und Auswahl, Preise, Pflichtmerkmale und Warenkorb mit den realen Artikeln prüfen.

Die ZIP ist die vollständige Quellcode-Übergabe. Die Installation erfolgt als Git-Plugin; ein direkter ZIP-Upload in ein ShopBuilder-HTML-Widget ist nicht der Installationsweg. JavaScript ist fertig gebaut enthalten. Im Shop ist kein npm-Build notwendig. CSS und JavaScript werden automatisch über IO eingebunden; manuelle Container-Verknüpfungen sind für die Standard-LTS-Einbindung nicht nötig.

## Versionen und Grenzen

**Produktname und technischer Name:** Das Shop-Plugin heißt **plentyShop LTS**. In seiner offiziellen `plugin.json` lautet der interne Wert `name` weiterhin `Ceres`, während `marketplaceName` auf `plentyShop LTS` gesetzt ist. Für Abhängigkeiten, PHP-Klassen und Twig-Vorlagen wird deshalb weiterhin der technische Name `Ceres` verwendet. Quelle: [offizielles plentyShop-LTS-Manifest](https://github.com/plentymarkets/plugin-ceres/blob/79cb9048a767e83ce24928cd25b82d583b1e4ebd/plugin.json).

Der Code wurde gegen die offiziellen Quellen von **Ceres 5.0.86** und **IO 5.0.86** geprüft. Die vom Nutzer gemeldete Ceres-Version ist ebenfalls 5.0.86; die installierte IO-Version ist noch unbekannt. Das Manifest verwendet das dokumentierte Plenty-Format `"Ceres": "~5.0.78"` (Ceres 5.0.x ab 5.0.78) und `"IO": "~5.0.0"`. Ceres 5.0.86 erfüllt die korrigierte Ceres-Anforderung. Die genaue Bedeutung der Tilde ist in der [offiziellen Plugin-Definition](https://developers.plentymarkets.com/en-gb/developers/main/plugin-definition.html) beschrieben. Die angegebenen Bereiche sind keine Bestätigung, dass jede frühere Version und jedes individuelle Theme getestet wurde.

Die erste Zielumgebung ist eine Start- oder Inhaltsseite mit einem Konfigurator. Auf einer Artikeldetailseite oder bei echtem Artikel-Set-Kontext führt der Kaufbereich zur Produktseite. Dadurch wird der globale Artikel-/Setzustand des bestehenden Shops nicht überschrieben. Normale Varianten und **Artikelpakete mit `bundleType = bundle`** verwenden direkt den nativen Warenkorb. Die Paketbestandteile werden nicht zusätzlich durch dieses Plugin bestellt.

Die Original-IDs müssen im Zielsystem existieren und für den jeweiligen LTS-Mandanten freigeschaltet sein. Es werden weder Artikel angelegt noch Freischaltungen oder Preise verändert. Neue Katalogvarianten erfordern eine Aktualisierung von `build-src/catalog.ts` und einen erneuten lokalen Build.

Die 3D-Dateien bleiben unverändert und sind relativ groß: rund 13,2 MiB für Vollkassette, 12,3 MiB für Halbkassette und 39,4 MiB für Gelenkarm. Ein Modell wird erst bei seiner Auswahl geladen. Langsame Verbindungen können deshalb beim ersten Aufruf eine längere Ladezeit zeigen.

## Prüfung

Die lokalen Katalog-, Commerce- und Viewer-Tests sind erfolgreich. Sie prüfen unter anderem alle 299 IDs und Zuordnungen, sämtliche 464 Optionspfade, ungültige Preise, erforderliche Produktdaten, native Storeinitialisierung, asynchrone Modell-/Texturwechsel und Ressourcenfreigabe. Die drei echten GLB-Dateien wurden mit ihren Original- und veränderten Abmessungen auf gültige Geometriedaten geprüft.

Zusätzlich wurde die native Preis-, Pflichtmerkmals-, Mengen- und Warenkorblogik aus der unveränderten Ceres-Distribution in einer isolierten Node-VM mit lokalen Antworten geprüft. Das ersetzt keinen echten Plenty-Plugin-Set-Build oder einen Live-Warenkorbtest. Die genaue Prüfgrenze steht in **TESTBERICHT.md**.

## Quellcode bauen

Nur bei Änderungen am TypeScript-Code ist ein neuer Build nötig. Node.js 24 wird benötigt; es gibt keine npm-Abhängigkeiten.

```bash
node build.mjs
node --check resources/js/awning-configurator.js
npm test
```

`build.mjs` erzeugt aus den vier bekannten lokalen Modulen eine klassische JavaScript-Datei. Es bündelt keine zweite Vue-Version. Der Kaufbereich verwendet die im LTS-Shop vorhandene Laufzeit.

## Aufbau

| Pfad | Aufgabe |
| --- | --- |
| `plugin.json` | Plugin-Identität und Abhängigkeiten |
| `src/Providers/AwningServiceProvider.php` | Widget-Registrierung und automatische Ressourcen-Einbindung |
| `src/Widgets/AwningConfiguratorWidget.php` | ShopBuilder-Einstellungen und Vorschau |
| `resources/views/` | Twig-Vorlagen |
| `resources/js/awning-configurator.js` | Fertiges Frontend |
| `resources/css/awning-configurator.css` | Auf das Widget begrenzte Gestaltung |
| `resources/assets/models/` | Drei Original-GLB-Modelle |
| `resources/assets/textures/` | Original-Texturen und Apfel-Korrektur |
| `build-src/catalog.ts` | Originaldaten und Kombinationen |
| `build-src/viewer.ts` | Frameworkunabhängige WebGL-Darstellung |
| `build-src/commerce.ts` | Live-Abfrage und native LTS-Kaufkomponenten |
| `build-src/app.ts` | Konfigurator-Bedienung und Inhaltsanzeige |
| `tests/` | Ausführbare lokale Prüfungen |

Quellstände und offizielle Referenzen: **SOURCE_NOTES.md**.
