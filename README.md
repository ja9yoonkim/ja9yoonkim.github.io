# ja9yoonkim.github.io

Hand-written static HTML, one stylesheet, one small script. No Jekyll, no Ruby,
no build step, nothing to install. GitHub Pages serves these files exactly as
they are.

---

## 1. Replacing the current Jekyll site

The repository is currently a fork of `jekyllt/vitae`, on the `master` branch,
built by a GitHub Actions workflow that pushes to `gh-pages`. Swapping to plain
HTML means removing the Jekyll machinery and telling Pages to serve `master`
directly.

```bash
git clone https://github.com/ja9yoonkim/ja9yoonkim.github.io
cd ja9yoonkim.github.io

# keep a way back
git branch old-jekyll-site && git push -u origin old-jekyll-site

# remove the Jekyll site
git rm -r _config.yml _includes _layouts Gemfile index.html static .github CNAME robots.txt

# copy in the new files (this folder), then
git add -A
git commit -m "Replace Jekyll resume with hand-written site"
git push
```

Then in **Settings → Pages**, set *Source* to **Deploy from a branch**, branch
`master`, folder `/ (root)`. The `gh-pages` branch is no longer used and can be
deleted once the new site is live.

Notes on the files being removed:

- **`CNAME`** is empty, so no custom domain is lost.
- **`robots.txt`** currently reads `Disallow: /`, which is what has been keeping
  the site out of Google. The replacement in this folder allows crawling and
  points at a sitemap. If you would rather stay unindexed, delete the new
  `robots.txt` and `sitemap.xml` and keep the old one.
- **`.github/`** holds the Actions workflow that built the Jekyll site. With
  Pages serving `master` directly there is nothing left to build.

---

## 2. What still needs your content

Search the folder for `EDIT` and `20XX` — those two strings mark everything
that is a placeholder. There are only a handful:

| Where | What |
|---|---|
| `cv.html` | Start years for the three appointments |
| `cv.html` | Dissertation title and advisor (or delete that line) |
| `cv.html` | Master's and bachelor's degrees |
| `cv.html` | The CV PDF at `assets/cv.pdf`, or delete the download link |
| `research.html` | Status lines for the three working papers (draft, R&R, presented at …) and PDF links where they exist |
| `research.html` | The "Fields" line, if you would describe them differently |
| `teaching.html` | Whether syllabi should be linked |

Two things worth checking rather than assuming:

- **Email.** The old site listed `jaeyoonk@xjtu.edu.cn`, your Xi'an Jiaotong
  address. That is carried over here. If you now use a `pusan.ac.kr` address,
  change it in `index.html` and `cv.html`.
- **Author order.** Both co-authored 2025 papers are listed with you first,
  matching how RePEc indexes the JEBO paper. Correct the two `pub__authors`
  lines in `index.html`, `research.html` and `cv.html` if that is wrong for the
  Global Economic Review or Applied Economics Letters papers.

### The portrait

The front page uses `assets/img/portrait.jpg` — your photo, cropped square with
the face centred and the eyes about 38% down, at 720×720 so it stays sharp on a
high-resolution screen.

**The image file is a plain square.** The shape is drawn by CSS: on the front
page `.portrait--square` rounds the corners to `1.35rem`, and everywhere else
`.portrait` makes a full circle with `border-radius: 50%`. So a replacement
never needs rounded corners or a transparent background — square is all it has
to be, at least 400×400. To change how round it is, edit that one radius.

`assets/img/portrait.png` is also in the folder: an illustrated version of the
same photo, colours flattened and the background replaced with the pine accent.
To use it instead, change one line in `index.html`:

```html
<img class="portrait portrait--square" src="assets/img/portrait.png?v=13" alt="Jae-Yoon Kim" width="132" height="132">
```

Whenever you swap the file, bump that `?v=` number or returning visitors will
keep seeing the old picture.

---

## 3. Adding a publication

Each entry is one `<li>` in a `.pub-list`. Copy an existing one:

```html
<li>
  <span class="pub__year">2026</span>
  <div>
    <h3 class="pub__title">Title of the paper</h3>
    <p class="pub__authors"><span class="me">Kim, J.-Y.</span>, &amp; Coauthor, A.</p>
    <p class="pub__venue">Journal Name, 12(3), 45–78</p>
    <ul class="pub__links">
      <li><a href="…">Publisher</a></li>
      <li><a href="https://doi.org/…">DOI</a></li>
      <li><a href="…">Replication package</a></li>
    </ul>
  </div>
</li>
```

