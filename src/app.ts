import { siteContent } from "./content";

function githubMarkSvg() {
  return `
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
        0-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95
        0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.65 7.65 0 0 1 8 4.84a7.7 7.7 0 0 1 2-.27c.68 0
        1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65
        3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  `;
}

function docsIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7 4.75h7.75L19 9v10.25A1.75 1.75 0 0 1 17.25 21H7A1.75 1.75 0 0 1 5.25 19.25V6.5A1.75 1.75 0 0 1 7 4.75Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linejoin="round" />
      <path d="M14.75 4.75V9H19" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" />
      <path d="M8.5 12.25h7M8.5 15.75h7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  `;
}

function quickstartIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M7.5 6.25h9A1.75 1.75 0 0 1 18.25 8v8A1.75 1.75 0 0 1 16.5 17.75h-9A1.75 1.75 0 0 1 5.75 16V8A1.75 1.75 0 0 1 7.5 6.25Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7" />
      <path d="M9.5 11.25 12 13.75l2.5-2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M12 9v4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  `;
}

function sunIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6" />
      <path
        d="M12 1.8v3.1M12 19.1v3.1M4.78 4.78l2.2 2.2M17.02 17.02l2.2 2.2M1.8 12h3.1M19.1 12h3.1M4.78 19.22l2.2-2.2M17.02 6.98l2.2-2.2"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.6" />
    </svg>
  `;
}

function moonIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        d="M15.2 2.8c-1.08.24-2.1.78-2.95 1.63a8.4 8.4 0 0 0 0 11.88 8.38 8.38 0 0 0 5.95 2.46c1.04 0 2.06-.18 3-.53a9.4 9.4 0 0 1-2.15 2.96A9.5 9.5 0 1 1 15.2 2.8Z"
        fill="none"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round" />
    </svg>
  `;
}

function renderGithubCta() {
  return `
    <a
      class="button button--card button--secondary button--github"
      href="${siteContent.hero.primaryCta.href}"
      target="_blank"
      rel="noreferrer"
      aria-label="${siteContent.hero.primaryCta.label}">
      <span class="button__icon">${githubMarkSvg()}</span>
      <span class="button__copy">
        <strong>GitHub</strong>
        <span>View the source</span>
      </span>
    </a>
  `;
}

function renderCta(
  cta: {
    label: string;
    href: string;
    iconSvg?: string;
    subtitle?: string;
  },
  className: string,
) {
  const icon = cta.iconSvg
    ? `<span class="button__icon">${cta.iconSvg}</span>`
    : "";
  const subtitle = cta.subtitle ? `<span>${cta.subtitle}</span>` : "";

  return `
    <a class="${className}" href="${cta.href}" target="_blank" rel="noreferrer">
      ${icon}
      <span class="button__copy ${cta.subtitle ? "" : "button__copy--single"}">
        <strong>${cta.label}</strong>
        ${subtitle}
      </span>
    </a>
  `;
}

function getStoredTheme() {
  const storage = window.localStorage as { getItem?: (key: string) => string | null } | undefined;

  if (!storage || typeof storage.getItem !== "function") {
    return null;
  }

  return storage.getItem("pkgly-theme");
}

function getPreferredTheme() {
  const storedTheme = getStoredTheme();
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
}

function applyTheme(theme: "light" | "dark", toggleLabel: HTMLElement | null, toggle: HTMLButtonElement | null) {
  document.documentElement.dataset.theme = theme;
  const storage = window.localStorage as { setItem?: (key: string, value: string) => void } | undefined;

  if (storage && typeof storage.setItem === "function") {
    storage.setItem("pkgly-theme", theme);
  }

  if (toggleLabel) {
    toggleLabel.textContent = theme === "dark" ? "Light theme" : "Dark theme";
  }

  if (toggle) {
    toggle.setAttribute("aria-pressed", String(theme === "light"));
  }

  const icon = document.querySelector<HTMLElement>("[data-theme-icon]");
  if (icon) {
    icon.setAttribute("data-theme-icon", theme === "dark" ? "sun" : "moon");
    icon.innerHTML = theme === "dark" ? sunIconSvg() : moonIconSvg();
  }
}

