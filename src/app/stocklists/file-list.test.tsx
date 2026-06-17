import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StocklistFileList } from "./file-list";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const NOW = new Date("2026-06-12T12:00:00Z").getTime();

function isoDaysAgo(days: number) {
  return new Date(NOW - days * ONE_DAY_MS).toISOString();
}

const FILES = [
  {
    name: "Cebu 11.06.26 MH.xlsx",
    size: 12_000,
    updatedAt: isoDaysAgo(1),
    url: "/api/stocklists/Cebu%2011.06.26%20MH.xlsx",
  },
  {
    name: "Indonesia freshwater 11.06.26 MH.xlsx",
    size: 18_000,
    updatedAt: isoDaysAgo(3),
    url: "/api/stocklists/Indonesia%20freshwater%2011.06.26%20MH.xlsx",
  },
  {
    name: "Vietnam 04.06.26 MH.xlsx",
    size: 9000,
    updatedAt: isoDaysAgo(9),
    url: "/api/stocklists/Vietnam%2004.06.26%20MH.xlsx",
  },
  {
    name: "Sri Lanka 20.05.26 MH.xlsx",
    size: 7000,
    updatedAt: isoDaysAgo(22),
    url: "/api/stocklists/Sri%20Lanka%2020.05.26%20MH.xlsx",
  },
];

describe("<StocklistFileList />", () => {
  beforeEach(() => {
    // Mock Date.now() rather than vi.useFakeTimers() — userEvent depends on
    // real timers, so faking them breaks click/type interactions.
    vi.spyOn(Date, "now").mockReturnValue(NOW);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("defaults to 'This week' tab and shows only files within 7 days", () => {
    render(<StocklistFileList files={FILES} />);
    expect(screen.getByText("Cebu 11.06.26 MH.xlsx")).toBeInTheDocument();
    expect(
      screen.getByText("Indonesia freshwater 11.06.26 MH.xlsx"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Vietnam 04.06.26 MH.xlsx")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Sri Lanka 20.05.26 MH.xlsx"),
    ).not.toBeInTheDocument();
  });

  it("shows last-week files only on the 'Last week' tab", async () => {
    const user = userEvent.setup();
    render(<StocklistFileList files={FILES} />);
    await user.click(screen.getByRole("button", { name: /last week/i }));
    expect(screen.getByText("Vietnam 04.06.26 MH.xlsx")).toBeInTheDocument();
    expect(
      screen.queryByText("Cebu 11.06.26 MH.xlsx"),
    ).not.toBeInTheDocument();
  });

  it("'All' tab shows everything", async () => {
    const user = userEvent.setup();
    render(<StocklistFileList files={FILES} />);
    await user.click(screen.getByRole("button", { name: /^all/i }));
    expect(screen.getByText("Cebu 11.06.26 MH.xlsx")).toBeInTheDocument();
    expect(screen.getByText("Vietnam 04.06.26 MH.xlsx")).toBeInTheDocument();
    expect(screen.getByText("Sri Lanka 20.05.26 MH.xlsx")).toBeInTheDocument();
  });

  it("filename search filters within the active tab", async () => {
    const user = userEvent.setup();
    render(<StocklistFileList files={FILES} />);
    await user.click(screen.getByRole("button", { name: /^all/i }));
    await user.type(screen.getByPlaceholderText(/search filenames/i), "indonesia");
    expect(
      screen.getByText("Indonesia freshwater 11.06.26 MH.xlsx"),
    ).toBeInTheDocument();
    expect(screen.queryByText("Cebu 11.06.26 MH.xlsx")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Vietnam 04.06.26 MH.xlsx"),
    ).not.toBeInTheDocument();
  });

  it("renders empty state when no files at all", () => {
    render(<StocklistFileList files={[]} />);
    expect(
      screen.getByText(/no stocklists available right now/i),
    ).toBeInTheDocument();
  });

  it("download link uses the proxy URL", () => {
    render(<StocklistFileList files={[FILES[0]]} />);
    const link = screen.getByRole("link", { name: /download/i });
    expect(link).toHaveAttribute(
      "href",
      "/api/stocklists/Cebu%2011.06.26%20MH.xlsx",
    );
    expect(link).toHaveAttribute("download", "Cebu 11.06.26 MH.xlsx");
  });

  it("tab counts reflect file distribution", () => {
    render(<StocklistFileList files={FILES} />);
    const thisWeek = screen.getByRole("button", { name: /this week/i });
    const lastWeek = screen.getByRole("button", { name: /last week/i });
    const older = screen.getByRole("button", { name: /^older/i });
    const all = screen.getByRole("button", { name: /^all/i });
    expect(within(thisWeek).getByText("2")).toBeInTheDocument();
    expect(within(lastWeek).getByText("1")).toBeInTheDocument();
    expect(within(older).getByText("1")).toBeInTheDocument();
    expect(within(all).getByText("4")).toBeInTheDocument();
  });
});
