import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cities - Create", () => {
  it("Create register", async () => {
    const res = await testServer.post("/cities").send({
      name: "Uberlândia",
      country: "MG",
    });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual("number");
  });
  it("Create small name", async () => {
    const res = await testServer.post("/cities").send({
      name: "Ub",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errorsResult.body.name");
  });
  it("Create small country", async () => {
    const res = await testServer.post("/cities").send({
      country: "G",
    });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errorsResult.body.country");
  });
});
