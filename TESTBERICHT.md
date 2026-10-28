# Prüfbericht – Version 1.1.0

Datum: 28.10.2026.

## Rückmeldungen aus dem Zielsystem

Der Nutzer hat die erfolgreiche Bereitstellung von **1.0.1** und anschließend die Sichtbarkeit des Widgets im ShopBuilder bestätigt. Danach wurden HTTP-404-Fehler beim Laden der Modelle gemeldet und die Unterstützung von Artikelseiten angefordert. Zusätzlich wurde ausdrücklich verlangt, die gewählte Parent-/Paketvariante zu bestellen. Die genaue fehlgeschlagene Modell-URL wurde nicht übermittelt.

Version 1.1.0 verwendet weiterhin die bestätigten Tilde-Anforderungen `~5.0.78` für Ceres und `~5.0.0` für IO. Der Produktname lautet plentyShop LTS; `Ceres` ist die interne Plugin-Kennung.

## Neue Prüfbereiche in 1.1.0

- Modelle und Texturen liegen in den dokumentierten Ressourcenordnern `documents` und `images`; die Binärdaten sind gegenüber 1.0.1 unverändert.
- Die Basis-URL aus dem aktuell geladenen Plugin-Skript hat Vorrang vor alten, in ShopBuilder-Inhalten gespeicherten URLs. Query-Parameter und relative Skript-URLs werden korrekt behandelt.
- Alle 299 ursprünglichen Varianten lassen sich anhand beider IDs in eine exakt passende Startauswahl einer Artikelseite zurückübersetzen. Nicht passende IDs übernehmen keine fremde Variante.
- Auf die anfänglich noch fehlende native Artikelseiten-Initialisierung wird begrenzt gewartet.
- Der native Kaufbereich auf Artikelseiten erhält einen eigenen Artikelzustand; Warenkorb und normale LTS-Kaufkette werden weiterverwendet.
- Paketkauf bei `App.bundleSetting` 1 und 2 übergibt genau die gewählte Parentvariante. Wert 0, unbekannte Einstellung und `bundle_item` verhindern den Kauf im Widget.
- HTTP-Fehler beim Modellabruf werden mit Status und betroffener URL diagnostizierbar gemacht.

## Zusammenfassung

Die ausgelieferten JavaScript-Module sind gebaut und syntaktisch geprüft. Alle vier lokalen Testdateien für Katalog, Commerce, Artikelkontext und Viewer bestehen. Zusätzlich besteht die tatsächliche Commerce-Anbindung 28 benannte Prüfungen mit der originalen Vue-2-/Vuex-/Komponentenlogik aus Ceres 5.0.86 und lokalen Backend-Antworten.

**Für 1.1.0 nicht durchgeführt:** ein Plenty-Plugin-Set-Build, ein PHP-/Twig-Lauf in Plenty, ein Test mit den echten Shopdaten sowie ein visueller Test in einem vollständigen Browser. Insbesondere wurde keine Modell-URL des Zielshops mit HTTP 200 verifiziert. Das Paket ist lokal geprüft und muss im tatsächlichen LTS-Test-Plugin-Set bestätigt werden.

## 1. Katalog und Originaltreue – erfolgreich

Ausführbare Datei: `tests/catalog.test.mjs`.

- 299 eindeutige Varianten-IDs, verteilt auf 211 Vollkassetten-, 80 Halbkassetten- und 8 Gelenkarmvarianten.
- SHA-256-Fingerprints der drei kanonischen Datentabellen stimmen mit den Originaltabellen überein. Artikel-IDs, Varianten-IDs, Variantennummern, Namen und Maße sind erhalten.
- Jede der 299 Originalkombinationen löst wieder exakt ihren Quelldatensatz auf.
- Alle 464 durch die Optionslisten beschriebenen Auswahlpfade normalisieren auf eine tatsächlich vorhandene Variante.
- Sand bleibt bei 5,6 × 3,5 m / Basaltgrau ausgeschlossen.
- Halbkassette Standard schließt die elektrischen Größen 4,5 und 5 m aus; Rückfall auf die nächstliegende vorhandene Größe entspricht der Vorlage.
- Die 23 Tuchoptionen, die grüne Apfel-Datei und der sichtbare Name Kiesel sind erhalten.
- Die drei Standardauswahlen lösen auf Varianten 13556, 14363 und 12456 auf.

## 2. Ressourcen- und Artikelkontext – erfolgreich

Ausführbare Datei: `tests/context.test.mjs`, sechs Fälle.

