import {z} from 'zod';

export const completeRegisterSchema = z.object({
  user_name: z.string("El campo nombre es necesario").min(3, "El nombre debe ser mayor de 3 letras").max(50, "El nombre debe ser menor de 50 caracteres"),
  lastname: z.string("El campo apellido es necesario").min(3, "El apellido debe ser mayor de 3 letras").max(100, "El apellido debe ser menor de 100 caracteres"),
  phone: z.string().min(9, "El número debe contener como mínimo 9 dígitos").max(20, "El número puede contener como máximo 20 dígitos"),
  birth_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha no es válida",
  }),
})