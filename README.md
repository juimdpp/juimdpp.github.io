# Hyunsoo Kim — academic website

This is a static academic portfolio hosted with GitHub Pages. The homepage is intentionally lightweight: it uses plain HTML, CSS, and JavaScript, so no package installation or build command is required.

## Add a publication

1. Upload the paper PDF to `assets/papers/` using a short filename, for example `maestro-mobisys-2024.pdf`.
2. Open `assets/js/publications.js`.
3. Copy the example publication object, paste the copy at the top of the list, and edit its fields.
4. Set `pdf` to the uploaded file path.
5. Set `youtube` to the full YouTube presentation URL.
6. Commit the changes. GitHub Pages will update the publication list automatically.

Example:

```js
{
  id: "short-unique-name",
  year: 2026,
  shortTitle: "PROJECT NAME",
  title: "Full Paper Title",
  authors: ["First Author", "Hyunsoo Kim", "Third Author"],
  venue: "CHI 2026",
  type: "Full paper",
  summary: "One or two sentences explaining the contribution.",
  tags: ["Mixed Reality", "HCI"],
  pdf: "assets/papers/paper-filename.pdf",
  youtube: "https://www.youtube.com/watch?v=VIDEO_ID",
  doi: "https://doi.org/DOI_HERE",
  code: "https://github.com/OWNER/REPOSITORY",
  thumbnail: "assets/images/publications/thumbnail.webp"
}
```

Every link is optional. A button appears only when its field contains a URL. If `thumbnail` is empty, the site creates a blue typographic cover automatically.

## Update the CV

Replace `assets/files/hyunsoo-kim-cv.pdf` with the latest PDF while keeping the filename unchanged. All CV links on the website will continue to work.

## Preview locally

From the repository folder, run:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