- Die URL des aktuellen Skripts hat Vorrang vor gespeicherten alten Ressourcen-URLs; relative URLs, Query-Parameter und Fragmente werden berücksichtigt.
- Explizite Ressourcenbasis und alter `/assets`-Fallback werden nur mit HTTP-/HTTPS-URLs verwendet.
- Alle 299 Katalogvarianten werden anhand von Artikel- und Varianten-ID korrekt in die Anfangsauswahl zurückübersetzt; nur eine passende ID reicht nicht aus.
- Die verzögerte native Artikelseiten-Initialisierung wird erkannt; auf normalen Inhaltsseiten ist kein Artikelkontext erforderlich.

## 3. Commerce-Datengrenzen – erfolgreich

Ausführbare Datei: `tests/commerce.test.mjs`, 15 Fälle.

- Äußere IO-Response-Hülle und direkter Datensatz werden unterstützt.
- Artikel-ID und Varianten-ID müssen zur Auswahl passen.
- Der Verkaufsstatus muss vom Backend ausdrücklich als Boolean geliefert werden; nicht bestellbar bleibt nicht bestellbar.
- Vorhandene Preis-, Pflichtmerkmals- und Bundle-Daten werden erhalten.
- Fehlende notwendige Bestellmerkmale werden abgefangen.
- Unvollständige Preisstrukturen, negative Werte, Booleans, Leerzeichen und nicht endliche Zahlen werden abgelehnt; ein echter Nullpreis bleibt zulässig.
- Neue native Artikelmodule werden einmal registriert; vorhandene werden gezielt aktualisiert. Hauptartikel-ID und globaler Setzustand werden dabei nicht verändert.
- Paketvarianten sind nur bei `bundleSetting` 1 oder 2 (Zahl oder entsprechende Zeichenfolge) freigegeben; 0, unbekannte Werte und Komponentenvarianten werden gesperrt.
- Der separate Artikelseiten-Store besitzt frischen Artikelzustand und leitet nur benötigte native Warenkorb-/Komponentenaktionen weiter. Nicht unterstützte Laufzeitstrukturen werden abgefangen.

## 4. WebGL-Lifecycle und echte Modelldaten – erfolgreich

Ausführbare Datei: `tests/viewer-lifecycle.mjs`.

- Veraltete Modell-/Texturantworten werden verworfen.
- Laufende Abfragen werden bei Wechsel oder Entfernen abgebrochen.
- Listener, ResizeObserver, RAF, Buffer, Vertex-Arrays, Texturen und Shader-Programm werden freigegeben.
- Normales Scrollen wird nicht unbeabsichtigt als Zoom verwendet; explizite 3D-Bedienung bzw. Strg-/Cmd-Mausrad steuern den Viewer.
- Fehlendes WebGL2 und ungültige GLB-Daten erzeugen einen sichtbaren Fehlerzustand.
- Die neuen absoluten und relativen Ressourcenpfade sowie HTTP 404/503, Dateilink, Wiederholung und ein unabhängiger Texturfehler werden geprüft.
- Alle drei Original-GLBs wurden geladen und bei Standard- sowie veränderten Abmessungen auf endliche Geometriewerte geprüft: 68 sichtbare Meshes bei Vollkassette, 103 bei Halbkassette, 86 bei Gelenkarm.

Dieser Test benutzt DOM-/GPU-Testdoubles und echte Modelldaten. Er bestätigt Datenverarbeitung und Ressourcenverhalten, aber kein optisches Rendering auf einer echten Grafikkarte.

## 5. Native LTS-Logik mit lokalen Antworten – erfolgreich

Zusätzlicher Test: `qa/native-vm.mjs`, mit offizieller Ceres-Distribution 5.0.86 als externer Testreferenz. Es wurde die vorhandene Webpack-Modulsammlung geladen; native Komponenten, Vuex-Aktionen, Getter und kompilierte Templates wurden nicht durch eigene Ersatzimplementierungen ausgetauscht. Netzwerkantworten und Browser-/DOM-Hülle waren lokale Testdoubles.

Geprüfte Abläufe:

