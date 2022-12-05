import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Cities } from "../../models";

export const create = async (
  city: Omit<Cities, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.city).insert(city).returning("id");

    if (typeof result === "object") {
      return result.id;
    }

    if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar registro");
  }
};
