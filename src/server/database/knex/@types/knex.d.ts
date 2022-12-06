import { Cities } from "../../models";

declare module "knex/types/table" {
  interface Tables {
    cities: Cities;
    // country: Country;
    // peoples: PeoplesProps
    // user: UserProps
  }
}
