#!/usr/bin/env python3
"""Baut die Unterseiten der neuen 50plus-Website.

Liest die mit crawl.py gespeicherten Originalseiten von www.50pluscenter.at,
übernimmt Titel, Texte, Bilder und Links aus dem Inhaltsbereich und erzeugt
daraus schlichte, seniorenfreundliche Seiten im Ordner 50plus/.

Aufruf:  python3 tools/50plus/build.py <crawl-ordner> <ziel-ordner>
"""
import html
import json
import os
import posixpath
import re
import sys
import urllib.parse

from bs4 import BeautifulSoup, Comment, NavigableString, Tag

BASE = "https://www.50pluscenter.at/"
CRAWL, OUT = sys.argv[1], sys.argv[2]

ASSET_RE = re.compile(r"\.(jpe?g|png|gif|pdf|webp|svg|docx?|xlsx?|pptx?|zip|mp3|mp4)$", re.I)
NAV = [
    ("termine/index.html", "Termine", "c1"),
    ("themen/index.html", "Angebote", "c2"),
    ("mitmachen/index.html", "Mitmachen", "c3"),
    ("unser-team/index.html", "Kontakt", "c4"),
]
PHONE_SVG = ('<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 '
             '1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 '
             '1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>')
MAIL_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'
BACK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>'


# ───────────── Adressen ─────────────
def local_path(url):
    """Original-URL → Pfad der neuen Seite (relativ zum Website-Ordner)."""
    p = urllib.parse.urlparse(url).path.lstrip("/")
    p = urllib.parse.unquote(p)
    if p == "" or p == "index.html":
        return "index.html"
    if p.endswith("/"):
        return p + "index.html"
    last = p.rsplit("/", 1)[-1]
    if "." not in last:
        return p + ".html"
    return p


def rel(target, current):
    return posixpath.relpath(target, posixpath.dirname(current) or ".")


index = json.load(open(os.path.join(CRAWL, "_index.json")))
pages = {}  # lokaler Pfad → Original-URL (Duplikate wie x/ und x/index.html zusammengefasst)
for url in sorted(index, key=len):
    lp = local_path(url)
    if lp not in pages:
        pages[lp] = url


def map_href(href, page_url, current):
    """Link aus dem Original auf die neue Seite oder auf das Original umbiegen."""
    href = (href or "").strip()
    if not href or href.startswith("#") or href.startswith("javascript:"):
        return None
    if href.startswith(("mailto:", "tel:")):
        return href
    absu = urllib.parse.urljoin(page_url, href)
    parsed = urllib.parse.urlparse(absu)
    if not absu.startswith(BASE):
        return absu
    path = parsed.path
    if ASSET_RE.search(path) or "/images/" in path or "/assets/" in path or "/store/" in path or "/classes/" in path:
        return absu
    lp = local_path(absu.split("#")[0].split("?")[0])
    if lp in pages:
        return rel(lp, current)
    return absu  # Seite nicht übernommen → Original verlinken


def abs_src(src, page_url):
    return urllib.parse.urljoin(page_url, (src or "").strip())


# ───────────── Inhalt umwandeln ─────────────
def esc(s):
    return html.escape(s, quote=True)


def text_of(el):
    return re.sub(r"\s+", " ", el.get_text(" ", strip=True).replace("\xa0", " ")).strip()


def is_empty(el):
    if isinstance(el, NavigableString):
        return not str(el).strip("\xa0 \n\t\r.")
    t = re.sub(r"[\s\xa0.…·,,]+", "", el.get_text())
    return not t and not el.find("img")


BOILERPLATE = ("gratis infopaket", "anfrage-formular")


