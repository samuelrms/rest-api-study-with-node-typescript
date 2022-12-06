import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { Cities } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<Cities[] | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .select("*")
      .where("id", "=", Number(id))
      .orWhere("name", "like", `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every((data) => data.id !== id)) {
      const resultByID = await Knex(ETableNames.city)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultByID) return [...result, resultByID];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao trazer os registros");
  }
};
