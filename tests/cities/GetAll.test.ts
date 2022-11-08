import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cities - Get all", () => {
  it("Search all records", async () => {
    const res = await testServer
      .post("/cities")
      .send({ name: "Uberlândia", country: "MG" });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get("/cities").send();
    expect(Number(resSearch.header["x-total-count"])).toBeGreaterThan(0);
    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body.length).toBeGreaterThan(0);
  });
});
