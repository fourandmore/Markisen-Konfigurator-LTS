# Zusätzlicher Test mit nativer Ceres-Logik

`native-vm.mjs` prüft die tatsächliche Commerce-Anbindung mit der unveränderten Vue-/Vuex-/Komponentenlogik aus der offiziellen Ceres-Distribution. Netzwerk und DOM sind lokale Testdoubles. Dieser Test verändert keinen Shop und ersetzt keinen visuellen Browser- oder Plenty-Deployment-Test.

Voraussetzungen: Node.js 24 sowie ein lokaler Checkout des offiziellen Repositorys `https://github.com/plentymarkets/plugin-ceres`, Referenzcommit `79cb9048a767e83ce24928cd25b82d583b1e4ebd` / Version 5.0.86. Die darin enthaltene Distribution einschließlich aller `chunks`-Dateien wird benötigt. Der fremde Referenzcode ist nicht Bestandteil dieses Plugin-Pakets.

Das Umgebungsfeld `EAM_CERES_DIST` auf den absoluten Pfad zu `resources/js/dist` dieses Checkouts setzen und im Plugin-Verzeichnis ausführen:

```bash
node --disable-warning=ExperimentalWarning qa/native-vm.mjs
```

Ohne dieses Feld wird als lokale Arbeitskonvention `../reference_lts/ceres/resources/js/dist` neben dem Plugin erwartet.

## Geprüfte Kaufabläufe für Version 1.1.0

Der Test lädt die originale kompilierte Ceres-Distribution in eine lokale Node-VM und führt die aktuelle `build-src/commerce.ts` dagegen aus. Vue 2, Vuex, Artikelzustände, Preisberechnung, Bestellmerkmale, Mengenwahl, Warenkorb-Aktion und Komponenten-Renderfunktionen stammen aus Ceres. Nur die Webpack-Startfunktion wird für den Test durch das Freigeben des vorhandenen Modulladers ersetzt; der Ceres-Quellcode und seine Distribution werden nicht verändert.

Die bisherigen Inhaltseiten-Prüfungen bleiben enthalten: genaue Variantenwahl, Preis und Merkmalsaufschlag, Pflichtfeldvalidierung, Menge, nativer Warenkorb-POST, Warenkorbereignisse/Minicart, Fehlerbehandlung, veraltete Antworten, Kontextwechsel und Aufräumen.

Für Artikelseiten wird zuerst der echte native PDP-Zustand über `initVariation` angelegt: Testartikel 100, Variante 1001, Menge 4 und Bestellmerkmal „PDP original“. Anschließend prüft der Test:

- Die Konfiguratorauswahl erhält einen separaten echten Vuex-Store mit den unveränderten Ceres-Moduldefinitionen. `App.isItemView` bleibt `true`.
- Die native Kaufkomponente bestellt die ausgewählte Variante 1002 mit dem lokal eingegebenen Bestellmerkmal und Menge 2. Pflichtfelder verhindern den POST bis zur Eingabe. Preis und Aufschlag reagieren über die nativen Getter.
- Warenkorbaktionen laufen über den ursprünglichen Ceres-Warenkorb. Ereignisse aktualisieren den gemeinsamen Warenkorb und öffnen die native Vorschau; ein simulierter Serverfehler setzt Ladezustände zurück.
- Der vollständige ursprüngliche PDP-Artikelzustand einschließlich Hauptartikel, Variante, Menge, Eigenschaften und Cache bleibt unverändert. Auch ein noch nicht übernommener Texteingabewert, der Merkmals-Slider und die Seiten-URL bleiben erhalten. Der Konfigurator sendet kein globales `onVariationChanged`-Ereignis.
- Ein Modellwechsel erzeugt einen neuen privaten Kaufzustand. Verspätete Änderungen am vorherigen privaten Zustand können die neue Auswahl nicht überschreiben. Fehlende native Moduldefinitionen führen zu einem sichtbaren Rückfallhinweis mit Produktlink und ohne Kaufkomponente.

## Paket-/Elternvarianten

Die lokale Paket-Fixture enthält die Elternvariante **3001** und zwei deutlich verschiedene Komponentenvarianten **93001/93002**. Für beide erlaubten Testkonfigurationen `App.bundleSetting = 1` und `App.bundleSetting = 2` wird nachgewiesen:

- Pro Klick entsteht **genau ein** nativer POST mit `variationId: 3001`.
- Menge und Bestellmerkmale der Konfiguratorauswahl werden mitgegeben; für Modus 2 wird ausdrücklich Menge 3 geprüft.
- Es werden keine separaten Komponenten-POSTs mit 93001 oder 93002 gesendet.
- Der ursprüngliche PDP-Artikelzustand bleibt auch beim Kauf eines anderen Pakets erhalten.

Mit `App.bundleSetting = 0`, unbekannter Einstellung oder einer als `bundle_item` gekennzeichneten Auswahl werden weder eine freigegebene Kaufkomponente noch ein Warenkorb-POST erzeugt. Das Ändern von `App.bundleSetting` erfolgt ausschließlich im lokalen Testdatensatz und ändert keine Shop-Einstellung.

## Ergebnis und Grenzen

Die Testdaten und IDs sind erfunden und ersetzen keine Prüfung der tatsächlichen Katalogzuordnung. Die erwarteten Negativfälle erzeugen Diagnosewarnungen; abschließend muss die JSON-Zusammenfassung `status: passed`, `pdpIsolatedStore: true` und `parentPurchaseBundleSettings: [1, 2]` melden.

Vue läuft im Servermodus. Native untergeordnete Komponenten werden aus ihren echten Render-VNodes explizit instanziiert, weil dieser Test kein Browser-DOM aktualisiert. Damit werden native Logik, Zustand, Eingabehandler und Request-Daten geprüft; Layout, DOM-Verknüpfungen und tatsächliche Browserinteraktionen werden damit nicht nachgewiesen.

GET-/POST-Antworten werden lokal simuliert. Insbesondere wird die serverseitige IO-Aufteilung von Artikelpaketen nicht ausgeführt: Der Test belegt den richtigen Elternvarianten-Request und das Sperren ungeeigneter Konfigurationen. Die wirkliche Backend-Einstellung, die echten Eltern-/Komponentenbeziehungen sowie der gespeicherte Warenkorb müssen zusätzlich im Zielshop geprüft werden.
