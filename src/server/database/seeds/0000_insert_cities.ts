import { Knex } from "knex";
import { citiesMG } from "../../../mocks";
import { ETableNames } from "../ETableNames";

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.city).count<[{ count: number }]>(
    "* as count"
  );

  if (!Number.isInteger(count) || Number(count) > 0) return;

  const citiesToInsert = citiesMG.map(({ name, country }) => ({
    name,
    country,
  }));
  await knex(ETableNames.city).insert(citiesToInsert);
};
