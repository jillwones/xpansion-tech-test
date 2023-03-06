require("dotenv").config();
const express = require("express");
const cors = require("cors");
const getUrbanAreas = require("./controller");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/:continentId", getUrbanAreas);

let server = app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

module.exports = server;
