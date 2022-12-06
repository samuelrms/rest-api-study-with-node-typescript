import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Cities } from "../../models";

export const updateByID = async (
  id: number,
  city: Omit<Cities, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao fazer update do registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao fazer update do registro");
  }
};
