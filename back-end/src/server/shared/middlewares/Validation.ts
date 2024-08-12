/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { Schema, ValidationError } from 'yup';
import { RequestHandler } from 'express';

export enum Field {
  Body = 'body',
  Header = 'header',
  Params = 'params',
  Query = 'query',
}

type TGetSchema = <T>(schema: Schema<T>) => Schema<T>
type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TAllSchemas = Record<Field, Schema<any>>

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next) => {
  const schemas = getAllSchemas(schema => schema);
  const errrosResult: Record<string, Record<string, string>> = {};
  Object.entries(schemas).forEach(([key, schema]) => {
    try {
      schema.validateSync(req[key as Field], { abortEarly: false });
    } catch (err) {
      const yupError = err as ValidationError;
      const errors: Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (!error.path) return;
        errors[error.path] = error.message;
      });

      errrosResult[key] = errors;

    }
  });
  if (Object.entries(errrosResult).length === 0) {
    return next();
  }
  return res.status(StatusCodes.BAD_REQUEST).json({ errors: errrosResult });
};