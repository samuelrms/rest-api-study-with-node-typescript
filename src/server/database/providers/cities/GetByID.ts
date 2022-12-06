import { ETableNames } from "../../ETableNames";
import { Cities } from "../../models";
import { Knex } from "../../knex";

export const getByID = async (id: number): Promise<Cities | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não localizado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao localizar o registro");
  }
};
