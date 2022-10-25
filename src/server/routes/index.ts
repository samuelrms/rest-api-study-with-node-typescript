import { Router } from "express";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("hello word!");
});

router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

router.get(
  "/cities",
  CitiesController.getAllValidation,
  CitiesController.getAll
);

export { router };
