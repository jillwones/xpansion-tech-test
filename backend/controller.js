const getUrbanAreas = async (req, res) => {
  try {
    const { id } = req.body;
    const urbanAreasUrl = `https://api.teleport.org/api/continents/geonames%3A${id}/urban_areas/`;
    const urbanAreasResponse = await fetch(urbanAreasUrl);
    const urbanAreasData = await urbanAreasResponse.json();
    const urbanAreas = urbanAreasData["_links"]["ua:items"];

    const urbanAreaDetailsPromises = urbanAreas.map(async (urbanArea) => {
      const urbanAreaUrl = urbanArea.href + "scores";
      const urbanAreaResponse = await fetch(urbanAreaUrl);
      const urbanAreaData = await urbanAreaResponse.json();
      return {
        name: urbanArea.name,
        score: urbanAreaData.teleport_city_score,
        summary: urbanAreaData.summary,
      };
    });

    const urbanAreaDetails = await Promise.all(urbanAreaDetailsPromises);
    urbanAreaDetails.sort((a, b) => b.score - a.score);

    res.status(200).json(urbanAreaDetails.slice(0, 5));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = getUrbanAreas;
