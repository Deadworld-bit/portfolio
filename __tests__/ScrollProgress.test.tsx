/**
 * Tests for components/ScrollProgress.tsx
 * A11y fix: useReducedMotion hook used — raw scrollYProgress when reduced motion
 * is preferred, spring-smoothed value otherwise.
 */
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

// ---------------------------------------------------------------------------
// Framer Motion mock
// ---------------------------------------------------------------------------
const mockScrollYProgress = { current: 0 };
let mockPrefersReducedMotion = false;

// Capture what scaleX value was passed to motion.div
let capturedScaleX: unknown = undefined;

jest.mock("framer-motion", () => {
  const springValue = { __type: "spring" };

  return {
    useScroll: () => ({ scrollYProgress: mockScrollYProgress }),
    useSpring: (value: unknown) => springValue,
    useReducedMotion: () => mockPrefersReducedMotion,
    motion: {
      div: ({
        style,
        ...rest
      }: React.HTMLAttributes<HTMLDivElement> & { style?: { scaleX: unknown } }) => {
        capturedScaleX = style?.scaleX;
        return <div style={{}} {...rest} />;
      },
    },
  };
});

// Import AFTER mock is set up.
import ScrollProgress from "../components/ScrollProgress";

describe("ScrollProgress", () => {
  beforeEach(() => {
    capturedScaleX = undefined;
    mockPrefersReducedMotion = false;
  });

  it("should render a single fixed progress bar element", () => {
    const { container } = render(<ScrollProgress />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should mark the progress bar as aria-hidden so screen readers ignore it", () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.firstChild as HTMLElement;
    expect(bar).toHaveAttribute("aria-hidden");
  });

  it("should apply the spring-smoothed scaleX when reduced motion is not preferred", () => {
    mockPrefersReducedMotion = false;
    render(<ScrollProgress />);
    // The spring sentinel object (not the raw progress ref) should be used.
    expect(capturedScaleX).toEqual({ __type: "spring" });
  });

  it("should use the raw scrollYProgress scaleX when prefers-reduced-motion is set", () => {
    mockPrefersReducedMotion = true;
    render(<ScrollProgress />);
    // Raw motion value (mockScrollYProgress) should be passed, not the spring.
    expect(capturedScaleX).toBe(mockScrollYProgress);
  });

  it("should apply origin-left so the bar grows from the left edge", () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.firstChild as HTMLElement;
    expect(bar.className).toMatch(/origin-left/);
  });

  it("should be fixed-positioned at the top of the viewport", () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.firstChild as HTMLElement;
    expect(bar.className).toMatch(/fixed/);
    expect(bar.className).toMatch(/top-0/);
  });

  it("should have a high z-index so it appears above page content", () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.firstChild as HTMLElement;
    expect(bar.className).toMatch(/z-\[70\]/);
  });
});
