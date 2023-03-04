import React, { useState, useEffect } from "react";
import ContinentDropdown from "./components/continentDropdown/continentDropdown";
import UrbanAreas from "./components/urbanAreas/urbanAreas";

function App() {
  const [urbanAreas, setUrbanAreas] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (selectedContinent) {
      setIsLoading(true);
      fetch(`http://localhost:4000/${selectedContinent}`)
        .then((response) => response.json())
        .then((data) => {
          setUrbanAreas(data);
          setIsLoading(false);
          setSearched(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedContinent]);

  return (
    <div>
      <ContinentDropdown setSelectedContinent={setSelectedContinent} />
      <UrbanAreas
        urbanAreas={urbanAreas}
        loading={loading}
        searched={searched}
      />
    </div>
  );
}

export default App;
