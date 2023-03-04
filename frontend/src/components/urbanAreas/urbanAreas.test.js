import { render, screen } from "@testing-library/react";
import UrbanAreas from "./UrbanAreas";

describe("UrbanAreas", () => {
  it("renders instruction message when searched is false", () => {
    render(<UrbanAreas searched={false} />);
    const introMessage = screen.getByText(
      "Please select a continent from the drop-down menu to view the top 5 urban areas in that continent based on their Teleport Score."
    );
    expect(introMessage).toBeInTheDocument();
  });

  it("renders loading message when loading is true", () => {
    render(<UrbanAreas loading={true} />);
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("renders table when urbanAreas array is not empty", () => {
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
    render(<UrbanAreas urbanAreas={mockUrbanAreas} searched={true}/>);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();

    const tableHeadings = screen.getAllByRole("columnheader");
    expect(tableHeadings).toHaveLength(3);
    expect(tableHeadings[0]).toHaveTextContent("Name");
    expect(tableHeadings[1]).toHaveTextContent("Score");
    expect(tableHeadings[2]).toHaveTextContent("Summary");

    const tableRows = screen.getAllByRole("row");
    expect(tableRows).toHaveLength(3);
    expect(tableRows[1]).toHaveTextContent("London");
    expect(tableRows[1]).toHaveTextContent("85");
    expect(tableRows[1]).toHaveTextContent("UK Capitol");
    expect(tableRows[2]).toHaveTextContent("Brighton");
    expect(tableRows[2]).toHaveTextContent("90");
    expect(tableRows[2]).toHaveTextContent("A city in the UK");
  });
});
