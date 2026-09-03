(() => {
  const ownerName = "Hyunsoo Kim";
  const publicationList = document.querySelector("#publication-list");

  const makeElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  const makeExternalLink = (label, url, primary = false) => {
    const link = makeElement("a", primary ? "primary-link" : "", label);
    link.href = url;
    link.target = "_blank";
    link.rel = "noreferrer";
    const arrow = makeElement("span", "", "↗");
    arrow.setAttribute("aria-hidden", "true");
    link.append(" ", arrow);
    return link;
  };

  const renderAuthors = (authors) => {
    const line = makeElement("p", "publication-authors");
    authors.forEach((author, index) => {
      const authorNode = author === ownerName ? makeElement("strong", "", author) : document.createTextNode(author);
      line.append(authorNode);
      if (index < authors.length - 2) line.append(", ");
      if (index === authors.length - 2) line.append(", and ");
    });
    return line;
  };

  const renderPublication = (publication) => {
    const card = makeElement("article", "publication-card");

    const visual = makeElement("div", "publication-visual");
    visual.setAttribute("aria-hidden", "true");
    if (publication.thumbnail) {
      visual.classList.add("has-image");
      visual.style.backgroundImage = `url("${publication.thumbnail.replaceAll('"', "%22")}")`;
    }
    visual.append(
      makeElement("span", "publication-year", String(publication.year)),
      makeElement("strong", "", publication.shortTitle || String(publication.year))
    );
    if (!publication.thumbnail) visual.append(makeElement("span", "publication-rings"));

    const content = makeElement("div", "publication-content");
    const kicker = makeElement("div", "publication-kicker");
    kicker.append(makeElement("span", "", publication.venue));
    if (publication.type) kicker.append(makeElement("span", "", publication.type));

    const title = makeElement("h3", "", publication.title);
    const summary = makeElement("p", "publication-summary", publication.summary);
    const links = makeElement("div", "publication-links");

    if (publication.pdf) links.append(makeExternalLink("Paper PDF", publication.pdf, true));
    if (publication.youtube) links.append(makeExternalLink("Presentation", publication.youtube));
    if (publication.doi) links.append(makeExternalLink("DOI", publication.doi));
    if (publication.code) links.append(makeExternalLink("Code", publication.code));

    content.append(kicker, title, renderAuthors(publication.authors), summary);
    if (links.childElementCount) content.append(links);
    card.append(visual, content);
    return card;
  };

  if (publicationList && Array.isArray(window.sitePublications)) {
    const publications = [...window.sitePublications].sort((a, b) => b.year - a.year);
    publicationList.replaceChildren(...publications.map(renderPublication));
  }

  const year = document.querySelector("#current-year");
  if (year) year.textContent = String(new Date().getFullYear());

  const navLinks = [...document.querySelectorAll(".site-nav a")];
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      { rootMargin: "-22% 0px -62%", threshold: [0, 0.25, 0.6] }
    );
    sections.forEach((section) => observer.observe(section));
  }
})();
