# Installation und erster Test

## 1. Paket und Zielsystem

**Plugin:** EclipseAwningConfigurator 1.0.0  
**ShopBuilder-Name:** Eclipse Markisen-Konfigurator  
**Ziel:** plentyShop LTS / Ceres mit IO, Startseite oder Kategorie vom Typ Inhalt  
**Geprüfte Quellreferenz:** Ceres 5.0.86 und IO 5.0.86

Das Paket enthält Plugin-Definition, PHP-Registrierung, ShopBuilder-Einstellungen, Twig, fertiges JavaScript, CSS, drei 3D-Modelle und die benötigten Texturen. Ein separates PWA-Projekt, Nuxt, SDK-Zugangsdaten oder ein neues Backend sind nicht nötig.

Die 299 Artikel-/Varianten-Zuordnungen stammen unverändert aus dem vorhandenen Eclipse-Modul. Sie funktionieren in einem anderen Plenty-System nur dann, wenn dort dieselben Artikel und IDs vorhanden sind. Auch im bestehenden System müssen die Varianten für den gewählten LTS-Mandanten sichtbar und bestellbar sein.

## 2. Git-Repository vorbereiten

1. ZIP auf dem Rechner entpacken.
2. Den enthaltenen Ordner **EclipseAwningConfigurator** öffnen.
3. Den gesamten Inhalt dieses Ordners in ein neues Repository übernehmen. Beim Öffnen des Repositorys muss `plugin.json` sofort sichtbar sein, neben `src`, `resources` und der Anleitung.
4. Die Dateien mit Git beziehungsweise GitHub Desktop hochladen. Auch die großen `.glb`-Dateien müssen als echte Dateien im Repository liegen. Die unveränderten Modelle können regulär mit Git verwaltet werden; Platzhalterdateien statt Modelldaten reichen nicht aus.
5. Den Namen des Branches merken, beispielsweise `main`.

Die Unterordnerstruktur innerhalb von `resources` darf nicht verändert werden. Ein Repository, in dem erst noch ein zusätzlicher Ordner `EclipseAwningConfigurator` geöffnet werden muss, hat für diesen Installationsweg die falsche Wurzel.

Das gebaute JavaScript ist bereits enthalten. Vor dem Hochladen ist kein `npm install` und kein `npm run build` nötig.

## 3. Plugin in PlentyONE hinzufügen

1. **Daten & Plugins → Git** öffnen.
2. **Neues Repository hinzufügen** wählen.
3. Repository-URL, Branch und den für das Repository benötigten Zugang in PlentyONE eintragen. Zugangsdaten gehören in PlentyONE, nicht in die Plugin-Dateien.
4. Verbindung speichern und prüfen lassen.
5. In **Daten & Plugins → Plugin-Set-Übersicht** eine Kopie des bestehenden LTS-Plugin-Sets öffnen.
6. Über **Plugin hinzufügen** das Plugin **EclipseAwningConfigurator** installieren.
7. Plugin aktivieren und das Plugin-Set bereitstellen.

`Ceres` und `IO` müssen im gleichen Set aktiv sein. Die Plugin-Abhängigkeiten sind in `plugin.json` eingetragen. Die Einbindung orientiert sich an den Standard-LTS-Vorlagen für zusätzliche IO-Ressourcen. Falls ein individuelles Theme diese Vorlagen entfernt hat, müssen sie dort wieder berücksichtigt werden.

## 4. Widget auf einer Inhaltsseite verwenden

1. Im ShopBuilder eine Startseite oder Kategorie vom Typ **Inhalt** mit dem vorgesehenen Plugin-Set öffnen.
2. Das Widget **Eclipse Markisen-Konfigurator** suchen. Es ist der Widget-Kategorie Artikel zugeordnet.
3. In eine möglichst breite Inhaltsfläche ziehen. Für die 3D-Ansicht eignet sich eine ganze Zeile.
4. Die Einstellungen prüfen:

