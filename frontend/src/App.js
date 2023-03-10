import React, { useState, useEffect } from "react";
import ContinentDropdown from "./components/continentDropdown/continentDropdown";
import UrbanAreas from "./components/urbanAreas/urbanAreas";

function App() {
  const [urbanAreas, setUrbanAreas] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedContinent) {
      setIsLoading(true);
      setError(null);
      fetch(`http://localhost:4000/${selectedContinent}`)
        .then((response) => response.json())
        .then((data) => {
          setUrbanAreas(data);
          setSearched(true);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
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
        error={error}
      />
    </div>
  );
}

export default App;
