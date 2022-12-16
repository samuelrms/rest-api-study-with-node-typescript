import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { CitiesProvider } from "../../database/providers/cities";

import { validation } from "../../shared/middleware";

interface ParamProps {
  id?: number;
}

export const deleteByIDValidation = validation((getSchema) => ({
  params: getSchema<ParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteByID = async (req: Request<ParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "O ID precisa ser informado",
      },
    });
  }

  const result = await CitiesProvider.deleteByID(req.params.id);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
