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

describe("App component", () => {
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
    const searchMessage = screen.getByText(
      "Please select a continent from the drop-down menu to view the top 5 urban areas in that continent based on their Teleport Score."
    );
    expect(searchMessage).toBeInTheDocument();
  });

  it("renders a loading message when fetching data", async () => {
    render(<App />);
    const asiaOption = screen.getByText("Asia");
    fireEvent.click(asiaOption);
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
    await waitFor(() => expect(loadingMessage).not.toBeInTheDocument());
  });

  it("renders the urban areas table when a continent is selected", async () => {
    render(<App />);
    const africaOption = screen.getByText("Europe");
    fireEvent.click(africaOption);
    const tableRows = await screen.findAllByRole("row");
    expect(tableRows).toHaveLength(3);
  });
});
