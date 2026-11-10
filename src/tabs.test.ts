// ABOUTME: Tests keyboard navigation boundaries for the product screenshot tabs.
// ABOUTME: Protects wrapping, direct navigation, and unrelated keyboard input.
import { describe, expect, it } from "vitest";
import { getTabIndex } from "./tabs";

describe("getTabIndex", () => {
  it.each([
    ["ArrowRight", 0, 3, 1],
    ["ArrowRight", 2, 3, 0],
    ["ArrowLeft", 0, 3, 2],
    ["ArrowLeft", 2, 3, 1],
    ["Home", 2, 3, 0],
    ["End", 0, 3, 2],
    ["ArrowRight", 0, 1, 0],
    ["Tab", 1, 3, null],
    ["ArrowDown", 1, 3, null],
  ])("handles %s from tab %i of %i", (key, current, count, expected) => {
    expect(getTabIndex(key, current, count)).toBe(expected);
  });
});
