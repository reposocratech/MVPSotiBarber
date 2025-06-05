import { z } from 'zod';

export const completeRegisterSchema = z.object({
  user_name: z
    .string({ required_error: "Campo obligatorio" })
    .min(3, "El nombre debe ser mayor de 3 caracteres")
    .max(50, "El nombre debe ser menor de 50 caracteres"),

  lastname: z
    .string({ required_error: "Campo obligatorio" })
    .min(3, "El apellido debe ser mayor de 3 caracteres")
    .max(100, "El apellido debe ser menor de 100 caracteres"),

  phone: z
    .string()
    .min(9, "El número debe contener como mínimo 9 dígitos")
    .max(20, "El número debe contener como máximo 20 dígitos"),

  birth_date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha no es válida",
    })
    .refine((val) => {
      const inputDate = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate <= today;
    }, {
      message: "La fecha no puede ser mayor a la fecha actual",
    }),
});