1. Exakte gewählte Variante und nativer Preis-VNode.
2. Fehlendes Pflichtmerkmal verhindert den Warenkorb-POST.
3. Erfülltes Bestellmerkmal berechnet den nativen Aufpreis.
4. Native Mengenwahl aktualisiert den Artikelzustand.
5. Nativer Warenkorbaufruf übergibt Variante, Menge und Bestellparameter an den lokalen Mock.
6. Backend-Ereignisse aktualisieren den Warenkorbzustand und lösen die native Miniwarenkorb-Logik aus.
7. Ein absichtlich abgelehnter Warenkorbaufruf beendet den Ladezustand.
8. Variantenwechsel innerhalb desselben Artikels aktualisiert den Preis und setzt Menge/Validierung zurück.
9. Die tatsächlich ausgelieferte `createCommerceController`-Implementierung erzeugt die nativen Kaufkomponenten.
10. Die Produktabfrage verwendet den erwarteten Endpunkt, Template-, Sprach- und Sitzungsheader.
11. Bei schnellen Wechseln gewinnt nur die jüngste Auswahl.
12. Ein unveränderter Kunden-/Preis-/Lieferlandkontext löst keinen unnötigen Reload aus; ein veränderter Kontext schon.
13. Eine falsch zugeordnete Antwort wird verborgen.
14. Entfernen des Konfigurators beendet dessen native Vue-Instanz.
15. Auf einer Artikelseite wird ein eigener Kauf-Store angelegt; der vollständige ursprüngliche Artikelzustand einschließlich Hauptartikel, Variante, Menge, Bestellmerkmal und die Seiten-URL bleiben erhalten.
16. Eine Paket-Testvariante 3001 mit Bestandteilen 93001 und 93002 erzeugt pro Klick genau einen nativen Warenkorb-POST für 3001, keinen für die Bestandteile.
17. Das gilt sowohl bei Paketeinstellung 1 (Menge 1) als auch bei Einstellung 2 (Menge 3), jeweils einschließlich Pflichtmerkmal und nativ berechnetem Aufpreis.
18. Einstellung 0, unbekannte Paketeinstellung und `bundle_item` erzeugen keine Kauf-Instanz und keinen Warenkorbaufruf.

Es wurden keine echten Kundenwarenkörbe, Bestellungen oder Shopdaten geändert. Die genannten IDs sind lokale Testdaten. Der Test prüft den nativen Frontend-Aufruf und die Schutzbedingungen, nicht die Ausführung des IO-Servers. Dessen Aufteilung wurde anhand des offiziellen PHP-Quellcodes geprüft. Die tatsächlichen Paketzuordnungen und die Warenkorbanlage im Zielsystem müssen nach der Bereitstellung bestätigt werden.

## 6. Struktur und Paket

- Name, Namespace, Plugin-Verzeichnis, ServiceProvider- und Widgetpfade stimmen überein.
- Widget-Registrierung und Ressourceneinbindung wurden mit den offiziellen PHP-Quellen abgeglichen.
- Vorschau und Frontend sind getrennt; die Editorvorschau erzeugt keine Produktabfragen.
- Die vorhandenen DE-/EN-Übersetzungsschlüssel, JavaScript-, CSS-, Bild-, Modell- und Texturverweise sind im Paket enthalten.
- Der JavaScript-Build benötigt keine externen npm-Pakete.
- Das ZIP enthält ein Plugin-Wurzelverzeichnis und keine PWA-Repositorys, Zugangsdaten oder Fremdshops.

## 7. Offene Prüfgrenzen

Ein PHP-Interpreter und ein lokaler Chromium-Browser waren nicht vorhanden. Die automatische Freigabeprüfung lehnte das zusätzliche Herunterladen des Testbrowsers ab und verwies auf die im vorausgehenden Viewer-Teilauftrag gesetzte Beschränkung, keine externen Pakete zu installieren. Der vorhandene Cloud-Browser konnte den lokalen Testserver nicht erreichen. Stattdessen wurden die beschriebenen Prüfungen mit originaler LTS-Logik in der Node-VM abgeschlossen; ein echter DOM-/Layouttest bleibt offen.

Vor der Live-Zuordnung benötigt das Paket einen Build und Funktionsdurchlauf im tatsächlichen Test-Plugin-Set. Dort sind insbesondere CSS des individuellen Themes, CDN-Erreichbarkeit/CORS der Modell-Dateien, Produktfreischaltung für den LTS-Mandanten, Preise und ein realer Paket-Warenkorbeintrag zu prüfen. Eine vorhandene native Artikelpaket-Konfiguration wird durch das Plugin verwendet, aber nicht verändert oder repariert.

## Lokal wiederholen

Im Plugin-Verzeichnis mit Node.js 24:

```bash
node build.mjs
node --check resources/js/awning-configurator.js
npm test
```

Für die zusätzliche native Prüfung: Anleitung in `qa/README.md` beachten. Diese benötigt den offiziellen Ceres-Referenzcode, der nicht im Lieferplugin enthalten ist.
