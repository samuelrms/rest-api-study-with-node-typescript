import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface Cities {
  name: string;
  country: string;
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<Cities>(
    yup.object().shape({
      name: yup.string().required().min(3),
      country: yup.string().required().max(2).min(2),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Cities>, res: Response) => {
  return res.status(StatusCodes.CREATED).json(1);
};
