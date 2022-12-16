import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cities - UpdateByID", () => {
  it("Update record", async () => {
    const res = await testServer.post("/cities").send({
      name: "Uberlândia",
      country: "MG",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdate = await testServer
      .put(`/cities/${res.body}`)
      .send({ name: "Perdizes", country: "MG" });

    expect(resUpdate.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Update no existent record", async () => {
    const res = await testServer
      .get("/cities/123456")
      .send({ name: "Uberlândia", country: "MG" });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
