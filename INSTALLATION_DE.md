# Installation und erster Test

## 1. Paket und Zielsystem

**Plugin:** EclipseAwningConfigurator 1.1.0  
**ShopBuilder-Name:** Eclipse Markisen-Konfigurator  
**Ziel:** plentyShop LTS mit IO; Startseite, Inhaltsseite und Artikelansicht  
**Geprüfte Quellreferenz:** plentyShop LTS 5.0.86 und IO 5.0.86

Der Produktname ist **plentyShop LTS**. Sein technischer Plugin-Name bleibt `Ceres`; dieser Schlüssel muss deshalb in `plugin.json` und in technischen Vorlagenverweisen stehen. Im Backend und bei der Installation nach **plentyShop LTS** suchen.

Das Paket enthält Plugin-Definition, PHP-Registrierung, ShopBuilder-Einstellungen, Twig, fertiges JavaScript, CSS, drei 3D-Modelle und die benötigten Texturen. Ein separates PWA-Projekt, Nuxt, SDK-Zugangsdaten oder ein neues Backend sind nicht nötig.

Die 299 Artikel-/Varianten-Zuordnungen stammen unverändert aus dem vorhandenen Eclipse-Modul. Sie funktionieren in einem anderen Plenty-System nur dann, wenn dort dieselben Artikel und IDs vorhanden sind. Auch im bestehenden System müssen die Varianten für den gewählten LTS-Mandanten sichtbar und bestellbar sein.

### Update auf Version 1.1.0

Version 1.1.0 ermöglicht den Konfigurator-Kauf auf Artikelseiten, schützt die Bestellung der vollständigen Parent-/Paketvariante und stellt Modelle und Texturen auf die dokumentierten Ressourcenordner um. Die mit 1.0.1 korrigierten Plugin-Abhängigkeiten bleiben bestehen:

```json
"require": {
  "Ceres": "~5.0.78",
  "IO": "~5.0.0"
}
```

1. Das neue ZIP entpacken und den Inhalt von `EclipseAwningConfigurator` in das vorhandene Plugin-Repository übernehmen. `plugin.json` bleibt direkt in dessen Wurzel.
2. Die Änderungen committen und in den in Plenty verwendeten Branch pushen.
3. In Plenty das bestehende Git-Plugin auf den neuen Stand aktualisieren. Prüfen, dass beim Plugin die Version **1.1.0** angezeigt wird.
4. Das Test-Plugin-Set erneut bereitstellen.
5. Im ShopBuilder das entsprechende Plugin-Set auswählen, die betroffenen Inhalte öffnen und speichern. Bei vorhandenen Artikelansichten die Inhalte neu generieren, damit neue Einstellungen übernommen werden.
6. Die Vorschau neu laden und im Browser kontrollieren, dass bei Modellanfragen jetzt `/documents/awning-configurator/models/` und bei Texturen `/images/awning-configurator/textures/` verwendet werden.

Das Paket vollständig übernehmen: Die neuen Ordner `resources/documents/awning-configurator` und `resources/images/awning-configurator` samt ihren Dateien müssen im Git-Commit enthalten sein. Ein reines JavaScript-Update reicht für die Modellpfad-Korrektur nicht aus.

Wird weiterhin die alte Anforderung `>=5.0.78 <6.0.0` angezeigt, verwendet Plenty noch einen alten Manifeststand. Dann den eingestellten Git-Branch und die Übernahme des neuen Commits prüfen. plentyShop LTS kann auf **5.0.86** bleiben. Bereitstellung und Widget-Sichtbarkeit wurden für 1.0.1 vom Nutzer bestätigt; der neue Stand 1.1.0 muss erneut im Zielsystem geprüft werden.

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

**plentyShop LTS** (technischer Name `Ceres`) und **IO** müssen im gleichen Set aktiv sein. Die Plugin-Abhängigkeiten sind in `plugin.json` eingetragen. Die Einbindung orientiert sich an den Standard-LTS-Vorlagen für zusätzliche IO-Ressourcen. Falls ein individuelles Theme diese Vorlagen entfernt hat, müssen sie dort wieder berücksichtigt werden.

## 4. Widget auf einer Inhaltsseite verwenden

1. Im ShopBuilder eine Startseite oder Kategorie vom Typ **Inhalt** mit dem vorgesehenen Plugin-Set öffnen.
2. Das Widget **Eclipse Markisen-Konfigurator** suchen. Es ist der Widget-Kategorie Artikel zugeordnet.
3. In eine möglichst breite Inhaltsfläche ziehen. Für die 3D-Ansicht eignet sich eine ganze Zeile.
4. Die Einstellungen prüfen:

