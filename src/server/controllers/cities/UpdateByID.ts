import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middleware";

interface ParamProps {
  id?: number;
}

interface BodyProps {
  name: string;
  country: string;
}

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
  if (Number(req.params.id) === 123456)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorsResult: {
        default: "Registro não encontrado",
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};
