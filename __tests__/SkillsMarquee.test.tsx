/**
 * Tests for components/SkillsMarquee.tsx
 * A11y fix: swapped icon imports; sr-only list added for screen-reader access.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkillsMarquee from "../components/SkillsMarquee";

// react-icons render SVGs; stub them to plain spans so JSDOM doesn't choke.
jest.mock("react-icons/fa", () => ({
  FaUnity: () => <span data-testid="icon-unity" />,
  FaReact: () => <span data-testid="icon-react" />,
  FaGitAlt: () => <span data-testid="icon-git" />,
  FaFigma: () => <span data-testid="icon-figma" />,
  FaCss3Alt: () => <span data-testid="icon-css3" />,
  FaHtml5: () => <span data-testid="icon-html5" />,
  FaDatabase: () => <span data-testid="icon-database" />,
}));

jest.mock("react-icons/si", () => ({
  SiNextdotjs: () => <span data-testid="icon-nextjs" />,
  SiTypescript: () => <span data-testid="icon-typescript" />,
  SiTailwindcss: () => <span data-testid="icon-tailwind" />,
  SiFramer: () => <span data-testid="icon-framer" />,
  SiJavascript: () => <span data-testid="icon-javascript" />,
  SiDotnet: () => <span data-testid="icon-dotnet" />,
  SiSharp: () => <span data-testid="icon-csharp" />,
  SiPostgresql: () => <span data-testid="icon-postgresql" />,
}));

describe("SkillsMarquee", () => {
  it("should render the section landmark with accessible label", () => {
    render(<SkillsMarquee />);
    const section = screen.getByRole("region", { name: /tech stack/i });
    expect(section).toBeInTheDocument();
  });

  it("should render a visually-hidden list for screen readers with every skill name", () => {
    render(<SkillsMarquee />);
    // The sr-only <ul> must contain each unique skill exactly once.
    const srList = document.querySelector(".sr-only");
    expect(srList).toBeInTheDocument();

    const expectedSkills = [
      "Unity", "C#", "Next.js", "React", "TypeScript", "JavaScript",
      "Tailwind CSS", "Framer Motion", ".NET", "SQL Server", "PostgreSQL",
      "HTML5", "CSS3", "Git", "Figma",
    ];

    expectedSkills.forEach((name) => {
      // Each name appears in the sr-only list (queryAllByText returns all matches).
      const items = Array.from(srList!.querySelectorAll("li")).map(
        (el) => el.textContent
      );
      expect(items).toContain(name);
    });
  });

  it("should hide the animated marquee list from assistive technology", () => {
    render(<SkillsMarquee />);
    const marqueeList = document.querySelector('[aria-hidden="true"]');
    expect(marqueeList).toBeInTheDocument();
  });

  it("should duplicate skill items in the marquee list for seamless looping", () => {
    render(<SkillsMarquee />);
    const marqueeList = document.querySelector('[aria-hidden="true"]');
    const items = marqueeList!.querySelectorAll("li");
    // 15 skills × 2 duplicates = 30 items.
    expect(items).toHaveLength(30);
  });

  it("should apply the animate-marquee CSS class to the marquee list", () => {
    render(<SkillsMarquee />);
    const marqueeList = document.querySelector('[aria-hidden="true"]');
    expect(marqueeList).toHaveClass("animate-marquee");
  });

  it("should render every skill icon inside the marquee", () => {
    render(<SkillsMarquee />);
    // Each of the 15 unique skills appears twice; spot-check icon presence.
    expect(document.querySelectorAll('[data-testid="icon-unity"]')).toHaveLength(2);
    expect(document.querySelectorAll('[data-testid="icon-csharp"]')).toHaveLength(2);
    expect(document.querySelectorAll('[data-testid="icon-figma"]')).toHaveLength(2);
  });

  it("should render skill names visible inside marquee items", () => {
    render(<SkillsMarquee />);
    // getAllByText returns nodes across both the marquee (×2) and sr-only (×1).
    const reactItems = screen.getAllByText("React");
    // marquee duplicates (2) + sr-only (1) = 3 total.
    expect(reactItems.length).toBeGreaterThanOrEqual(2);
  });

  it("should apply the marquee-mask class to the scroll container", () => {
    render(<SkillsMarquee />);
    expect(document.querySelector(".marquee-mask")).toBeInTheDocument();
  });
});
