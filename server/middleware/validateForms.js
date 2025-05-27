import {ZodError} from "zod";

export const validateForms = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
     res.status(401).json("error de validación")
  }
}