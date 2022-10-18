import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface Cities {
  name: string;
  country: string;
}

const bodyValidation: yup.SchemaOf<Cities> = yup.object().shape({
  name: yup.string().required().min(3),
  country: yup.string().required().max(2).min(2),
});

export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (!error.path) return;

      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors,
    });
  }
};

export const create = async (req: Request<{}, {}, Cities>, res: Response) => {
  console.log(req.body);

  return res.send(req.body);
};
