import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface Cities {
  name: string;
  country: string;
}

interface Filter {
  filter?: string;
  limit?: number;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<Cities>(
    yup.object().shape({
      name: yup.string().required().min(3),
      country: yup.string().required().max(2).min(2),
    })
  ),
  query: getSchema<Filter>(
    yup.object().shape({
      filter: yup.string().required().min(3),
      limit: yup.number(),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Cities>, res: Response) => {
  console.log(req.body);

  return res.send(req.body);
};
