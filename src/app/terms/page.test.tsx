import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TermsPage from "./page";

describe("<TermsPage />", () => {
  it("renders the heading and date", () => {
    render(<TermsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /terms and conditions/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^last updated:/i)).toBeInTheDocument();
  });

  it("declares the trade-only restriction", () => {
    render(<TermsPage />);
    expect(
      screen.getByText(/we do not sell directly to retail consumers/i),
    ).toBeInTheDocument();
  });

  it("includes the E&OE / stocklist accuracy line", () => {
    render(<TermsPage />);
    expect(screen.getByText(/errors and omissions excepted/i)).toBeInTheDocument();
  });

  it("sets governing law as England and Wales", () => {
    render(<TermsPage />);
    expect(
      screen.getByText(/governed by the law of england and wales/i),
    ).toBeInTheDocument();
  });

  it("preserves liability for death, injury, and fraud", () => {
    render(<TermsPage />);
    expect(
      screen.getByText(/limits our liability for death or personal injury/i),
    ).toBeInTheDocument();
  });

  it("cross-links to the privacy policy", () => {
    render(<TermsPage />);
    const privacy = screen.getByRole("link", { name: /privacy policy/i });
    expect(privacy).toHaveAttribute("href", "/privacy");
  });

  it("links to the contact page", () => {
    render(<TermsPage />);
    const contact = screen.getByRole("link", { name: /contact page/i });
    expect(contact).toHaveAttribute("href", "/contact");
  });
});
