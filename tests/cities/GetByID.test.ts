import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cities - GetByID", () => {
  it("Search record for ID", async () => {
    const res = await testServer
      .post("/cities")
      .send({ name: "Uberlândia", country: "MG" });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resSearch = await testServer.get(`/cities/${res.body}`).send();

    expect(resSearch.statusCode).toEqual(StatusCodes.OK);
    expect(resSearch.body).toHaveProperty("name");
  });

  it("Search no existent record", async () => {
    const res = await testServer.get("/cities/123456").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errorsResult.default");
  });
});
