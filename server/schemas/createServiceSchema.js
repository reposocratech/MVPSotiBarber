import {z} from 'zod';

export const createServiceSchema = z.object({
  service_name: z.string()
  .min(3, "Introduce un nombre mayor de 3 caracteres")
  .max(50, "El nombre debe ser menor de 50 caracteres"),
  estimated_time: z
  .preprocess(val => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    return Number(val)
  },
    z
    .number({required_error: "Este campo es obligatorio", invalid_type_error: "Debe ser un número"})
    .int("El número debe ser un entero")
  ),
  price: z 
  .preprocess(val => {
    if (typeof val === 'string' && val.trim() === '') return undefined;
    val = val.replace(",", ".")
    return Number(val)
  },
    z
    .number({required_error: "Este campo es obligatorio", invalid_type_error: "Debe ser un número"}).refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
      message: "Debe tener como máximo 2 decimales"
    })
  ),

  service_description: z.string()
  .min(10, "Introduce una descripción mayor de 10 caracteres")
  .max(250, "La descripción debe ser menor de 250 caracteres")
})