const app = require("./server");
const request = require("supertest");

describe("get /:continentID", () => {
  afterAll(() => {
    app.close();
  });

  describe("when given a valid continent ID", () => {
    beforeEach(async () => {
      response = await request(app).get("/EU");
    });

    it("should return 200 status", () => {
      expect(response.status).toEqual(200);
    });

    it("should return an array of 4 urban areas", () => {
      expect(response.body).toHaveLength(4);
    });

    it("should return urban areas sorted by score in descending order", () => {
      const sortedUrbanAreas = response.body.sort((a, b) => b.score - a.score);
      expect(response.body).toEqual(sortedUrbanAreas);
    });

    it("should return urban areas with name, score, and summary properties", () => {
      const urbanArea = response.body[0];
      expect(urbanArea).toHaveProperty("name");
      expect(urbanArea).toHaveProperty("score");
      expect(urbanArea).toHaveProperty("summary");
    });
  });

  describe("when given an invalid continent ID", () => {
    it("should return 400 status and error", async () => {
      const response = await request(app).get("/randomId");
      expect(response.status).toEqual(400);
      expect(response.body.message).toEqual(
        "Cannot read properties of undefined (reading 'ua:items')"
      );
    });
  });
});
