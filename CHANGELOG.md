# Änderungsstand

## 1.1.0 – 28.10.2026

- Kaufbereich auch auf Artikelseiten; Konfigurator-Kaufdaten werden dort vom übrigen Artikelzustand getrennt geführt.
- Neue Einstellung zum Start mit der aufgerufenen Artikelvariante; exakter Abgleich von Artikel- und Varianten-ID mit dem Originalkatalog.
- Parent-/Paketkauf abgesichert: Varianten mit `bundleType = bundle_item` werden nicht bestellt; Paketvarianten sind nur bei nativer Paketeinstellung 1 oder 2 freigegeben. Wert 0 würde IO-seitig den Parent durch Bestandteile ersetzen.
- Native Artikelseiten-QA für genau einen Parentvarianten-Aufruf, Menge, Bestellmerkmale und unveränderten übrigen Artikelzustand ergänzt.
- Modelle nach `resources/documents/awning-configurator/models` und Texturen nach `resources/images/awning-configurator/textures` verschoben.
- Ressourcenbasis aus dem aktuell geladenen Plugin-Skript statt aus alten gespeicherten ShopBuilder-URLs.
- HTTP-Ladefehler der Modelle um einen Link zur betroffenen Datei ergänzt.
- Plugin-Abhängigkeiten aus 1.0.1 beibehalten; erfolgreiche Bereitstellung und Widget-Sichtbarkeit von 1.0.1 wurden zwischenzeitlich vom Nutzer bestätigt.

## 1.0.1 – 28.10.2026

- Gemeldeten Buildblocker bei vorhandenem Ceres 5.0.86 adressiert: `require` nutzt nun `~5.0.78` für Ceres und `~5.0.0` für IO anstelle der abgelehnten kombinierten Vergleiche.
- Plugin-, Paket-, Frontend- und Assetversion auf 1.0.1 erhöht.
- Updateanleitung und Prüfbericht um die konkrete Fehlermeldung und den notwendigen Git-Plugin-Refresh ergänzt.
- Manifest, Versionskonsistenz, JavaScript-Syntax und ZIP-Prüfsummen lokal geprüft; der Plenty-Build im Zielsystem ist noch zu bestätigen.

## 1.0.0 – 28.10.2026

- Erstportierung des Eclipse-Markisen-PWA-Moduls als ShopBuilder-Widget für plentyShop LTS.
- Originale Katalogdaten, GLB-Modelle, Maßanpassung und Step-16-Texturkorrektur übernommen.
- Frameworkunabhängige Konfigurator-Oberfläche und WebGL-Darstellung.
- Live-Produktabruf und native LTS-Kaufkomponenten, ohne eigene Warenkorb-POST-Implementierung.
- Abbruch veralteter Abfragen, Prüfung der Variantenidentität und unvollständiger Preis-/Merkmalsdaten.
- Reaktiver Variantenwechsel mit erhaltenem nativen Kaufblock bei gleicher Artikel-ID.
- Automatische IO-Ressourceneinbindung, ShopBuilder-Einstellungen und statische Editorvorschau.
- Responsive Bedienung, Tastatursteuerung und unabhängige Bestellbarkeit bei fehlendem WebGL2.
