import {ZodError} from 'zod';

export const validateLogin = (schema)=>(req, res, next)=>{
  try {
    schema.parse(req.body)
    next();
  } catch (error) {
    res.status(401).json({message: "Error de validación"})
  }
}