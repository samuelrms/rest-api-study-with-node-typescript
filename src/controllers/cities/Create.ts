import { Request, Response } from "express";
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

export const create = async (req: Request<{}, {}, Cities>, res: Response) => {
  const data = req.body;

  let validateDate: Cities | undefined = undefined;

  try {
    validateDate = await bodyValidation.validate(data);
  } catch (error) {
    const yupError = error as yup.ValidationError;

    return res.json({
      errors: {
        default: yupError.message,
      },
    });
  }

  console.log(validateDate);

  return res.send("Create!");
};
