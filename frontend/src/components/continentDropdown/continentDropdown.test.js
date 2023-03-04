import { render, fireEvent, screen } from "@testing-library/react";
import ContinentDropdown from "./ContinentDropdown";

describe("ContinentDropdown", () => {
  describe("should call setSelectedContinent when a continent is selected", () => {
    it("should call setSelectedContinent with EU when Europe selected", () => {
      const setSelectedContinent = jest.fn();
      render(<ContinentDropdown setSelectedContinent={setSelectedContinent} />);
      const europeOption = screen.getByText("Europe");
      fireEvent.click(europeOption);
      expect(setSelectedContinent).toHaveBeenCalledWith("EU");
    });

    it("should call setSelectedContinent with AS when Asia selected", () => {
      const setSelectedContinent = jest.fn();
      render(<ContinentDropdown setSelectedContinent={setSelectedContinent} />);
      const asiaOption = screen.getByText("Asia");
      fireEvent.click(asiaOption);
      expect(setSelectedContinent).toHaveBeenCalledWith("AS");
    });
  });

  it("should render a dropdown with continent options", () => {
    render(<ContinentDropdown />);
    const dropdownOptions = screen.getAllByRole("option");
    expect(dropdownOptions).toHaveLength(6);
  });
});