class Converter:
    def __init__(self, page_url, current):
        self.page_url = page_url
        self.current = current
        self.links = set()

    def img(self, el, cls=None):
        src = el.get("src")
        if not src:
            return ""
        alt = (el.get("alt") or "").strip()
        if alt.lower() in ("header", "logo", "portrait", "bild"):
            alt = ""
        c = f' class="{cls}"' if cls else ""
        return f'<img src="{esc(abs_src(src, self.page_url))}" alt="{esc(alt)}" loading="lazy"{c}>'

    def kids(self, el):
        return "".join(self.conv(c) for c in el.children)

    def gallery(self, el):
        out = []
        for im in el.find_all("img"):
            alt = (im.get("alt") or "").strip()
            cap = f"<figcaption>{esc(alt)}</figcaption>" if alt and alt.lower() not in ("header", "logo") else ""
            out.append(f"<figure>{self.img(im)}{cap}</figure>")
        return f'<div class="gallery">{"".join(out)}</div>' if out else ""

    def teaser(self, block):
        h = block.find(["h3", "h2", "h4"])
        a = (h.find("a") if h else None) or block.find("a", href=True)
        href = map_href(a.get("href"), self.page_url, self.current) if a else None
        title = text_of(h) if h else (a.get("title", "") if a else "")
        im = block.find("img")
        texts = []
        for p in block.find_all("p"):
            t = re.sub(r"\s*mehr erfahren[.…]*\s*$", "", text_of(p), flags=re.I)
            if t:
                texts.append(t)
        if href:
            self.links.add(href)
        inner = (self.img(im) if im else '<span class="tcard-noimg" aria-hidden="true"></span>')
        inner += f'<span class="tcard-body"><span class="tcard-title">{esc(title)}</span>'
        if texts:
            inner += f'<span class="tcard-text">{esc(" ".join(texts))}</span>'
        inner += '<span class="card-more">Mehr erfahren</span></span>' if href else "</span>"
        if href:
            return f'<li><a class="tcard" href="{esc(href)}">{inner}</a></li>'
        return f'<li><div class="tcard">{inner}</div></li>'

    def table(self, el):
        rows = []
        for tr in el.find_all("tr"):
            if tr.find_parent("table") is not el:
                continue
            cells = [c for c in tr.find_all(["td", "th"], recursive=False)]
            rows.append([(c, not is_empty(c)) for c in cells])
        rows = [r for r in rows if any(full for _, full in r)]
        if not rows:
            return ""
        ncol = max(len(r) for r in rows)
        keep = [i for i in range(ncol) if any(i < len(r) and r[i][1] for r in rows)]
        body = []
        for r in rows:
            cells = []
            for i in keep:
                inner = self.kids(r[i][0]) if i < len(r) else ""
                inner = re.sub(r"^\s*<p>(.*?)</p>\s*$", r"\1", inner.strip(), flags=re.S) if inner.count("<p>") == 1 else inner
                cells.append(f"<td>{inner}</td>")
            body.append("<tr>" + "".join(cells) + "</tr>")
        cls = "tbl" if len(keep) > 1 else "tbl tbl-single"
        return f'<div class="tbl-wrap"><table class="{cls}"><tbody>{"".join(body)}</tbody></table></div>'

    def conv(self, el):
        if isinstance(el, Comment):
            return ""
        if isinstance(el, NavigableString):
            t = str(el).replace("¬", "").replace("\xad", "")
            return esc(re.sub(r"[ \t\r\n]+", " ", t))
        if not isinstance(el, Tag):
            return ""
        name = el.name
        cls = el.get("class", [])
        cls_s = " ".join(cls)

        if name in ("script", "style", "noscript", "svg", "form", "input", "select", "option",
                    "textarea", "label", "button", "iframe", "object", "embed", "source"):
            return ""
        if "ngpar" in cls or "clearfix" in cls or "paragraphtableicon" in cls:
            return ""

        # Aufklapp-Bereiche (z.B. Monate bei den Terminen)
        if "accordion_default" in cls_s:
            out, label = [], None
            for ch in el.children:
                if not isinstance(ch, Tag):
                    continue
                if "accordionlink" in ch.get("class", []):
                    label = text_of(ch)
                elif "accordionarea" in ch.get("class", []):
                    out.append(f'<details class="acc"><summary>{esc(label or "Mehr anzeigen")}</summary>'
                               f'<div class="acc-body">{self.kids(ch)}</div></details>')
                    label = None
            return "".join(out)

        # Reiter → untereinander mit Überschrift
        if "tabs_default" in cls_s:
            out = []
            for a in el.select("ul.tab a"):
                area = el.find(id=(a.get("href") or "").lstrip("#"))
                if area is not None:
                    out.append(f'<section class="tabsec"><h2>{esc(text_of(a))}</h2>{self.kids(area)}</section>')
            return "".join(out)

        if "teaser" in cls and "teaserblock" not in cls:
            items = [self.teaser(b) for b in el.select(".teaserblock")]
            return f'<ul class="tcards">{"".join(items)}</ul>' if items else ""
        if "teaserblock" in cls:
            return f'<ul class="tcards">{self.teaser(el)}</ul>'

        if any(k in cls_s for k in ("ngcarouselwrapper", "ngbanner", "sqrpluginpictures")):
            return self.gallery(el)

        if "sqwpluginfacts" in cls_s:
            items = []
            for li in el.find_all("li", recursive=False):
                im = li.find("img")
                icon = f'<img src="{esc(abs_src(im["src"], self.page_url))}" alt="" class="fact-icon">' if im and im.get("src") else ""
                items.append(f'<li>{icon}<div>{self.kids_without_img(li)}</div></li>')
            return f'<ul class="facts">{"".join(items)}</ul>'

        if name == "div" and re.search(r"columncontainer", cls_s):
            cols = [self.kids(c) for c in el.find_all("div", recursive=False)]
            cols = [c for c in cols if c.strip()]
            return f'<div class="cols">{"".join(f"<div>{c}</div>" for c in cols)}</div>' if cols else ""

        if "paragraphsidebarright" in cls or "paragraphsidebarleft" in cls:
            inner = self.kids(el)
            if not inner.strip():
                return ""
            only_img = not text_of(el)
            return f'<div class="{"side-img" if only_img else "side-box"}">{inner}</div>'

        if name == "table":
            return self.table(el)

        if name == "img":
            return self.img(el)

        if name == "a":
            if "gallery" in cls:
                return self.kids(el)
            href = map_href(el.get("href"), self.page_url, self.current)
            inner = self.kids(el)
            if not inner.strip():
                return ""
            if not href:
                return inner
            self.links.add(href)
            return f'<a href="{esc(href)}">{inner}</a>'

        if name in ("h1", "h2", "h3", "h4", "h5", "h6"):
            t = self.kids(el).strip()
            if not re.sub(r"<[^>]+>|&nbsp;|\s", "", t):
                return ""
            level = {"h1": 2, "h2": 2, "h3": 3}.get(name, 4)
            return f"<h{level}>{t}</h{level}>"

        if name == "p":
            if is_empty(el):
                return ""
            low = text_of(el).lower()
            if all(b in low for b in BOILERPLATE) or "klingt interessant" in " ".join(i.get("alt", "").lower() for i in el.find_all("img")):
                return ""
            return f"<p>{self.kids(el).strip()}</p>"

        if name == "br":
            return "<br>"
        if name in ("strong", "b"):
            t = self.kids(el)
            return f"<strong>{t}</strong>" if t.strip() else t
        if name in ("em", "i"):
            t = self.kids(el)
            return f"<em>{t}</em>" if t.strip() else t
        if name in ("ul", "ol"):
            items = "".join(self.conv(c) for c in el.children if isinstance(c, Tag) and c.name == "li")
            return f"<{name}>{items}</{name}>" if items.strip() else ""
        if name == "li":
            t = self.kids(el).strip()
            return f"<li>{t}</li>" if t else ""
        if name == "hr":
            return "<hr>"
        if name == "div" and "paragraph" in cls:
            return f"<div class=\"block\">{self.kids(el)}</div>"
        # span, font, div, picture, center … → nur Inhalt übernehmen
        return self.kids(el)

    def kids_without_img(self, el):
        return "".join(self.conv(c) for c in el.descendants if isinstance(c, Tag) and c.name == "p") or esc(text_of(el))


