/**
 * Tests for app/globals.css
 * A11y fix: @media (prefers-reduced-motion: reduce) block added that sets
 * animation: none on .animate-marquee.
 *
 * CSS cannot be executed in Jest/JSDOM, so these tests verify the raw source
 * text contains the required declarations — a reliable contract test for the
 * stylesheet rules that were the subject of the a11y fix.
 */
import fs from "fs";
import path from "path";

const CSS_PATH = path.resolve(__dirname, "../app/globals.css");
const css = fs.readFileSync(CSS_PATH, "utf-8");

describe("globals.css — prefers-reduced-motion", () => {
  it("should define the marquee keyframe animation", () => {
    expect(css).toMatch(/@keyframes\s+marquee/);
  });

  it("should apply animate-marquee animation by default", () => {
    expect(css).toMatch(/\.animate-marquee\s*\{[^}]*animation:\s*marquee/s);
  });

  it("should include a prefers-reduced-motion media query", () => {
    expect(css).toMatch(
      /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/
    );
  });

  it("should set animation to none inside the reduced-motion block", () => {
    // Extract everything inside the prefers-reduced-motion block.
    const reducedMotionBlock =
      css.match(
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{([\s\S]*?)\}/
      )?.[1] ?? "";

    expect(reducedMotionBlock).toMatch(/animation\s*:\s*none/);
  });

  it("should target .animate-marquee inside the reduced-motion block", () => {
    const reducedMotionBlock =
      css.match(
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)\s*\{([\s\S]*?)\}/
      )?.[1] ?? "";

    expect(reducedMotionBlock).toMatch(/\.animate-marquee/);
  });

  it("should define custom color tokens in @theme", () => {
    expect(css).toMatch(/@theme\s*\{/);
    expect(css).toMatch(/--color-night-navy/);
    expect(css).toMatch(/--color-chill-teal/);
  });

  it("should define the marquee-mask utility with mask-image", () => {
    expect(css).toMatch(/\.marquee-mask/);
    expect(css).toMatch(/mask-image/);
  });

  it("should define scrollbar-hide utility", () => {
    expect(css).toMatch(/\.scrollbar-hide/);
  });
});