| Einstellung | Wirkung |
| --- | --- |
| Überschrift | Text oberhalb des Widgets; leer blendet ihn aus |
| Startmodell | Vollkassette, Halbkassette oder Gelenkarm beim ersten Öffnen |
| Modellwechsel zulassen | Alle drei Modelle wählbar oder das Startmodell fest vorgegeben |
| Artikelbeschreibung anzeigen | Beschreibung der aktuell gewählten Variante als aufklappbarer Bereich |
| Technische Daten anzeigen | Technische Daten der aktuell gewählten Variante als aufklappbarer Bereich |
| Eigene CSS-Klasse | Zusätzliche Klassen am äußeren Widget |

5. Inhalt speichern und für die gewünschte Seite aktivieren.
6. Über die **Shop-Vorschau des Test-Plugin-Sets** öffnen.

Der ShopBuilder-Editor zeigt bewusst eine Vorschaukarte. Erst die Shop-Vorschau lädt das interaktive 3D-Modell und fragt echte Produktdaten ab. Das verhindert unbeabsichtigte Warenkorbaktionen beim Bearbeiten. Pro Inhalt ist ein Konfigurator vorgesehen.

## 5. Erste Funktionsprüfung

Die folgenden Punkte sind vor einer Live-Zuordnung des Plugin-Sets mit den echten Daten zu prüfen:

1. **Alle drei Modelle:** Vollkassette, Halbkassette und Gelenkarm öffnen. Die erste Modell-Datei kann je nach Verbindung länger laden.
2. **Farben:** Bei Vollkassette Apfel auswählen; das Tuch muss grün sein. Kiesel und Sand sind eigene Optionen. Bei 5,6 × 3,5 m / Basaltgrau ist Sand nicht auswählbar.
3. **Halbkassette:** Zwischen Elektrisch und Standard wechseln. Standard bietet die Größen bis 3,95 m; eine größere elektrische Auswahl wird passend angepasst.
4. **Preis und Bestand:** Eine vorhandene und eine nicht bestellbare Variante prüfen. Preis und Verfügbarkeit müssen zu deren normaler LTS-Produktseite passen.
5. **Menge und Bestellmerkmale:** Mindestmenge, Intervall und gegebenenfalls Pflichtmerkmale prüfen. Eine fehlende erforderliche Angabe muss vom nativen LTS-Kaufbereich angezeigt werden.
6. **Paketvariante:** Ein reales Artikelpaket einmal hinzufügen. Menge, Warenkorb und Paketbestandteile mit dem Verhalten der normalen LTS-Produktseite vergleichen. Das Plugin sendet nicht zusätzlich die Einzelbestandteile.
7. **Warenkorb:** Header-/Miniwarenkorb und anschließende Warenkorbseite prüfen. Es muss die ausgewählte Varianten-ID enthalten sein.
8. **Mobil:** Auswahlfelder, Tuchliste, Mengenwahl und Kaufbutton auf einem schmalen Bildschirm prüfen. Zum Drehen mit Touch zunächst „3D steuern“ aktivieren; danach kann „3D beenden“ wieder das Scrollen freigeben.
9. **Artikeltexte:** Beschreibung und technische Daten für mindestens zwei verschiedene Artikel prüfen; es müssen die zur aktuellen Variante gehörenden Daten sein.

Die Zuordnung eines Plugin-Sets zum Live-Mandanten erfolgt erst nach dieser Prüfung. Das bereitgestellte Paket wurde hier nicht in eurem Plenty-Konto installiert.

## 6. Typische Fehler

