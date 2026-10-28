# Zusätzlicher Test mit nativer Ceres-Logik

`native-vm.mjs` prüft die tatsächliche Commerce-Anbindung mit der unveränderten Vue-/Vuex-/Komponentenlogik aus der offiziellen Ceres-Distribution. Netzwerk und DOM sind lokale Testdoubles. Dieser Test verändert keinen Shop und ersetzt keinen visuellen Browser- oder Plenty-Deployment-Test.

Voraussetzungen: Node.js 24 sowie ein lokaler Checkout des offiziellen Repositorys `https://github.com/plentymarkets/plugin-ceres`, Referenzcommit `79cb9048a767e83ce24928cd25b82d583b1e4ebd` / Version 5.0.86. Die darin enthaltene Distribution einschließlich aller `chunks`-Dateien wird benötigt. Der fremde Referenzcode ist nicht Bestandteil dieses Plugin-Pakets.

Das Umgebungsfeld `EAM_CERES_DIST` auf den absoluten Pfad zu `resources/js/dist` dieses Checkouts setzen und im Plugin-Verzeichnis ausführen:

```bash
node --disable-warning=ExperimentalWarning qa/native-vm.mjs
```

Ohne dieses Feld wird als lokale Arbeitskonvention `../reference_lts/ceres/resources/js/dist` neben dem Plugin erwartet.

Die Testdaten sind erfunden. Der erwartete Negativtest für eine falsche Varianten-ID erzeugt eine Warnung; abschließend muss die JSON-Zusammenfassung `status: passed` melden.
