import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { SchemaOf, ValidationError } from "yup";

type Properties = "body" | "header" | "params" | "query";

type GetSchema = <T>(schema: SchemaOf<T>) => SchemaOf<any>;

type AllSchemas = Record<Properties, SchemaOf<any>>;

type GetAllSchemas = (getSchema: GetSchema) => Partial<AllSchemas>;

type Validation = (getAllSchemas: GetAllSchemas) => RequestHandler;

export const validation: Validation =
  (getAllSchemas) => async (req, res, next) => {
    const schemas = getAllSchemas((schema) => schema);

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.validateSync(req[key as Properties], { abortEarly: false });
      } catch (err) {
        const yupError = err as ValidationError;
        const errors: Record<string, string> = {};

        yupError.inner.forEach((error) => {
          if (!error.path) return;

          errors[error.path] = error.message;
        });

        errorsResult[key] = errors;
      }
    });

    if (Object.entries(errorsResult).length === 0) {
      return next();
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errorsResult,
      });
    }
  };
