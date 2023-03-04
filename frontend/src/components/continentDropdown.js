import { Dropdown } from "semantic-ui-react";

const ContinentDropdown = ({ setSelectedContinent }) => {
  const handleContinentSelect = (event, data) => {
    setSelectedContinent(data.value);
  };

  const continentOptions = [
    {
      key: "EU",
      text: "Europe",
      value: "EU",
    },
    {
      key: "NA",
      text: "North America",
      value: "NA",
    },
    {
      key: "SA",
      text: "South America",
      value: "SA",
    },
    {
      key: "AS",
      text: "Asia",
      value: "AS",
    },
    {
      key: "AF",
      text: "Africa",
      value: "AF",
    },
    {
      key: "OC",
      text: "Oceania",
      value: "OC",
    },
  ];
  return (
    <div className="dropdownContainer">
      <Dropdown
        placeholder="Select a Continent"
        selection
        options={continentOptions}
        onChange={handleContinentSelect}
      />
    </div>
  );
};

export default ContinentDropdown;
