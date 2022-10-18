import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("hello word!");
});

router.post("/cities", CitiesController.create);

export { router };
