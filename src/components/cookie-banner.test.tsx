import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieBanner } from "./cookie-banner";

const STORAGE_KEY = "ai-cookie-acknowledged";

describe("<CookieBanner />", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("shows when the user hasn't acknowledged", async () => {
    render(<CookieBanner />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByText(/essential cookies to keep you signed in/i),
    ).toBeInTheDocument();
  });

  it("links to the privacy policy", async () => {
    render(<CookieBanner />);
    await screen.findByRole("dialog");
    const link = screen.getByRole("link", { name: /privacy policy/i });
    expect(link).toHaveAttribute("href", "/privacy");
  });

  it("does not show when localStorage already has the acknowledgement", () => {
    localStorage.setItem(STORAGE_KEY, "1");
    render(<CookieBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("dismisses when OK is clicked and persists the choice", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: /ok/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
  });

  it("dismisses when the × is clicked", async () => {
    const user = userEvent.setup();
    render(<CookieBanner />);
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: /dismiss/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEY)).toBe("1");
  });

  it("stays dismissed across remounts", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<CookieBanner />);
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: /ok/i }));
    unmount();
    render(<CookieBanner />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
