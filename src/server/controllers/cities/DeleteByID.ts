import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

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
  if (Number(req.params.id) === 123456)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errorsResult: {
        default: "Registro não encontrado",
      },
    });

  return res.status(StatusCodes.NO_CONTENT).send();
};
