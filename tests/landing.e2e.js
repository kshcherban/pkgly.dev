// ABOUTME: Exercises the built landing page in a real browser through Playwright.
// ABOUTME: Checks responsive layout, screenshot navigation, theme persistence, and clipboard use.
async (page) => {
  const base = "http://127.0.0.1:4173";
  const check = (condition, message) => { if (!condition) throw new Error(message); };
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto(base);
  check(await page.getByRole("tab").count() === 4, "Demo and three product views must be available");
  const demoImage = page.locator('[role="tabpanel"]:visible img');
  await demoImage.scrollIntoViewIfNeeded();
  await demoImage.evaluate(image => image.decode());
  check(await demoImage.evaluate(image => image.naturalWidth === 1120 && image.naturalHeight === 700), "Registry animation must load at its native dimensions");
  const icons = page.locator(".package-strip img");
  check(await icons.count() === 11, "Every package format must show a technology icon");
  for (const icon of await icons.all()) {
    await icon.scrollIntoViewIfNeeded();
    await icon.evaluate(image => image.decode());
    check(await icon.evaluate(image => image.naturalWidth > 0 && new URL(image.src).origin === location.origin), "Technology icons must load locally");
  }

  const layouts = [];
  for (const width of [320, 390, 768, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      contentWidth: document.documentElement.scrollWidth,
      actionBottom: document.querySelector(".hero [data-copy-terminal]").getBoundingClientRect().bottom,
      commandWidth: document.querySelector(".install-command pre").clientWidth,
      commandContentWidth: document.querySelector(".install-command pre").scrollWidth,
      height: document.documentElement.scrollHeight,
    }));
    check(layout.contentWidth <= width, `Page overflows at ${width}px`);
    check(layout.commandContentWidth <= layout.commandWidth, `Install command is clipped at ${width}px`);
    for (const selector of [".site-header .wordmark", ".site-footer__brand"]) {
      check(await page.locator(selector).innerText() === "pkgly", `Brand name must remain visible at ${width}px`);
    }
    if (width >= 1280) check(layout.actionBottom <= 800, `Hero action below fold at ${width}px`);
    layouts.push(layout);
  }

  await page.setViewportSize({ width: 1280, height: 800 });
  const admin = page.getByRole("tab", { name: "Admin", exact: true });
  await admin.click();
  check(await admin.getAttribute("aria-selected") === "true", "Clicked tab must be selected");
  await admin.press("ArrowRight");
  check(await page.getByRole("tab", { name: "Demo", exact: true }).evaluate(e => e === document.activeElement), "Arrow key must wrap focus");
  await page.getByRole("tab", { name: "Demo", exact: true }).press("End");
  check(await admin.evaluate(e => e === document.activeElement), "End must focus the final tab");

  const zoom = page.locator('[role="tabpanel"]:visible [data-zoom-src]');
  await zoom.click();
  check(await page.getByRole("dialog").isVisible(), "Screenshot dialog must open");
  await page.keyboard.press("Escape");
  check(!await page.getByRole("dialog").isVisible(), "Escape must dismiss screenshot");
  check(await zoom.evaluate(e => e === document.activeElement), "Dialog must restore focus");

  const beforeTheme = await page.locator("html").getAttribute("data-theme");
  await page.locator("[data-theme-toggle]").click();
  await page.reload();
  check(await page.locator("html").getAttribute("data-theme") !== beforeTheme, "Theme choice must persist after reload");
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  const heroCopy = page.getByRole("button", { name: "Copy install command", exact: true });
  await heroCopy.focus();
  await heroCopy.press("Enter");
  await page.locator('.hero [data-copy-status]').filter({ hasText: "Commands copied" }).waitFor({ state: "attached" });
  check(await page.evaluate(() => navigator.clipboard.readText()) === "curl -fsSL https://pkgly.dev/install.sh | bash", "Hero copy button must copy the installer");
  check(await page.locator('#quickstart [data-copy-status]').innerText() === "", "Hero copy feedback must stay in the hero");
  await heroCopy.waitFor({ state: "visible" });
  check(await heroCopy.innerText() === "Copy", "Hero copy button must restore its label after feedback");
  await page.getByRole("link", { name: "Quickstart", exact: true }).first().click();
  check(new URL(page.url()).hash === "#quickstart", "Navigation must reach the closing quickstart");
  await page.locator("#quickstart .terminal__body").scrollIntoViewIfNeeded();
  const prompt = await page.locator("#quickstart .terminal__prompt").boundingBox();
  const command = await page.locator("#quickstart .terminal__cmd").boundingBox();
  check(prompt && command, "Quickstart command must be visible");
  await page.mouse.move(command.x + command.width, command.y + command.height / 2);
  await page.mouse.down();
  await page.mouse.move(prompt.x + 1, prompt.y + prompt.height / 2, { steps: 12 });
  await page.mouse.up();
  const selectedCommand = await page.evaluate(() => window.getSelection().toString());
  check(selectedCommand === "curl -fsSL https://pkgly.dev/install.sh | bash", "Selecting commands must include the installer and exclude decorative shell prompts");
  check(!selectedCommand.includes("%"), "Shell prompts must not be selectable");
  await page.evaluate(() => window.getSelection().removeAllRanges());
  await page.getByRole("button", { name: "Copy commands", exact: true }).click();
  await page.locator('#quickstart [data-copy-status]').filter({ hasText: "Commands copied" }).waitFor({ state: "attached" });
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  check(copied === "curl -fsSL https://pkgly.dev/install.sh | bash", "Clipboard must contain the exact installer command");
  const installer = await page.request.get(`${base}/install.sh`);
  check(installer.ok(), "Installer must be served from the site root");
  check((await installer.text()).startsWith("#!/usr/bin/env bash\n"), "Installer URL must serve the Bash script");
  await page.locator("#comparison summary").click();
  check(await page.locator(".comparison-table").isVisible(), "Comparison disclosure must reveal details");
  check(errors.length === 0, `Browser errors: ${errors.join(", ")}`);
  return { passed: true, layouts, browserErrors: errors };
}