def tidy(h):
    for _ in range(3):
        h = re.sub(r"<p>\s*(<br>\s*)*</p>", "", h)
        h = re.sub(r"<(strong|em|p|li|div class=\"block\")>\s*</\1>", "", h)
        h = re.sub(r'<div class="block">\s*</div>', "", h)
    h = re.sub(r"<p>\s*(<br>\s*)+", "<p>", h)
    h = re.sub(r"(\s*<br>)+\s*</p>", "</p>", h)
    h = re.sub(r"(<br>\s*){3,}", "<br><br>", h)
    h = re.sub(r"[ ]{2,}", " ", h)
    return h


# ───────────── Seiten-Struktur ─────────────
# Menü-Beschriftungen der Originalseite als Ersatz-Titel
menu_labels = {}
_home = BeautifulSoup(open(os.path.join(CRAWL, index[BASE]["file"]), encoding="utf-8").read(), "lxml")
for _a in _home.select("a[href]"):
    _t = text_of(_a)
    if _t:
        menu_labels.setdefault(local_path(urllib.parse.urljoin(BASE, _a["href"])), _t)

titles = {}
contents = {}
for lp, url in pages.items():
    if lp == "index.html":
        continue
    soup = BeautifulSoup(open(os.path.join(CRAWL, index[url]["file"]), encoding="utf-8").read(), "lxml")
    cap = soup.find(id="caption")
    title = text_of(cap.find("h1")) if cap and cap.find("h1") else ""
    if not title:
        title = menu_labels.get(lp, "")
    if not title:
        h = soup.find(id="content").find(["h1", "h2"])
        title = text_of(h) if h else posixpath.basename(posixpath.dirname(lp) if lp.endswith("index.html") else lp).rsplit(".", 1)[0].replace("-", " ").title()
    titles[lp] = title
    contents[lp] = soup.find(id="content")