`<span class="me">` is what sets your own name in bold. Published papers appear
in two places — `research.html` and the "Published papers" block on
`index.html` — plus a short line on `cv.html`.

---

## 4. Adding a note

1. Copy `posts/template.html` to `posts/your-slug.html`.
2. Change the `<title>`, the `<meta name="description">`, the `<h1>`, the
   `<time>` element (both the `datetime` attribute and the visible text), and
   the body.
3. Add one `<li>` to the list in `posts.html`:

```html
<li>
  <time datetime="2026-10-01">2026-10-01</time>
  <div>
    <h3><a href="posts/your-slug.html">Your title</a></h3>
    <p>One sentence that makes someone want to read it.</p>
    <ul class="tags"><li>Tag</li></ul>
  </div>
</li>
```

4. Add the URL to `sitemap.xml`.

### Margin notes

The one typographic device worth knowing about. Inside `.article__body`:

```html
<aside class="marginnote">
  <b>Lead-in.</b> The note itself.
</aside>
```

It sits in the right-hand margin beside the paragraph it follows on wide
screens, and collapses to an accented inline block on narrow ones — notes next
to the sentence they belong to, rather than at the foot of the page.

### Other pieces available inside a note

- `<p class="lede">` — larger, softer opening paragraph
- `<blockquote>` — pull quote
- `<div class="code-wrap"><pre><code>…</code></pre></div>` — code, scrolls sideways on its own
- `<div class="table-wrap"><table>…</table></div>` — table, same
- `<td class="num">` — right-aligned, with figures that line up in columns

---

## 5. Design notes

**Palette.** Light mode is a warm paper ground (`#FBFAF6`) with near-black ink
(`#1B1C1A`) and a deep pine accent (`#1F6F63`). Dark mode uses a `#1C1D1B`
ground with a lifted teal accent (`#6FC2B0`). Every colour is a CSS custom
property at the top of `assets/css/style.css` — change the values in `:root`
and the whole site follows. If you change `--accent`, change it in all three
blocks (`:root`, the `prefers-color-scheme` block, and `[data-theme="dark"]`),
and pick a darker version for light mode and a lighter, less saturated one for
dark, or links will either vanish or glare.

**Type.** EB Garamond for everything that is read — close in spirit to the ET
Book face Tufte CSS uses. Georgia Bold Italic for the name on the front
page — a system face, so it loads nothing. IBM Plex Sans for navigation, labels and metadata, IBM Plex Mono for years and figures. Korean falls back to Apple SD Gothic Neo /
Malgun Gothic, so mixed Korean–English text stays readable. Fonts load from
Google Fonts; delete that `<link>` from each `<head>` if you would rather have
no external requests, and the stacks fall back to Palatino/Georgia.

**Cache busting.** Every page links the stylesheet as
`assets/css/style.css?v=12` rather than plain `style.css`. Browsers key their
cache on the full URL, so without that suffix a returning visitor keeps using
the copy they already have and never sees your change. **After editing
`style.css` or `main.js`, bump the number in every page** — `?v=12` to `?v=13` —
or the update will be invisible to anyone who has been to the site before. The
same applies to `portrait.jpg` on the front page.

**Layout.** Running text is capped at 66 characters. Section labels sit in a
9rem left-margin column and drop above the content below 46rem. Three theme
states are handled: the reader's OS preference when nothing is stamped on
`<html>`, and an explicit `data-theme` when they use the toggle, remembered in
`localStorage`.

---

## 6. Files

```
index.html            front page — name, bio, links, photo, section list
research.html         published and working papers
teaching.html         courses, grouped by institution
posts.html            notes index
cv.html               CV, with a link to the PDF
404.html              not-found page (Pages picks this up automatically)
posts/template.html   template note — copy this for new ones
robots.txt            allows crawling (the old one blocked it)
sitemap.xml           list of pages for search engines
assets/css/style.css  the entire design
assets/js/main.js     theme toggle, nothing else
assets/img/           favicon, the photo, and the illustrated version
.nojekyll             tells Pages to serve these files rather than build them
```

`.nojekyll` is empty and easy to miss, but it is what stops GitHub from trying
to run Jekyll over the folder. Don't delete it.
