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
  console.log(req.params);
  console.log(req.body);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Não implementado");
};
