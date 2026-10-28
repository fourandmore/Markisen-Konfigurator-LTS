# Herkunft und technische Referenzen

Stand: 28.10.2026.

## Vom Nutzer stammendes Ausgangsprojekt

Geteilte Projektunterhaltung: https://chatgpt.com/share/6ae1cd59-a088-83ed-bd0f-89e5a8e98679

Verwendete Dateien:

- `Markisen_PWA_Step8_Deployment_Fix_FULL.zip` – Originalmodelle, Texturen, WebGL-Geometrie und Katalogdaten.
- `Markisen_PWA_Step16_Bootstrap_Technische_Daten.zip` – kumulativer letzter Modulstand, native Kaufkomponente, Tuchnamen und korrigierte Apfel-Textur.

Die in Step 16 enthaltene PWA-weite Bootstrap-Nachrüstung wurde nicht als globales LTS-Stylesheet eingebaut. LTS bringt bereits seine Theme-/Bootstrap-Gestaltung mit. Der eigene Konfigurator-Stil ist auf das Widget begrenzt.

Alle ursprünglichen 299 Datensätze sind unverändert enthalten. Die Darstellung der Tuchnamen stammt aus der Step-16-Oberfläche; deshalb kann der sichtbare Name „Kiesel“ vom ursprünglichen Tabellenwert „Kieselfarbe“ abweichen. Die Rohdaten bleiben erhalten.

## Geprüfte offizielle Plattformquellen

### Ceres / plentyShop LTS

- Repository: https://github.com/plentymarkets/plugin-ceres
- Version: 5.0.86
- Commit: `79cb9048a767e83ce24928cd25b82d583b1e4ebd`
- Commitdatum: 16.10.2026
- Maßgebliche Dateien: `src/Widgets/Helper/BaseWidget.php`, `src/Widgets/Helper/Factories/WidgetDataFactory.php`, `resources/views/PageDesign/PageDesign.twig`, `resources/js/src/app/store/modules/singleItem/BaseItemModule.js`, `ItemModule.js`, `VariationSelectModule.js`, `resources/js/src/app/components/item/SingleAddToBasket.vue`, `ItemPrice.vue`, `GraduatedPrices.vue`, `OrderPropertyList.vue`, `OrderPropertyListItem.vue`, `SingleItemBundle.vue`, `resources/js/src/app/components/basket/AddToBasket.vue`, `resources/js/src/app/store/modules/BasketModule.js`.

### IO

- Repository: https://github.com/plentymarkets/plugin-io
- Version: 5.0.86
- Commit: `9b7c6212bccae75a4644da723dfa7e2af176f044`
- Commitdatum: 19.10.2026
- Maßgebliche Dateien: `src/Api/Resources/VariationResource.php`, `src/Api/Resources/BasketItemResource.php`, `src/Services/BasketService.php`, `src/Helper/ResourceContainer.php`, `src/Extensions/Functions/AdditionalResources.php`, `src/Helper/EventDispatcher.php`, `src/Providers/IORouteServiceProvider.php`.

### Dokumentation

- Plugin-Definition: https://developers.plentymarkets.com/en-gb/developers/main/plugin-definition.html
- Ressourcenstruktur und Veröffentlichung: https://developers.plentymarkets.com/en-gb/developers/main/plugin-architecture.html
- PHP-Widgets: https://developers.plentymarkets.com/en-gb/developers/main/shopbuilder-plugins/shopbuilder-widgets.html
- Git-Installation: https://knowledge.plentyone.com/de-de/manual/main/plugins/plugins-system-hinzufuegen.html
- Plugin-Set-Bereitstellung: https://knowledge.plentyone.com/de-de/manual/main/plugins/hinzugefuegte-plugins-installieren.html
- Mandanteneinstellung für Artikelpakete, LTS-Archiv: https://knowledge.plentyone.com/de-de/manual/archive/webshop/mandanten-verwalten.html

Die Ceres-/IO-Distributionen wurden für den Abgleich und die isolierte Prüfung benutzt und werden mit diesem Plugin-Paket nicht erneut ausgeliefert. Der Shop verwendet seine installierten Originalkomponenten. Die Modell- und Texturdateien stammen aus dem bereitgestellten Ausgangsprojekt; bestehende Rechte daran bleiben unberührt.

## Änderungen ab 1.1.0

Die 27 ursprünglichen Binärdateien sind bytegleich erhalten. GLB-Modelle wurden nach `resources/documents/awning-configurator/models`, Texturen nach `resources/images/awning-configurator/textures` verschoben. Plenty dokumentiert `documents` für statische Inhalte und `images` für Bilder. Die konkrete fehlgeschlagene URL des Nutzers lag bei der Korrektur nicht vor; die Veröffentlichung dieser Pfade ist daher im tatsächlichen Plugin-Set noch zu bestätigen.

Die aktuelle Ressourcenbasis wird bevorzugt aus der URL des gerade geladenen Plugin-JavaScripts ermittelt. Bei Artikelseiten wird die Anfangsauswahl anhand beider IDs (Artikel und Variante) gegen den Originalkatalog geprüft. Der zusätzliche Kaufkontext verwendet vorhandene native LTS-Moduldefinitionen; diese Laufzeitintegration ist auf die geprüfte plentyShop-LTS-/Vuex-Referenz bezogen und muss bei Änderungen der Shop-Laufzeit erneut geprüft werden.

## Parent-/Paketvarianten und serverseitige Aufteilung

`SingleAddToBasket.vue` übergibt die ausgewählte `currentVariation.variation.id` an die native Warenkorblogik. `IO/src/Services/BasketService.php`, Methode `addBasketItem()`, ersetzt bei `dontSplitItemBundle === 0` und `bundleType === 'bundle'` diese Variante durch ihre Komponenten und multipliziert deren Mengen. Ein korrekter Parent-Aufruf allein verhindert diese serverseitige Ersetzung nicht.

Die LTS-Dateien `src/Wizard/ShopWizard/Config/OnlineStoreConfig.php`, `Mapping/OnlineStoreMapping.php`, `Steps/Builder/OnlineStoreStep.php` sowie `resources/lang/de/Wizard.properties` belegen Auswahl, Werte und Beschriftungen: 1 behält das Paket bei, 2 behält Paket und Bestandteile bei, 0 ersetzt das Paket. `resources/views/PageDesign/PageDesign.twig` stellt den Wert als `App.bundleSetting` bereit. Deshalb sperrt das Widget den Paketkauf bei 0 oder unbekanntem Wert sowie jede als `bundle_item` gekennzeichnete Katalogvariante.

Die statischen Originaltabellen enthalten keine geprüfte Parent-/Komponentenbeziehung. `variation.parentVariationId` und die Hauptvariante eines Artikels sind kein belastbarer Ersatz für eine Paketzuordnung. Wird eine Komponenten-ID erkannt, muss die richtige Paketvarianten-ID für genau diese Kombination anhand des Zielsystems korrigiert werden.
