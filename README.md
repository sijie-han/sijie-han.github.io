# Sijie (Skyler) Han — GitHub Pages site

This is a lightweight, researcher-style personal website built with plain **HTML/CSS/JS** so it works on GitHub Pages with zero build steps.

## Quick start (GitHub Pages user site)

1. Create a repo named **`<your-username>.github.io`** (for example: `sijie-han.github.io`).
2. Upload these files to the repo root (or push via git).
3. In **Settings → Pages**, set:
   - **Source:** Deploy from a branch  
   - **Branch:** `main`  
   - **Folder:** `/ (root)`
4. Your site will be live at: `https://<your-username>.github.io`

## Edit content

Open `index.html` and tweak any of:
- About / Research / Projects / Experience / Publications
- Contact links
- The hero terminal text

## Add paper links (recommended)

In `index.html`, search for the **Publications** section and add buttons like:

```html
<a href="https://arxiv.org/abs/xxxx.xxxxx" target="_blank" rel="noopener">arXiv</a>
<a href="https://github.com/your-repo" target="_blank" rel="noopener">code</a>
<a href="assets/files/your-paper.pdf" target="_blank" rel="noopener">PDF</a>
```

## Replace the CV

Replace this file:

- `assets/files/Sijie_Skyler_Han_CV.pdf`

with your latest CV PDF (keep the same filename so links keep working).

## Local preview

You can preview locally with any static server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

---

Built for GitHub Pages.
