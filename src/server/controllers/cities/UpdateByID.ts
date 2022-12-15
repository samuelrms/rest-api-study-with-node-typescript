import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Cities } from "../../database/models";
import { CitiesProvider } from "../../database/providers/cities";

import { validation } from "../../shared/middleware";

interface ParamProps {
  id?: number;
}

interface BodyProps extends Omit<Cities, "id"> {}

export const updateByIDValidation = validation((getSchema) => ({
  body: getSchema<BodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      country: yup.string().required().max(2).min(2),
    })
  ),
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateByID = async (
  req: Request<ParamProps, {}, BodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "O ID precisa ser informado",
      },
    });
  }

  const result = await CitiesProvider.updateByID(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};
