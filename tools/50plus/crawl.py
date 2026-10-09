import re, os, sys, time, urllib.request, urllib.parse, hashlib, json
BASE = "https://www.50pluscenter.at/"
out = sys.argv[1]
seen, queue, pages = set(), [BASE], {}
def norm(u):
    u = urllib.parse.urljoin(BASE, u).split('#')[0]
    return u
while queue:
    u = queue.pop(0)
    if u in seen: continue
    seen.add(u)
    try:
        req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            ct = r.headers.get("Content-Type", "")
            final = r.geturl()
            if "html" not in ct: continue
            html = r.read().decode("utf-8", "replace")
    except Exception as e:
        print("ERR", u, e); continue
    fn = hashlib.md5(u.encode()).hexdigest()[:12] + ".html"
    open(os.path.join(out, fn), "w").write(html)
    pages[u] = {"file": fn, "final": final}
    for h in re.findall(r'href="([^"]+)"', html):
        h = h.replace("&amp;", "&")
        if h.startswith(("mailto:", "tel:", "javascript:")): continue
        v = urllib.parse.urljoin(u, h).split('#')[0]
        if not v.startswith(BASE): continue
        path = urllib.parse.urlparse(v).path
        if re.search(r'\.(jpe?g|png|gif|pdf|css|js|ico|svg|webp|docx?|xlsx?|zip|mp4|mp3)$', path, re.I): continue
        if "/classes/" in path or "/assets/" in path or "/images/" in path or "/store/" in path: continue
        if "?" in v: continue
        if v not in seen and v not in queue: queue.append(v)
    time.sleep(0.2)
json.dump(pages, open(os.path.join(out, "_index.json"), "w"), indent=1)
print(len(pages), "pages")
