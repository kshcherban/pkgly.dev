// ABOUTME: Tests the landing-page hierarchy, comparison semantics, and browser UI state.
// ABOUTME: Keeps the conversion path and accessible controls aligned with pkgly content.
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
  it("prioritizes the inline quickstart over secondary hero actions", () => {
    setupPage();

    const actions = Array.from(document.querySelectorAll(".hero__actions--hero a"));
    expect(actions.map((action) => action.getAttribute("href"))).toEqual([
      "#quickstart",
      siteContent.hero.docsCta.href,
      siteContent.hero.primaryCta.href,
    ]);
    expect(actions[0]?.className).toContain("button--primary");
  });

  it("places quickstart before product proof and comparison", () => {
    setupPage();

    const quickstart = document.querySelector("#quickstart");
    const demo = document.querySelector("#product-demo");
    const comparison = document.querySelector("#comparison");

    expect(quickstart?.compareDocumentPosition(demo as Node)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(demo?.compareDocumentPosition(comparison as Node)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it("reserves space for demo screenshots before they load", () => {
    setupPage();

    const images = Array.from(document.querySelectorAll<HTMLImageElement>(".demo-card__zoom img"));
    expect(images).toHaveLength(siteContent.demoCards.length);

    for (const image of images) {
      expect(image.getAttribute("width")).not.toBeNull();
      expect(image.getAttribute("height")).not.toBeNull();
    }
  });

  it("uses a concise comparison with disclosure details and visual availability marks", () => {
    setupPage();

    const comparison = document.querySelector("#comparison");
    const details = comparison?.querySelector("details");
    const marks = comparison?.querySelectorAll(".comparison-mark");

    expect(details).not.toBeNull();
    expect(details?.open).toBe(false);
    expect(marks?.length).toBeGreaterThan(0);
    expect(Array.from(marks ?? []).every((mark) => mark.getAttribute("aria-label"))).toBe(true);
    expect(comparison?.textContent).toContain("Starts at $27,000/year");
  });

  it("normalizes repository-mode language across competitors", () => {
    setupPage();

    const row = Array.from(document.querySelectorAll(".comparison-table tr")).find((candidate) =>
      candidate.textContent?.includes("Repository modes"),
    );

    expect(row?.textContent).toContain("Hosted, proxy, virtual");
    expect(row?.textContent).not.toContain("Local, remote, virtual");
    expect(row?.textContent).not.toContain("Hosted, proxy, group");
  });

  it("renders a native dialog for screenshot previews", () => {
    setupPage();

    const dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]");
    expect(dialog?.tagName).toBe("DIALOG");
    expect(dialog?.getAttribute("aria-label")).toBe("Screenshot preview");
  });

  it("renders the hero headline, package families, benchmark, and architecture", () => {
    setupPage();

    expect(document.querySelector("h1")?.textContent).toBe("Self-hosted package registry");
    expect(document.body.textContent).toContain("200 RPS");
    expect(document.body.textContent).toContain("Rust app");
    expect(document.body.textContent).toContain("PostgreSQL");

    for (const packageType of siteContent.packageTypes) {
      expect(document.body.textContent).toContain(packageType);
    }
  });

  it("toggles between dark and light themes", () => {
    setupPage();

    const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
    if (!toggle) {
      throw new Error("Missing theme toggle");
    }

    expect(document.documentElement.dataset.theme).toBe("dark");
    toggle.click();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("keeps the animated wordmark asset in use", () => {
    setupPage();

    expect(document.querySelectorAll(".wordmark__image")).toHaveLength(2);
    const wordmarkSvg = readFileSync("public/wordmark__image.svg", "utf8");
    expect(wordmarkSvg).toContain("flap-back-left");
    expect(wordmarkSvg).toContain("repeatCount=\"indefinite\"");
  });

  it("sets SEO metadata and structured data", () => {
    setupPage();

    expect(document.title).toBe(siteContent.seo.title);
    expect(document.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      siteContent.seo.description,
    );

    const structuredData = document.getElementById("pkgly-structured-data");
    const parsed = JSON.parse(structuredData?.textContent ?? "{}");
    expect(parsed["@type"]).toBe("SoftwareApplication");
    expect(parsed.offers.price).toBe("0");
  });
});
