import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

const mockUrbanAreas = [
  {
    name: "London",
    score: 85,
    summary: "UK Capitol",
  },
  {
    name: "Brighton",
    score: 90,
    summary: "A city in the UK",
  },
];

describe("App", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockUrbanAreas),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("initially renders a drop down and intro message", () => {
    render(<App />);
    const continentDropdown = screen.getByRole("listbox");
    expect(continentDropdown).toBeInTheDocument();
    const introMessage = screen.getByText(
      "Please select a continent from the drop-down menu to view the top 5 urban areas in that continent based on their Teleport Score."
    );
    expect(introMessage).toBeInTheDocument();
  });

  it("renders a loading message when fetching data", async () => {
    render(<App />);
    const europeOption = screen.getByText("Europe");
    fireEvent.click(europeOption);
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
    await waitFor(() => expect(loadingMessage).not.toBeInTheDocument());
  });

  it("renders the urban areas table when a continent is selected", async () => {
    render(<App />);
    const europeOption = screen.getByText("Europe");
    fireEvent.click(europeOption);
    const tableRows = await screen.findAllByRole("row");
    expect(tableRows).toHaveLength(3);
  });

  describe("error handling", () => {
    it("renders error message when fetch request fails", async () => {
      jest
        .spyOn(global, "fetch")
        .mockRejectedValue(new Error("Failed to fetch"));
      render(<App />);
      const europeOption = screen.getByText("Europe");
      fireEvent.click(europeOption);
      const errorMessage = await screen.findByText("Failed to fetch");
      expect(errorMessage).toBeInTheDocument();
    });

    it("clears the error message when a new continent is selected", async () => {
      jest
        .spyOn(global, "fetch")
        .mockRejectedValue(new Error("Failed to fetch"));
      render(<App />);
      const europeOption = screen.getByText("Europe");
      fireEvent.click(europeOption);
      const errorMessage = await screen.findByText("Failed to fetch");
      jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockUrbanAreas),
      });
      expect(errorMessage).toBeInTheDocument();
      const africaOption = screen.getByText("Africa");
      fireEvent.click(africaOption);
      await waitFor(() => expect(errorMessage).not.toBeInTheDocument());
    });
  });
});
