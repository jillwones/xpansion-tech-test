require("dotenv").config();
const express = require("express");
const getUrbanAreas = require("./controller");

const app = express();

app.use(express.json());

app.get("/:continentId", getUrbanAreas);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