| Anzeige / Verhalten | Nächster Prüfschritt |
| --- | --- |
| Widget erscheint nicht | Git-Branch, `plugin.json` in der Repository-Wurzel, aktives Plugin und erfolgreich bereitgestelltes Plugin-Set prüfen; ShopBuilder mit diesem Set neu öffnen |
| „Konfigurator wird geladen …“ bleibt stehen | Im Browser prüfen, ob `/js/awning-configurator.js` und die CSS-Datei erreichbar sind; individuelles Theme muss die zusätzlichen IO-Ressourcen ausgeben |
| 3D-Modell lädt nicht | `.glb`-Dateien im Repository und Plugin-Assets prüfen; echte Binärdateien statt Git-LFS-Zeiger; Browser-Konsole auf CORS-/HTTP-Fehler prüfen |
| WebGL2-Hinweis | Aktuellen Browser/Grafikbeschleunigung verwenden; die Variantenwahl und der Kaufbereich können unabhängig vom 3D-Renderer genutzt werden |
| Kein Verkaufspreis / keine Produktdaten | Artikel-/Varianten-ID, Mandantenzuordnung, Sichtbarkeit, Verkaufspreis und Lieferland/Kundenklasse im Plenty-System prüfen |
| Abweichender Warenkorb auch auf normaler Produktseite | Zuerst das native LTS-/IO-Verhalten bzw. die Artikelpaket-Konfiguration prüfen; der Konfigurator verwendet dieselbe Kaufkette |
| Kauf nur über Produktseite möglich | Das Widget läuft auf einer Artikeldetailseite oder die Variante ist ein echtes Artikel-Set; diese Kontexte verwenden den gezielten Rückweg zur Produktseite |
| Texte fehlen | Beschreibung/technische Daten am zugehörigen Artikel und die beiden Widget-Schalter prüfen |

## 7. Anpassungen am Katalog

Der Katalog enthält nur Auswahlmöglichkeiten und Artikelzuordnungen. Preise und Bestände sind nicht fest in den Dateien hinterlegt. Eine Preisänderung in Plenty erfordert daher keinen neuen Plugin-Build.

Neue Größen, Tuchfarben oder Varianten dagegen müssen in `build-src/catalog.ts` ergänzt werden. Auch neue Texturen gehören dann in `resources/assets/textures/<modell>/`. Danach im Plugin-Verzeichnis mit Node.js 24 ausführen:

```bash
npm run build
npm test
```

Bei einer neuen Veröffentlichung Versionsnummer und Asset-Versionsparameter erhöhen, committen, das Git-Plugin in Plenty aktualisieren und das Test-Plugin-Set erneut bereitstellen.

## 8. Technische Abgrenzung

Der Kaufbereich verwendet die installierten LTS-Komponenten und deren Shop-Konfiguration. Native LTS-Komponenten verarbeiten auch Mengenregeln, Pflichtmerkmale und Paketvarianten. Zusätzliche Erweiterungen eines individuellen Themes, die ausschließlich in spezielle Produktseiten-Container injiziert werden, werden durch dieses Widget nicht automatisch kopiert.

Das Plugin lädt keine zweite Vue-Version, keine externe 3D-Bibliothek und keine externen Analyse- oder Trackingdienste. Es führt Live-Produktabfragen innerhalb des aktuellen Shops aus. Beschreibungstexte behalten ihre üblichen Struktur- und Bootstrap-Klassen; eingebettete Skripte, Frames, Formulare und Ereignisattribute werden nicht ausgeführt.

Die Bedienoberfläche des Konfigurators ist wie die Vorlage deutsch. Der native Kaufbereich verwendet die Übersetzungen des LTS-Shops; für die ShopBuilder-Einstellungsnamen sind Deutsch und Englisch enthalten.

Offizielle Grundlagen:

- [Git-Plugins hinzufügen](https://knowledge.plentyone.com/de-de/manual/main/plugins/plugins-system-hinzufuegen.html)
- [Plugins installieren, bereitstellen und zuordnen](https://knowledge.plentyone.com/de-de/manual/main/plugins/hinzugefuegte-plugins-installieren.html)
- [ShopBuilder-Widgets entwickeln](https://developers.plentymarkets.com/en-gb/developers/main/shopbuilder-plugins/shopbuilder-widgets.html)
