import supertest from "supertest";
import { Knex } from "../src/server/database/knex";

import { server } from "../src/server/Server";

beforeAll(async () => {
  await Knex.migrate.latest();
});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);
