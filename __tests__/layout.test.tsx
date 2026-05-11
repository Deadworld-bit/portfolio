/**
 * Tests for app/layout.tsx
 * A11y fix: Footer moved outside <main> so it is no longer a child of the
 * main landmark — correct semantic structure per ARIA spec.
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// ---------------------------------------------------------------------------
// Stubs for Next.js / child components that don't need real implementations.
// ---------------------------------------------------------------------------
jest.mock("next/font/google", () => ({
  Manrope: () => ({ variable: "--font-manrope", className: "manrope" }),
  Space_Grotesk: () => ({
    variable: "--font-space-grotesk",
    className: "space-grotesk",
  }),
}));

jest.mock("@/components/Navbar", () => () => (
  <nav data-testid="navbar">Navbar</nav>
));
jest.mock("@/components/Footer", () => () => (
  <footer data-testid="footer">Footer</footer>
));
jest.mock("@/components/ScrollProgress", () => () => (
  <div data-testid="scroll-progress" />
));

// Import the default export (RootLayout) after mocks.
import RootLayout from "../app/layout";

// next/font injects CSS vars; suppress the font loading in tests.
jest.mock("../app/globals.css", () => ({}), { virtual: true });

describe("RootLayout", () => {
  function renderLayout(children: React.ReactNode = <p>page content</p>) {
    // RootLayout returns <html>, which cannot be nested inside a <div>.
    // Render directly and inspect the document body.
    return render(<RootLayout>{children}</RootLayout>);
  }

  it("should render children inside a main element", () => {
    renderLayout(<p>hello world</p>);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveTextContent("hello world");
  });

  it("should render Footer outside the main element", () => {
    renderLayout();
    const main = screen.getByRole("main");
    const footer = screen.getByTestId("footer");
    expect(main).not.toContainElement(footer);
  });

  it("should render the Navbar", () => {
    renderLayout();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("should render the ScrollProgress component", () => {
    renderLayout();
    expect(screen.getByTestId("scroll-progress")).toBeInTheDocument();
  });

  it("should set lang=en on the html element", () => {
    renderLayout();
    // RTL wraps in a div; find the html element via DOM.
    const html = document.documentElement;
    expect(html).toHaveAttribute("lang", "en");
  });

  it("should not render children inside the footer", () => {
    renderLayout(<span data-testid="page-child">content</span>);
    const footer = screen.getByTestId("footer");
    expect(footer).not.toContainElement(screen.getByTestId("page-child"));
  });
});
