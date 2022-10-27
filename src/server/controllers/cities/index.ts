import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getByID from "./GetByID";
import * as updateByID from "./UpdateByID";
import * as deleteByID from "./DeleteByID";

export const CitiesController = {
  ...create,
  ...getAll,
  ...getByID,
  ...updateByID,
  ...deleteByID,
};
