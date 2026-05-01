// ABOUTME: Tests landing page rendering, SEO metadata, and interactive UI behavior.
// ABOUTME: Verifies content stays aligned with pkgly positioning and static metadata.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { renderLandingPage } from "./app";
import { siteContent } from "./content";

function setupPage() {
  document.body.innerHTML = '<div id="app"></div>';
  const root = document.querySelector<HTMLElement>("#app");

  if (!root) {
    throw new Error("Missing root");
  }

  renderLandingPage(root);
  return root;
}

describe("renderLandingPage", () => {
  it("renders the hero headline and prioritized CTAs", () => {
    setupPage();

    expect(document.querySelector("h1")?.textContent).toBe("Self-hosted package registry");

    const heroButtons = Array.from(document.querySelectorAll(".hero__actions--hero a"));
    expect(heroButtons.map((button) => button.getAttribute("href"))).toEqual([
      siteContent.hero.docsCta.href,
      "#quickstart",
      siteContent.hero.primaryCta.href,
    ]);
    expect(heroButtons[0]?.className).toContain("button--secondary");
    expect(heroButtons[1]?.className).toContain("button--ghost");
    expect(heroButtons[2]?.className).toContain("button--github");
  });

  it("renders all supported package families in the compatibility strip", () => {
    setupPage();

    for (const packageType of [
      "npm",
      "Docker / OCI",
      "Helm",
      "Maven",
      "Python",
      "Cargo",
      "RubyGems",
      "Go",
      "Debian",
      "PHP Composer",
    ]) {
      expect(document.body.textContent).toContain(packageType);
    }
  });

  it("renders direct competitor callouts and the benchmark claim", () => {
    setupPage();

    expect(document.body.textContent).toContain("Artifactory");
    expect(document.body.textContent).toContain("Nexus");
    expect(document.body.textContent).toContain("RepoFlow");
    expect(document.body.textContent).toContain("200 RPS");
    expect(document.body.textContent).toContain("4 vCPU / 8 GB RAM");
  });

  it("renders a detailed self-hosted comparison against current competitors", () => {
    setupPage();

    const comparison = document.querySelector("#comparison");
    expect(comparison).not.toBeNull();

    for (const label of [
      "Self-hosted commercial cost",
      "Source availability",
      "Repository modes",
      "Hosted format coverage",
      "Proxy cache coverage",
      "Virtual / group repositories",
      "S3 artifact storage",
      "SSO",
      "Audit trail",
      "Package cleanup / retention",
      "Webhooks",
      "Migration help",
    ]) {
      expect(comparison?.textContent).toContain(label);
    }

    expect(comparison?.textContent).toContain("RepoFlow audit logs are marked soon");
    expect(comparison?.textContent).toContain("Checked against official vendor pages on April 30, 2026");
  });

  it("renders the updated key capabilities in the overview content", () => {
    setupPage();

    expect(document.body.textContent).toContain("Hosted + proxy + virtual repositories");
    expect(document.body.textContent).toContain("S3 storage with local disk caching");
    expect(document.body.textContent).toContain("Users, ACLs, and repository permissions");
    expect(document.body.textContent).toContain("SSO support");
    expect(document.body.textContent).toContain("Repository cleanup policies");
    expect(document.body.textContent).toContain("Webhooks for packages");
    expect(document.body.textContent).toContain("Pkgly CLI");
  });

  it("renders the architecture overview with runtime and storage components", () => {
    setupPage();

    const architecture = document.querySelector("#architecture");
    expect(architecture).not.toBeNull();
    expect(architecture?.textContent).toContain("Rust app");
    expect(architecture?.textContent).toContain("Embedded Vue.js frontend");
    expect(architecture?.textContent).toContain("PostgreSQL");
    expect(architecture?.textContent).toContain("Local disk or S3");
  });

  it("removes trailing periods from headings", () => {
    setupPage();

    const headings = Array.from(document.querySelectorAll("h1, h2, h3")).map((heading) =>
      heading.textContent?.trim() ?? "",
    );

    for (const heading of headings) {
      expect(heading.endsWith(".")).toBe(false);
    }
  });

  it("opens and closes the inline screenshot lightbox", () => {
    setupPage();

    const openButton = document.querySelector<HTMLButtonElement>(".demo-card__zoom");
    const lightbox = document.querySelector<HTMLElement>("[data-lightbox]");
    const closeButton = document.querySelector<HTMLButtonElement>("[data-lightbox-close]");

    if (!openButton || !lightbox || !closeButton) {
      throw new Error("Missing lightbox controls");
    }

    expect(lightbox.hidden).toBe(true);

    openButton.click();
    expect(lightbox.hidden).toBe(false);
    expect(lightbox.getAttribute("aria-hidden")).toBe("false");

    closeButton.click();
    expect(lightbox.hidden).toBe(true);
    expect(lightbox.getAttribute("aria-hidden")).toBe("true");
  });

  it("opens the inline screenshot lightbox from the hero screenshot", () => {
    setupPage();

    const openButton = document.querySelector<HTMLButtonElement>(".hero__zoom");
    const lightbox = document.querySelector<HTMLElement>("[data-lightbox]");
    const lightboxCaption = document.querySelector<HTMLElement>("[data-lightbox-caption]");

    if (!openButton || !lightbox || !lightboxCaption) {
      throw new Error("Missing hero lightbox controls");
    }

    openButton.click();
    expect(lightbox.hidden).toBe(false);
    expect(lightbox.getAttribute("aria-hidden")).toBe("false");
    expect(lightboxCaption.textContent).toContain("Pkgly repository overview");
  });

  it("uses compressed preview assets inline and keeps the original screenshot for zoom", () => {
    setupPage();

    const heroImage = document.querySelector<HTMLImageElement>(".hero__image");
    const heroZoom = document.querySelector<HTMLButtonElement>(".hero__zoom");
    const demoImage = document.querySelector<HTMLImageElement>(".demo-card__zoom img");
    const demoZoom = document.querySelector<HTMLButtonElement>(".demo-card__zoom");

    expect(heroImage?.getAttribute("src")).toBe(siteContent.hero.screenshot.previewImage);
    expect(heroZoom?.getAttribute("data-zoom-src")).toBe(siteContent.hero.screenshot.image);
    expect(demoImage?.getAttribute("src")).toBe(siteContent.demoCards[0]?.previewImage);
    expect(demoZoom?.getAttribute("data-zoom-src")).toBe(siteContent.demoCards[0]?.image);
  });

  it("toggles between dark and light themes", () => {
    setupPage();

    const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
    const icon = document.querySelector<HTMLElement>("[data-theme-icon]");

    if (!toggle || !icon) {
      throw new Error("Missing theme toggle");
    }

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(icon.getAttribute("data-theme-icon")).toBe("sun");

    toggle.click();
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(icon.getAttribute("data-theme-icon")).toBe("moon");

    toggle.click();
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(icon.getAttribute("data-theme-icon")).toBe("sun");
  });

  it("renders GitHub CTA buttons with the GitHub mark", () => {
    setupPage();

    const githubButtons = document.querySelectorAll(".button--github svg");
    expect(githubButtons.length).toBeGreaterThan(0);
  });

  it("renders all hero CTA buttons with the same card base class", () => {
    setupPage();

    const githubButton = document.querySelector(`a[href="${siteContent.hero.primaryCta.href}"]`);
    const docsButton = document.querySelector(`a[href="${siteContent.hero.docsCta.href}"]`);
    const quickstartButton = document.querySelector(`a[href="${siteContent.hero.quickstartCta.href}"]`);

    expect(githubButton?.className).toContain("button--card");
    expect(docsButton?.className).toContain("button--card");
    expect(quickstartButton?.className).toContain("button--card");
  });

  it("renders docs and quickstart buttons with the same card CTA base class", () => {
    setupPage();

    const docsButton = document.querySelector(`a[href="${siteContent.hero.docsCta.href}"]`);
    const quickstartButton = document.querySelector(`a[href="${siteContent.hero.quickstartCta.href}"]`);

    expect(docsButton?.className).toContain("button--card");
    expect(quickstartButton?.className).toContain("button--card");
  });

  it("renders icons for docs and quickstart hero buttons", () => {
    setupPage();

    const heroButtons = document.querySelectorAll(".hero__actions--hero .button--card .button__icon svg");
    expect(heroButtons.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the animated wordmark asset in the header and footer", () => {
    setupPage();

    const logos = Array.from(document.querySelectorAll<HTMLImageElement>(".wordmark__image"));
    expect(logos.length).toBe(2);

    for (const logo of logos) {
      expect(logo.getAttribute("src")).toBe("/wordmark__image.svg");
    }
  });

  it("keeps the wordmark animation in the SVG asset", () => {
    const wordmarkSvg = readFileSync("public/wordmark__image.svg", "utf8");

    expect(wordmarkSvg).toContain("wordmark-cardboard-flap");
    expect(wordmarkSvg).toContain("@keyframes wordmark-open-left-flap");
    expect(wordmarkSvg).toContain("@keyframes wordmark-open-right-flap");
    expect(wordmarkSvg).not.toContain("wordmark-being");
    expect(wordmarkSvg).not.toContain("@keyframes wordmark-rise");
  });

  it("removes the open source header link and bottom section", () => {
    setupPage();

    expect(document.querySelector(`a[href="#oss"]`)).toBeNull();
    expect(document.querySelector("#oss")).toBeNull();
    expect(document.body.textContent).not.toContain("Star the repo. Read the docs. Ship your own stack");
  });

  it("sets SEO metadata and structured data", () => {
    setupPage();

    expect(document.title).toBe(siteContent.seo.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      siteContent.seo.description,
    );

    const structuredData = document.getElementById("pkgly-structured-data");
    expect(structuredData).not.toBeNull();

    const parsed = JSON.parse(structuredData?.textContent ?? "{}");
    expect(parsed["@type"]).toBe("SoftwareApplication");
    expect(parsed.name).toBe("pkgly");
    expect(parsed.featureList).toContain("Hosted, proxy, and virtual repositories");
    expect(parsed.keywords).toContain("self-hosted package registry");
    expect(parsed.offers.price).toBe("0");
    expect(parsed.softwareHelp.url).toBe(siteContent.hero.docsCta.href);
  });

  it("sets keyword and robots SEO metadata", () => {
    setupPage();

    expect(document.querySelector('meta[name="keywords"]')?.getAttribute("content")).toContain(
      "Artifactory alternative",
    );
    expect(document.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "index, follow",
    );
  });

  it("sets Open Graph meta tags", () => {
    setupPage();

    expect(document.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(
      siteContent.seo.title,
    );
    expect(document.querySelector('meta[property="og:description"]')?.getAttribute("content")).toBe(
      siteContent.seo.description,
    );
    expect(document.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(
      siteContent.seo.url,
    );
    expect(document.querySelector('meta[property="og:type"]')?.getAttribute("content")).toBe(
      "website",
    );
    expect(document.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe(
      siteContent.hero.wordmark,
    );
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute("content")).toBe(
      siteContent.seo.image,
    );
  });

  it("sets Twitter Card meta tags", () => {
    setupPage();

    expect(document.querySelector('meta[name="twitter:card"]')?.getAttribute("content")).toBe(
      "summary_large_image",
    );
    expect(document.querySelector('meta[name="twitter:title"]')?.getAttribute("content")).toBe(
      siteContent.seo.title,
    );
    expect(document.querySelector('meta[name="twitter:description"]')?.getAttribute("content")).toBe(
      siteContent.seo.description,
    );
    expect(document.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(
      siteContent.seo.image,
    );
  });

  it("sets the canonical URL", () => {
    setupPage();

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical).not.toBeNull();
    expect(canonical?.getAttribute("href")).toBe(siteContent.seo.url);
  });
});
