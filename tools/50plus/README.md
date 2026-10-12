# 50plus-Website: automatische Aktualisierung

Die Website im Ordner `50plus/` wird **automatisch** aus den Inhalten von
www.50pluscenter.at erzeugt. Bitte dort nichts von Hand ändern, sonst wird es
bei der nächsten Aktualisierung überschrieben.

| Datei | Zweck |
|---|---|
| `crawl.py` | lädt alle Seiten von www.50pluscenter.at herunter |
| `build.py` | baut daraus die neue Website (Startseite, Unterseiten, Übersicht) |
| `home-template.html` | Vorlage der Startseite – hier Design/Texte der Startseite ändern |
| `static/styles.css`, `static/site.js` | Aussehen und Schriftgrößen-Knöpfe |

Der Ablauf `.github/workflows/50plus-aktualisieren.yml` führt beides jeden
Montag aus und speichert Änderungen. Wenn die Originalseite nicht erreichbar
ist oder das Ergebnis unvollständig aussieht, bricht er ab und die bisherige
Website bleibt unverändert.

Manuell ausführen:

```
pip install beautifulsoup4 lxml
python3 tools/50plus/crawl.py /tmp/crawl
python3 tools/50plus/build.py /tmp/crawl 50plus
```