export function renderLandingPage(root: HTMLElement) {
  const heroCtas = [
    renderGithubCta(),
    renderCta(
      {
        ...siteContent.hero.docsCta,
        iconSvg: docsIconSvg(),
        subtitle: "Setup and reference",
      },
      "button button--card button--secondary",
    ),
    renderCta(
      {
        ...siteContent.hero.quickstartCta,
        iconSvg: quickstartIconSvg(),
        subtitle: "Start in minutes",
      },
      "button button--card button--ghost",
    ),
  ].join("");

  const packageTypes = siteContent.packageTypes
    .map((packageType) => `<li class="package-strip__item">${packageType}</li>`)
    .join("");

  const statChips = siteContent.statChips
    .map((chip) => `<li class="chip-list__item">${chip}</li>`)
    .join("");

  const pillars = siteContent.pillars
    .map(
      (pillar) => `
        <article class="pillar-card">
          <h3>${pillar.title}</h3>
          <p>${pillar.body}</p>
        </article>
      `,
    )
    .join("");

  const spotlightFeatures = siteContent.spotlight.features
    .map((feature) => `<li>${feature}</li>`)
    .join("");

  const demoCards = siteContent.demoCards
    .map(
      (demo, index) => `
        <article class="demo-card">
          <div class="demo-card__copy">
            <p class="eyebrow">${demo.eyebrow}</p>
            <h3>${demo.title}</h3>
            <p>${demo.body}</p>
          </div>
          <button
            class="demo-card__zoom"
            type="button"
            data-zoom-src="${demo.image}"
            data-zoom-alt="${demo.alt}"
            data-zoom-title="${demo.title}"
            aria-label="Open screenshot for ${demo.title}">
            <img src="${demo.image}" alt="${demo.alt}" loading="lazy" />
            <span class="demo-card__zoom-label">Zoom screenshot</span>
          </button>
        </article>
      `,
    )
    .join("");

  const competitorCallouts = siteContent.competitorCallouts
    .map(
      (competitor) => `
        <article class="competitor-card">
          <p class="eyebrow">Against ${competitor.name}</p>
          <h3>${competitor.priceLabel}</h3>
          <p>${competitor.detail}</p>
          <a href="${competitor.sourceHref}" target="_blank" rel="noreferrer">Official source</a>
        </article>
      `,
    )
    .join("");

  const comparisonRows = siteContent.comparisonRows
    .map(
      (row) => `
        <tr>
          <th scope="row">${row.label}</th>
          <td>${row.pkgly}</td>
          <td>${row.artifactory}</td>
          <td>${row.nexus}</td>
          <td>${row.repoflow}</td>
        </tr>
      `,
    )
    .join("");

  const quickstartCommands = siteContent.quickstart.commands.join("\n");
  const footerLinks = siteContent.footerLinks
    .map(
      (link) => `
        <a href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>
      `,
    )
    .join("");

  root.innerHTML = `
    <div class="page-shell">
      <header class="site-header">
        <a class="wordmark" href="#top" aria-label="${siteContent.hero.wordmark}">
          <img src="/logo.png" alt="pkgly logo" class="wordmark__image" />
        </a>
        <div class="site-header__actions">
          <nav class="header-nav" aria-label="Primary">
            <a class="header-link" href="#comparison">Compare</a>
            <a class="header-link" href="#quickstart">Quickstart</a>
          </nav>
          <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">
            <span class="theme-toggle__icon" data-theme-icon="sun">${sunIconSvg()}</span>
            <span data-theme-toggle-label></span>
          </button>
        </div>
      </header>

      <main id="top">
        <section class="hero section">
          <div class="hero__copy">
            <p class="eyebrow">Public + private packages without the license tax</p>
            <h1>${siteContent.hero.title}</h1>
            <p class="hero__subtitle">${siteContent.hero.subtitle}</p>
            <div class="hero__actions hero__actions--hero">${heroCtas}</div>
            <ul class="chip-list" aria-label="Highlights">${statChips}</ul>
          </div>
          <div class="hero__visual">
            <div class="hero__frame">
              <button
                class="hero__zoom"
                type="button"
                data-zoom-src="/images/overview.png"
                data-zoom-alt="Pkgly repository overview UI"
                data-zoom-title="Pkgly repository overview"
                aria-label="Open hero screenshot preview">
                <img
                  src="/images/overview.png"
                  alt="Pkgly repository overview UI"
                  class="hero__image" />
                <span class="hero__zoom-label">Zoom screenshot</span>
              </button>
            </div>
          </div>
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Works where your team already ships</p>
            <h2>One repository manager for the package types people actually use</h2>
          </div>
          <ul class="package-strip" aria-label="Supported package ecosystems">${packageTypes}</ul>
        </section>

        <section class="section section--alt">
          <div class="section-heading">
            <p class="eyebrow">Product demo</p>
            <h2>A cleaner path from search to install to administration</h2>
          </div>
          <div class="demo-grid">${demoCards}</div>
        </section>

        <section class="section">
          <div class="section-heading">
            <p class="eyebrow">Why pkgly</p>
            <h2>Built for developers, OSS maintainers, and platform teams who want control</h2>
          </div>
          <div class="why-grid">
            <aside class="spotlight-card">
              <p class="eyebrow">${siteContent.spotlight.label}</p>
              <h3>${siteContent.spotlight.title}</h3>
              <ul class="spotlight-card__list">${spotlightFeatures}</ul>
              <div class="spotlight-card__metric">
                <span>${siteContent.spotlight.benchmarkLabel}</span>
                <strong>${siteContent.spotlight.benchmarkValue}</strong>
                <small>${siteContent.spotlight.benchmarkDetail}</small>
              </div>
            </aside>
            <div class="pillar-grid">${pillars}</div>
          </div>
        </section>

        <section class="section section--alt" id="comparison">
          <div class="section-heading">
            <p class="eyebrow">Direct callout</p>
            <h2>Pkgly exists because Artifactory, Nexus, and RepoFlow leave obvious gaps</h2>
            <p>
              If you want modern package management without a self-hosted license bill or a bloated operator experience,
              this is the alternative.
            </p>
          </div>
          <div class="competitor-grid">${competitorCallouts}</div>
          <div class="comparison-table-wrap">
            <table class="comparison-table">
              <caption>Practical comparison for self-hosted teams</caption>
              <thead>
                <tr>
                  <th scope="col">Capability</th>
                  <th scope="col">pkgly</th>
                  <th scope="col">Artifactory</th>
                  <th scope="col">Nexus</th>
                  <th scope="col">RepoFlow</th>
                </tr>
              </thead>
              <tbody>${comparisonRows}</tbody>
            </table>
          </div>
          <p class="source-note">${siteContent.sourceNote}</p>
        </section>

        <section class="section" id="quickstart">
          <div class="quickstart">
            <div class="quickstart__copy">
              <p class="eyebrow">Quickstart</p>
              <h2>${siteContent.quickstart.title}</h2>
              <p>${siteContent.quickstart.body}</p>
              <div class="hero__actions">
                ${renderCta(
                  {
                    label: siteContent.hero.docsCta.label,
                    href: siteContent.hero.quickstartCta.href,
                    iconSvg: docsIconSvg(),
                    subtitle: "Open the install guide",
                  },
                  "button button--card button--secondary",
                )}
              </div>
            </div>
            <pre class="code-block"><code>${quickstartCommands}</code></pre>
          </div>
        </section>
      </main>

      <div class="lightbox" data-lightbox hidden aria-hidden="true">
        <div class="lightbox__backdrop" data-lightbox-close></div>
        <div class="lightbox__dialog" role="dialog" aria-modal="true" aria-label="Screenshot preview">
          <button class="lightbox__close" type="button" data-lightbox-close aria-label="Close screenshot preview">
            <span>Close</span>
          </button>
          <img class="lightbox__image" data-lightbox-image src="" alt="" />
          <p class="lightbox__caption" data-lightbox-caption></p>
        </div>
      </div>

      <footer class="site-footer">
        <span class="site-footer__brand">
          <img src="/logo.png" alt="pkgly logo" class="wordmark__image wordmark__image--footer" />
        </span>
        <nav class="footer-nav" aria-label="Footer">
          ${footerLinks}
        </nav>
      </footer>
    </div>
  `;

  const toggle = root.querySelector<HTMLButtonElement>("[data-theme-toggle]");
  const toggleLabel = root.querySelector<HTMLElement>("[data-theme-toggle-label]");
  const lightbox = root.querySelector<HTMLElement>("[data-lightbox]");
  const lightboxImage = root.querySelector<HTMLImageElement>("[data-lightbox-image]");
  const lightboxCaption = root.querySelector<HTMLElement>("[data-lightbox-caption]");

  applyTheme(getPreferredTheme() as "light" | "dark", toggleLabel, toggle);

  toggle?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, toggleLabel, toggle);
  });

  root.querySelectorAll<HTMLButtonElement>("[data-zoom-src]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
      }

      lightboxImage.src = button.dataset.zoomSrc ?? "";
      lightboxImage.alt = button.dataset.zoomAlt ?? "";
      lightboxCaption.textContent = button.dataset.zoomTitle ?? "";
      lightbox.hidden = false;
      lightbox.setAttribute("aria-hidden", "false");
    });
  });

  root.querySelectorAll<HTMLElement>("[data-lightbox-close]").forEach((element) => {
    element.addEventListener("click", () => {
      if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
      }

      lightbox.hidden = true;
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
      lightboxImage.alt = "";
      lightboxCaption.textContent = "";
    });
  });
}
