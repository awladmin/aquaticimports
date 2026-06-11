import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PrivacyPage from "./page";

describe("<PrivacyPage />", () => {
  it("renders the heading and date", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /privacy policy/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/^last updated:/i)).toBeInTheDocument();
  });

  it("includes the data controller registered address", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/Unit 2 Trident Industrial Estate/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Company registration 381 4274/)).toBeInTheDocument();
  });

  it("lists the user's UK GDPR rights", () => {
    render(<PrivacyPage />);
    expect(
      screen.getByText(/ask for a copy of the personal data/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/ask us to delete your account/i)).toBeInTheDocument();
    expect(
      screen.getByText(/lodge a complaint with the information commissioner/i),
    ).toBeInTheDocument();
  });

  it("links to the ICO website", () => {
    render(<PrivacyPage />);
    const ico = screen.getByRole("link", { name: /ico\.org\.uk/i });
    expect(ico).toHaveAttribute("href", "https://ico.org.uk");
    expect(ico).toHaveAttribute("target", "_blank");
    expect(ico).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("provides a contact email for data requests", () => {
    render(<PrivacyPage />);
    const links = screen.getAllByRole("link", {
      name: /info@aquaticimports\.com/i,
    });
    expect(links[0]).toHaveAttribute(
      "href",
      "mailto:info@aquaticimports.com",
    );
  });

  it("cross-links to the terms page", () => {
    render(<PrivacyPage />);
    const terms = screen.getByRole("link", { name: /terms and conditions/i });
    expect(terms).toHaveAttribute("href", "/terms");
  });
});
