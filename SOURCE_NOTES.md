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
- Maßgebliche Dateien: `src/Api/Resources/VariationResource.php`, `src/Api/Resources/BasketItemResource.php`, `src/Helper/ResourceContainer.php`, `src/Extensions/Functions/AdditionalResources.php`, `src/Helper/EventDispatcher.php`, `src/Providers/IORouteServiceProvider.php`.

### Dokumentation

- Plugin-Definition: https://developers.plentymarkets.com/en-gb/developers/main/plugin-definition.html
- PHP-Widgets: https://developers.plentymarkets.com/en-gb/developers/main/shopbuilder-plugins/shopbuilder-widgets.html
- Git-Installation: https://knowledge.plentyone.com/de-de/manual/main/plugins/plugins-system-hinzufuegen.html
- Plugin-Set-Bereitstellung: https://knowledge.plentyone.com/de-de/manual/main/plugins/hinzugefuegte-plugins-installieren.html

Die Ceres-/IO-Distributionen wurden für den Abgleich und die isolierte Prüfung benutzt und werden mit diesem Plugin-Paket nicht erneut ausgeliefert. Der Shop verwendet seine installierten Originalkomponenten. Die Modell- und Texturdateien stammen aus dem bereitgestellten Ausgangsprojekt; bestehende Rechte daran bleiben unberührt.
