import {ZodError} from "zod";

export const validateForms = (schema) => (req, res, next) => {
  console.log("+++++", req.body)
  try {
    if(req.body.data) {
      schema.parse(JSON.parse(req.body.data));
    } else {
      schema.parse(req.body);
    }
    next();
  } catch (error) {
    console.log("error de validacion ---------", error)
     res.status(401).json("error de validación")
  }
}