import {ZodError} from "zod";

export const validateForgetPassword = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body)
    next();
  } catch (error) {
    res.status(401).json("error de validación")
  }
}