| Einstellung | Wirkung |
| --- | --- |
| Überschrift | Text oberhalb des Widgets; leer blendet ihn aus |
| Startmodell | Vollkassette, Halbkassette oder Gelenkarm beim ersten Öffnen |
| Auf Artikelseiten mit der aktuellen Variante starten | Übernimmt eine im Katalog enthaltene geöffnete Artikelvariante; auf Inhaltsseiten gilt weiterhin das Startmodell |
| Modellwechsel zulassen | Alle drei Modelle wählbar oder das beim Öffnen gewählte Modell fest; auf Artikelseiten kann dies das übernommene Artikelmodell sein |
| Artikelbeschreibung anzeigen | Beschreibung der aktuell gewählten Variante als aufklappbarer Bereich |
| Technische Daten anzeigen | Technische Daten der aktuell gewählten Variante als aufklappbarer Bereich |
| Eigene CSS-Klasse | Zusätzliche Klassen am äußeren Widget |

5. Inhalt speichern und für die gewünschte Seite aktivieren.
6. Über die **Shop-Vorschau des Test-Plugin-Sets** öffnen.

Der ShopBuilder-Editor zeigt bewusst eine Vorschaukarte. Erst die Shop-Vorschau lädt das interaktive 3D-Modell und fragt echte Produktdaten ab. Das verhindert unbeabsichtigte Warenkorbaktionen beim Bearbeiten. Pro Inhalt ist ein Konfigurator vorgesehen.

### Widget auf einer Artikelseite einsetzen

1. Im selben ShopBuilder-Plugin-Set eine **Artikelansicht** für die betreffenden Markisen öffnen oder anlegen.
2. Das Widget aus der Gruppe **Artikel** in den Body-Bereich der Artikelansicht ziehen.
3. **Auf Artikelseiten mit der aktuellen Variante starten** aktiviert lassen. Der Konfigurator übernimmt Modell, Maß, Gehäuse, Tuch und gegebenenfalls Bedienung aus der geöffneten Variante, sofern sie zu den 299 hinterlegten Varianten gehört.
4. Im betreffenden Layout die bisherige Variantenwahl und den bisherigen Kaufblock durch den Konfigurator ersetzen, damit Kunden einen eindeutigen Auswahl- und Kaufbereich sehen. Andere Artikelwidgets werden vom Konfigurator nicht automatisch entfernt.
5. Die Artikelansicht speichern und gezielt für die gewünschten Markisen aktivieren. Anschließend eine reale Artikel-URL über die Vorschau öffnen.

Die Konfigurator-Auswahl wird nur beim Start aus der Artikelseite übernommen. Danach gelten Auswahl, Menge und Bestellmerkmale des Kaufbereichs im Konfigurator. Die Produkt-URL und weitere Produktwidgets der Seite werden beim Konfigurieren nicht umgeschrieben. Ein Wechsel zu einem anderen Modell oder Artikel bestellt die im Konfigurator sichtbare Variante.

Die enthaltenen Artikelzuordnungen verteilen sich auf Vollkassette **600000, 610000, 620001**, Halbkassette **640000, 650000, 670000, 680000** und Gelenkarm **6325, 6330**. Bei einem anderen Artikel oder einer nicht enthaltenen Variante verwendet das Widget das eingestellte Startmodell; deshalb die Artikelansicht gezielt zuordnen.

### 4.2. Parent-/Paketartikel im Warenkorb erhalten

Der Kaufbereich übergibt die **Paketvariante der aktuellen Konfiguration**, einschließlich Menge und Bestellmerkmalen. Er verwendet dafür weder eine ID aus `bundleComponents` noch pauschal die Hauptvariante des Artikels. Die Originalzuordnungen müssen im Zielsystem tatsächlich auf die passenden Paketvarianten zeigen.

Zusätzlich entscheidet die Mandanteneinstellung, ob IO das Paket anschließend durch seine Bestandteile ersetzt. Prüfe im LTS-Assistenten für das richtige Plugin-Set und den richtigen Mandanten **Webshop → Aufträge und Retouren → „Wie möchtest du Artikelpakete im Bestellvorgang anzeigen?“**. Die folgenden Texte und Werte entsprechen LTS 5.0.86:

