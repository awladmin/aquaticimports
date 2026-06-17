import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UploadZone } from "./upload-zone";

const uploadMock = vi.hoisted(() => vi.fn());
const refreshMock = vi.hoisted(() => vi.fn());

vi.mock("@/lib/supabase/client", () => ({
  createClient: () => ({
    storage: {
      from: vi.fn().mockReturnValue({ upload: uploadMock }),
    },
  }),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ refresh: refreshMock }),
}));

function mkFile(name: string) {
  return new File(["payload"], name, {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

beforeEach(() => {
  uploadMock.mockReset();
  refreshMock.mockReset();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("<UploadZone />", () => {
  it("uploads multiple picked files sequentially and clears the queue on success", async () => {
    uploadMock.mockResolvedValue({ error: null });
    const user = userEvent.setup();
    render(<UploadZone />);

    const picker = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(picker, [
      mkFile("Cebu 17.06.26 MH.xlsx"),
      mkFile("Indonesia 17.06.26 MH.xlsx"),
      mkFile("Vietnam 17.06.26 MH.xlsx"),
      mkFile("Sri Lanka 17.06.26 MH.xlsx"),
    ]);

    expect(screen.getByText(/ready to upload/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /upload 4 files/i }));

    expect(uploadMock).toHaveBeenCalledTimes(4);
    expect(uploadMock.mock.calls[0][0]).toBe("Cebu 17.06.26 MH.xlsx");
    expect(uploadMock.mock.calls[3][0]).toBe("Sri Lanka 17.06.26 MH.xlsx");
    expect(refreshMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/ready to upload/i)).not.toBeInTheDocument();
  });

  it("keeps failed files in the queue and surfaces per-file errors", async () => {
    uploadMock
      .mockResolvedValueOnce({ error: null })
      .mockResolvedValueOnce({ error: { message: "quota exceeded" } })
      .mockResolvedValueOnce({ error: null });
    const user = userEvent.setup();
    render(<UploadZone />);

    const picker = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    await user.upload(picker, [
      mkFile("ok-1.xlsx"),
      mkFile("bad.xlsx"),
      mkFile("ok-2.xlsx"),
    ]);

    await user.click(screen.getByRole("button", { name: /upload 3 files/i }));

    expect(uploadMock).toHaveBeenCalledTimes(3);
    expect(screen.getByText(/quota exceeded/i)).toBeInTheDocument();
    expect(screen.getByText("bad.xlsx")).toBeInTheDocument();
    expect(screen.queryByText("ok-1.xlsx")).not.toBeInTheDocument();
    expect(screen.queryByText("ok-2.xlsx")).not.toBeInTheDocument();
    expect(refreshMock).toHaveBeenCalledTimes(1);
  });

  it("does nothing when the picker is empty and the upload button is clicked", async () => {
    const user = userEvent.setup();
    render(<UploadZone />);
    const button = screen.getByRole("button", { name: /^upload$/i });
    expect(button).toBeDisabled();
    await user.click(button);
    expect(uploadMock).not.toHaveBeenCalled();
  });

  it("upload button label matches the queue size", async () => {
    const user = userEvent.setup();
    render(<UploadZone />);
    const picker = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;

    await user.upload(picker, [mkFile("only.xlsx")]);
    expect(
      screen.getByRole("button", { name: /^upload$/i }),
    ).toBeInTheDocument();

    await user.upload(picker, [mkFile("a.xlsx"), mkFile("b.xlsx")]);
    expect(
      screen.getByRole("button", { name: /upload 2 files/i }),
    ).toBeInTheDocument();
  });
});
