const app = require("../server");
const mockUrbanAreas = require("./mocks/mockUrbanAreas");
const mockUrbanAreaDetails = require("./mocks/mockUrbanAreaDetails");
const request = require("supertest");

describe("GET /:continentID", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockImplementation((url) => {
      if (url.endsWith("/urban_areas")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUrbanAreas),
        });
      } else if (url.endsWith("/scores")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockUrbanAreaDetails),
        });
      }
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  it("should return an array of 4 urban areas with name, score, and summary properties", async () => {
    const response = await request(app).get("/EU");

    expect(response.body).toHaveLength(4);

    const urbanArea = response.body[0];
    expect(urbanArea).toHaveProperty("name");
    expect(urbanArea).toHaveProperty("score");
    expect(urbanArea).toHaveProperty("summary");
  });

  it("should return an array sorted by score from highest to lowest", async () => {
    const response = await request(app).get("/EU");

    const urbanAreasSortedByScore = response.body.sort(
      (a, b) => b.score - a.score
    );
    expect(response.body).toEqual(urbanAreasSortedByScore);
  });
});