titles["index.html"] = "Startseite"


def parent_of(lp):
    d = posixpath.dirname(lp)
    if lp.endswith("index.html"):
        d = posixpath.dirname(d)
    while True:
        cand = (d + "/index.html") if d else "index.html"
        if cand in pages and cand != lp:
            return cand
        if not d:
            return "index.html"
        d = posixpath.dirname(d)


children = {}
for lp in pages:
    if lp != "index.html":
        children.setdefault(parent_of(lp), []).append(lp)
for k in children:
    children[k].sort(key=lambda p: titles.get(p, p).lower())


def crumbs(lp):
    chain, cur = [], lp
    while cur != "index.html":
        cur = parent_of(cur)
        chain.append(cur)
    return list(reversed(chain))


def section_of(lp):
    top = lp.split("/", 1)[0]
    return {"termine": "termine/index.html", "themen": "themen/index.html",
            "mitmachen": "mitmachen/index.html", "unser-team": "unser-team/index.html"}.get(top)


def page_html(lp, title, body, current_nav=None):
    root = rel("index.html", lp)
    css = rel("styles.css", lp)
    nav = []
    for target, label, color in NAV:
        cur = ' aria-current="page"' if target == current_nav else ""
        nav.append(f'<li><a href="{rel(target, lp)}"{cur}><span class="dot {color}" aria-hidden="true"></span>{label}</a></li>')
    over_cur = ' aria-current="page"' if lp == "uebersicht.html" else ""
    nav.append(f'<li><a href="{rel("uebersicht.html", lp)}" class="more"{over_cur}>Alle Seiten</a></li>')
    return f"""<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)} – 50plus</title>
  <meta name="theme-color" content="#ffffff">
  <link rel="icon" href="https://www.50pluscenter.at/images/pictures/logo-neufav.png">
  <link rel="stylesheet" href="{css}">
  <script>try {{ var fs = localStorage.getItem("schrift"); if (fs) document.documentElement.dataset.schrift = fs; }} catch (e) {{}}</script>
</head>
<body class="subpage">
  <a class="skip" href="#inhalt">Direkt zum Inhalt springen</a>
  <div class="topbar">
    <div class="wrap topbar-inner">
      <a class="topbar-call" href="tel:+4366262573600">{PHONE_SVG}<span><span class="call-prefix">Rufen Sie uns an: </span><strong>0662 / 62 57 360</strong></span></a>
      <div class="fontsize" role="group" aria-label="Schriftgröße">
        <span class="fontsize-label">Schriftgröße:</span>
        <button type="button" data-size="normal" aria-label="Normale Schrift">A</button>
        <button type="button" data-size="gross" aria-label="Große Schrift">A<sup>+</sup></button>
        <button type="button" data-size="sehrgross" aria-label="Sehr große Schrift">A<sup>++</sup></button>
      </div>
    </div>
  </div>
  <header class="header" id="top">
    <div class="wrap">
      <a class="logo" href="{root}" aria-label="50plus – zur Startseite">
        <img src="https://www.50pluscenter.at/images/pictures/layoutpictures/50pluslogo%20trans.jpg" alt="50plus GmbH" width="316" height="62">
      </a>
      <nav class="mainnav" aria-label="Hauptmenü"><ul>{"".join(nav)}</ul></nav>
    </div>
  </header>
{body}
  <footer class="footer">
    <div class="wrap">
      <div class="footer-cols">
        <div>
          <h2>50plus Center</h2>
          <p>Alpenstraße 99, 1. Stock<br>5020 Salzburg</p>
          <p><a href="tel:+4366262573600">0662 / 62 57 360</a><br><a href="mailto:office@50plusgmbh.com">office@50plusgmbh.com</a></p>
        </div>
        <div>
          <h2>Salzburger Senioren-, Pensionisten- und Rentnerbund</h2>
          <p>Merianstraße 13, T6, 1. Stock<br>5020 Salzburg</p>
          <p><a href="tel:+4366287568500">0662 / 87 56 850</a><br><a href="mailto:office@seniorenbund.com">office@seniorenbund.com</a></p>
        </div>
      </div>
      <p>Alle Angaben ohne Gewähr. Vorbehaltlich Druckfehler. · <a href="{rel("unser-team/kontakt.html", lp)}">Kontakt / Impressum</a></p>
      <a class="btn btn-light" href="#top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>Zurück zum Anfang der Seite</a>
    </div>
  </footer>
  <script src="{rel("site.js", lp)}"></script>
</body>
</html>
"""


