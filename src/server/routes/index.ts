import { Router } from "express";

import { CitiesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("cidades: /cities");
});

router.get(
  "/cities",
  CitiesController.getAllValidation,
  CitiesController.getAll
);

router.get(
  "/cities/:id",
  CitiesController.getByIDValidation,
  CitiesController.getByID
);

router.put(
  "/cities/:id",
  CitiesController.updateByIDValidation,
  CitiesController.updateByID
);

router.post(
  "/cities",
  CitiesController.createValidation,
  CitiesController.create
);

router.delete(
  "/cities/:id",
  CitiesController.deleteByIDValidation,
  CitiesController.deleteByID
);

export { router };