| Auswahl im LTS-Assistenten | Interner Wert | Verwendung mit diesem Konfigurator |
| --- | --- | --- |
| **Nur Artikelpaket ohne dessen Bestandteile auflisten** | 1 | Empfohlen: Parent-/Paketvariante bleibt die Kaufposition |
| **Artikelpaket und dessen Bestandteile auflisten** | 2 | Ebenfalls geeignet: Parent bleibt erhalten, Bestandteile werden mit aufgelistet |
| **Nur Bestandteile des Artikelpakets auflisten** | 0 | Nicht geeignet: IO ersetzt den Parent durch Bestandteile; das Widget sperrt den Paketkauf |

Der direkte Backendweg lautet laut [offizieller LTS-Dokumentation](https://knowledge.plentyone.com/de-de/manual/archive/webshop/mandanten-verwalten.html) **Einrichtung → Mandant → [Mandant wählen] → Aufträge → Artikelpaket**. Dort heißen die entsprechenden Optionen **„Artikelpakete im Bestellvorgang nicht aufsplitten“** (1), **„Artikelpaket durch Basisartikel ergänzen“** (2) und **„Artikelpaket durch Basisartikel ersetzen“** (0). Nach dem Speichern die Shop-Vorschau neu laden, damit sie die aktuelle Einstellung erhält. Diese Einstellung gilt für die Artikelpakete des Mandanten.

Ist die Einstellung 0 oder nicht eindeutig verfügbar, zeigt das Widget **„Diese Markise kann derzeit nicht als vollständiges Paket bestellt werden.“** und stellt keinen Kaufbutton bereit. Derselbe Hinweis erscheint, wenn die gelieferte Variante `bundleType = bundle_item` hat, also selbst ein Paketbestandteil ist. In diesem Fall muss die konkrete Artikel-/Varianten-Zuordnung in `build-src/catalog.ts` korrigiert werden; eine Parent-ID wird nicht geraten. Die Browserkonsole nennt den Grund sowie die betroffene Artikel- und Varianten-ID.

Das Plugin prüft diese Bedingungen, verändert jedoch keine Mandanteneinstellung und legt keine Artikel oder Paketverknüpfungen an. Die Prüfung mit einem echten Paket im Zielshop bleibt erforderlich.

## 5. Erste Funktionsprüfung

Die folgenden Punkte sind vor einer Live-Zuordnung des Plugin-Sets mit den echten Daten zu prüfen:

1. **Alle drei Modelle:** Vollkassette, Halbkassette und Gelenkarm öffnen. Die erste Modell-Datei kann je nach Verbindung länger laden.
2. **Farben:** Bei Vollkassette Apfel auswählen; das Tuch muss grün sein. Kiesel und Sand sind eigene Optionen. Bei 5,6 × 3,5 m / Basaltgrau ist Sand nicht auswählbar.
3. **Halbkassette:** Zwischen Elektrisch und Standard wechseln. Standard bietet die Größen bis 3,95 m; eine größere elektrische Auswahl wird passend angepasst.
4. **Preis und Bestand:** Eine vorhandene und eine nicht bestellbare Variante prüfen. Preis und Verfügbarkeit müssen zu deren normaler LTS-Produktseite passen.
5. **Menge und Bestellmerkmale:** Mindestmenge, Intervall und gegebenenfalls Pflichtmerkmale prüfen. Eine fehlende erforderliche Angabe muss vom nativen LTS-Kaufbereich angezeigt werden.
6. **Paketvariante:** Die Einstellung aus Abschnitt 4.2 prüfen und ein reales Artikelpaket einmal hinzufügen. Im Warenkorb muss die zur Auswahl gehörende Parent-/Paketvariante mit korrekter Menge und Bestellmerkmalen erhalten bleiben. Komponenten dürfen sie nicht ersetzen. Bei mehreren Modellfamilien je ein Paket prüfen.
7. **Warenkorb:** Header-/Miniwarenkorb und anschließende Warenkorbseite prüfen. Varianten-ID, Bezeichnung und Preis müssen zum ausgewählten Parent-/Paketartikel passen; ein Komponentenpreis reicht als Bestätigung nicht aus.
8. **Mobil:** Auswahlfelder, Tuchliste, Mengenwahl und Kaufbutton auf einem schmalen Bildschirm prüfen. Zum Drehen mit Touch zunächst „3D steuern“ aktivieren; danach kann „3D beenden“ wieder das Scrollen freigeben.
9. **Artikeltexte:** Beschreibung und technische Daten für mindestens zwei verschiedene Artikel prüfen; es müssen die zur aktuellen Variante gehörenden Daten sein.
10. **Artikelansicht:** Eine direkt aufgerufene Katalogvariante muss im Konfigurator vorausgewählt sein. Einen Variantenwechsel samt Menge und Kauf testen; daneben vorhandene native Artikelwidgets dürfen nicht durch den Konfigurator überschrieben werden.

Die Zuordnung eines Plugin-Sets zum Live-Mandanten erfolgt erst nach dieser Prüfung. Das bereitgestellte Paket wurde hier nicht in eurem Plenty-Konto installiert.

## 6. Typische Fehler

| Anzeige / Verhalten | Nächster Prüfschritt |
| --- | --- |
| `required plugins version does not exist` mit alter Anforderung `>=5.0.78 <6.0.0` | Aktuelles Paket übernehmen; in `plugin.json` muss `"Ceres": "~5.0.78"` stehen. Git-Branch und aktualisierten Commit in Plenty prüfen |
| Widget erscheint nicht | Git-Branch, `plugin.json` in der Repository-Wurzel, aktives Plugin und erfolgreich bereitgestelltes Plugin-Set prüfen; ShopBuilder mit diesem Set neu öffnen |
| „Konfigurator wird geladen …“ bleibt stehen | Im Browser prüfen, ob `/js/awning-configurator.js` und die CSS-Datei erreichbar sind; individuelles Theme muss die zusätzlichen IO-Ressourcen ausgeben |
| 3D-Modell liefert HTTP 404 | Link zur Modelldatei im Fehlerhinweis öffnen; URL muss den aktuellen Ressourcenpfad und `/documents/awning-configurator/models/` enthalten. Die drei GLBs müssen vollständig im Git-Commit und Plugin-Deployment vorhanden sein |
| Modell-URL enthält noch `/assets/models/` | Im Browser wird noch JavaScript aus 1.0.x verwendet; aktiven Pluginstand und Browsercache prüfen |
| Anderer Ladefehler beim 3D-Modell | Modelldatei über den Fehlerlink öffnen und die konkrete URL/HTTP-Meldung notieren; auf CORS, vollständige Binärdatei und Git-LFS-Zeiger prüfen |
| WebGL2-Hinweis | Aktuellen Browser/Grafikbeschleunigung verwenden; die Variantenwahl und der Kaufbereich können unabhängig vom 3D-Renderer genutzt werden |
| Kein Verkaufspreis / keine Produktdaten | Artikel-/Varianten-ID, Mandantenzuordnung, Sichtbarkeit, Verkaufspreis und Lieferland/Kundenklasse im Plenty-System prüfen |
| „Diese Markise kann derzeit nicht als vollständiges Paket bestellt werden.“ | Abschnitt 4.2 prüfen: Paketeinstellung muss 1 oder 2 sein; bei `catalog-points-to-bundle-component` in der Browserkonsole die tatsächliche Parent-/Paketvarianten-ID für diese Auswahl hinterlegen |
| Abweichender Warenkorb auch auf normaler Produktseite | Zuerst das native LTS-/IO-Verhalten bzw. die Artikelpaket-Konfiguration prüfen; der Konfigurator verwendet dieselbe Kaufkette |
| Kauf nur über Produktseite möglich | Die Auswahl ist ein echtes Artikel-Set, oder die installierte LTS-Laufzeit stellt den für einen isolierten Kauf benötigten Artikelkontext nicht bereit; Fehlermeldung und LTS-Version prüfen |
| Texte fehlen | Beschreibung/technische Daten am zugehörigen Artikel und die beiden Widget-Schalter prüfen |

## 7. Anpassungen am Katalog

Der Katalog enthält nur Auswahlmöglichkeiten und Artikelzuordnungen. Preise und Bestände sind nicht fest in den Dateien hinterlegt. Eine Preisänderung in Plenty erfordert daher keinen neuen Plugin-Build.

Neue Größen, Tuchfarben oder Varianten dagegen müssen in `build-src/catalog.ts` ergänzt werden. Auch neue Texturen gehören dann in `resources/images/awning-configurator/textures/<modell>/`. Danach im Plugin-Verzeichnis mit Node.js 24 ausführen:

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
- [Mandanteneinstellung für Artikelpakete, LTS-Archiv](https://knowledge.plentyone.com/de-de/manual/archive/webshop/mandanten-verwalten.html)
