import { StatusCodes } from "http-status-codes";

import { testServer } from "../jest.setup";

describe("Cities - Delete by ID", () => {
  it("Delete record", async () => {
    const res = await testServer.post("/cities").send({ name: "Uberlândia" });
    expect(res.statusCode).toEqual(StatusCodes.CREATED);

    const resDeleted = await testServer.delete(`/cities/${res.body}`).send();
    expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Delete record that does not exist", async () => {
    const res = await testServer.delete("/cities/123456").send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errorsResult.default");
  });
});
