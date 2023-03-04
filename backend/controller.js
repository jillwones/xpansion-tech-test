const fetchUrbanAreas = async (id) => {
  const urbanAreasUrl = `https://api.teleport.org/api/continents/geonames%3A${id}/urban_areas/`;
  const urbanAreasResponse = await fetch(urbanAreasUrl);
  const urbanAreasData = await urbanAreasResponse.json();
  return urbanAreasData["_links"]["ua:items"];
};

const fetchUrbanAreaDetails = async (urbanArea) => {
  const urbanAreaUrl = urbanArea.href + "scores";
  const urbanAreaResponse = await fetch(urbanAreaUrl);
  const urbanAreaData = await urbanAreaResponse.json();
  return {
    name: urbanArea.name,
    score: urbanAreaData.teleport_city_score.toFixed(2),
    summary: urbanAreaData.summary,
  };
};

const sortUrbanAreaDetails = (urbanAreaDetails) => {
  return urbanAreaDetails.sort((a, b) => b.score - a.score);
};

const getUrbanAreas = async (req, res) => {
  try {
    const { continentId } = req.params;
    const urbanAreas = await fetchUrbanAreas(continentId);
    const urbanAreaDetailPromises = urbanAreas.map(fetchUrbanAreaDetails);
    const urbanAreaDetails = await Promise.all(urbanAreaDetailPromises);
    const sortedUrbanAreaDetails = sortUrbanAreaDetails(urbanAreaDetails);
    res.status(200).json(sortedUrbanAreaDetails.slice(0, 5));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getUrbanAreas;