def cta(lp):
    return f"""
    <aside class="cta" aria-label="Infopaket und Kontakt">
      <div>
        <h2>Klingt interessant …?</h2>
        <p>Dann fordern Sie jetzt Ihr <strong>gratis Infopaket</strong> an!</p>
      </div>
      <div class="cta-buttons">
        <a class="btn btn-primary" href="{rel("mitmachen/index.html", lp)}">Gratis Infopaket anfordern</a>
        <a class="btn btn-secondary" href="tel:+4366262573600">{PHONE_SVG}0662 / 62 57 360</a>
      </div>
    </aside>"""


MITMACHEN_FORM = """
<div class="form-hint">
  <h2>So bekommen Sie Ihr gratis Infopaket</h2>
  <p>Am einfachsten: Rufen Sie uns an oder schreiben Sie uns eine E-Mail mit Ihrem Namen und Ihrer Adresse.</p>
  <div class="button-col">
    <a class="btn btn-primary" href="tel:+4366262573600">{phone}Anrufen: 0662 / 62 57 360</a>
    <a class="btn btn-secondary" href="mailto:office@50plusgmbh.com?subject=Gratis%20Infopaket&amp;body=Bitte%20senden%20Sie%20mir%20das%20gratis%20Infopaket.%0A%0AVor-%20%2F%20Nachname%3A%0AStra%C3%9Fe%20und%20Hausnummer%3A%0APostleitzahl%20%2F%20Ort%3A%0ATelefon%3A%0A%0AJa%2C%20ich%20m%C3%B6chte%20%C3%BCber%20Aktuelles%20informiert%20werden%3A%20ja%20%2F%20nein">{mail}E-Mail schreiben</a>
    <a class="btn btn-secondary" href="https://www.50pluscenter.at/mitmachen/index.html">Online-Formular öffnen</a>
  </div>
</div>""".format(phone=PHONE_SVG, mail=MAIL_SVG)


