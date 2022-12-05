import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Cities } from "../../database/models";
import { CitiesProvider } from "../../database/providers/cities";
import { validation } from "../../shared/middleware";

interface BodyProps extends Omit<Cities, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
      country: yup.string().required().max(2).min(2),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Cities>, res: Response) => {
  const result = await CitiesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