# ───────────── Seiten schreiben ─────────────
written = 0
for lp, url in pages.items():
    if lp == "index.html":
        continue
    title = titles[lp]
    conv = Converter(url, lp)
    body = tidy(conv.kids(contents[lp]))
    # doppelte Überschrift (gleich wie Seitentitel) am Anfang entfernen
    m = re.match(r"\s*(?:<div class=\"block\">\s*)?<h2>(.*?)</h2>", body, re.S)
    if m and re.sub(r"<[^>]+>|\s", "", m.group(1)).lower() == re.sub(r"\s", "", title).lower():
        body = body.replace(m.group(0), m.group(0).replace(f"<h2>{m.group(1)}</h2>", ""), 1)
        body = tidy(body)
    if contents[lp].find("form"):
        body += MITMACHEN_FORM

    chain = crumbs(lp)
    crumb_html = " ".join(
        f'<li><a href="{rel(c, lp)}">{esc(titles.get(c, c))}</a></li>' for c in chain
    ) + f'<li aria-current="page">{esc(title)}</li>'
    parent = chain[-1]
    back = (f'<a class="btn btn-back" href="{rel(parent, lp)}">{BACK_SVG}Zurück zu: {esc(titles.get(parent, "Startseite"))}</a>')

    kids = [c for c in children.get(lp, []) if rel(c, lp) not in conv.links]
    sub = ""
    if kids:
        items = "".join(f'<li><a href="{rel(c, lp)}">{esc(titles[c])}</a></li>' for c in kids)
        sub = f'<section class="subpages" aria-labelledby="h-sub"><h2 id="h-sub">Seiten in diesem Bereich</h2><ul>{items}</ul></section>'

    if not re.sub(r"<[^>]+>|\s", "", body) and not sub:
        body = '<p class="empty-note">Zu diesem Thema gibt es derzeit keine weiteren Informationen. Bei Fragen rufen Sie uns gerne an.</p>'

    main = f"""
  <main id="inhalt" class="page">
    <div class="wrap">
      <nav class="crumbs" aria-label="Sie sind hier"><span class="crumbs-label">Sie sind hier:</span><ol>{crumb_html}</ol></nav>
      {back}
      <h1 class="page-title">{esc(title)}</h1>
      <div class="prose">{body}</div>
      {sub}
      {cta(lp)}
    </div>
  </main>"""
    dest = os.path.join(OUT, lp)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, "w", encoding="utf-8").write(page_html(lp, title, main, section_of(lp)))
    written += 1


# ───────────── Übersicht aller Seiten ─────────────
def tree(lp, depth):
    kids = children.get(lp, [])
    if not kids:
        return ""
    items = []
    for c in kids:
        sub = tree(c, depth + 1)
        link = f'<a href="{rel(c, "uebersicht.html")}">{esc(titles[c])}</a>'
        n = len(sub.split("<li>")) - 1 if sub else 0
        if sub and depth >= 1 and n > 6:
            items.append(f'<li>{link}<details><summary>{n} Unterseiten anzeigen</summary>{sub}</details></li>')
        else:
            items.append(f"<li>{link}{sub}</li>")
    return f'<ul>{"".join(items)}</ul>'


sections = []
for top in children.get("index.html", []):
    sections.append(f'<section class="tree-sec"><h2><a href="{rel(top, "uebersicht.html")}">{esc(titles[top])}</a></h2>{tree(top, 1)}</section>')
over = f"""
  <main id="inhalt" class="page">
    <div class="wrap">
      <nav class="crumbs" aria-label="Sie sind hier"><span class="crumbs-label">Sie sind hier:</span><ol><li><a href="index.html">Startseite</a></li><li aria-current="page">Alle Seiten</li></ol></nav>
      <a class="btn btn-back" href="index.html">{BACK_SVG}Zurück zur Startseite</a>
      <h1 class="page-title">Alle Seiten im Überblick</h1>
      <p class="lead">Hier finden Sie alle Seiten unserer Website. Tippen Sie auf einen Eintrag, um die Seite zu öffnen.</p>
      <div class="tree">{"".join(sections)}</div>
    </div>
  </main>"""
open(os.path.join(OUT, "uebersicht.html"), "w", encoding="utf-8").write(page_html("uebersicht.html", "Alle Seiten", over))

# ───────────── Startseite: Links auf die neuen Seiten umstellen ─────────────
home_path = os.path.join(OUT, "index.html")
home = open(home_path, encoding="utf-8").read()


def fix_home_link(m):
    url = html.unescape(m.group(1))
    if not url.startswith(BASE):
        return m.group(0)
    new = map_href(url, BASE, "index.html")
    return f'href="{esc(new)}"' if new else m.group(0)


home = re.sub(r'href="(https://www\.50pluscenter\.at/[^"]*)"', fix_home_link, home)
open(home_path, "w", encoding="utf-8").write(home)

print(f"{written} Unterseiten + Übersicht geschrieben")
