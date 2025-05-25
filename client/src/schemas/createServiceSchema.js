import {z} from 'zod';

export const createServiceSchema = z.object({
  service_name: z.string("Introduce un nombre")
  .min(3, "El nombre debe ser mayor de 3 letras")
  .max(50, "El nombre debe ser menor de 50 caracteres"),
  estimated_time: z
  .preprocess(val => Number(val),
    z
    .number("Introduce una duración en minutos")
    .min(1, "La duración debe ser mayor que 0")
  ),
  price: z 
  .preprocess((val) =>{
    if (typeof val === 'string' && val.trim() === '') return undefined;
    if (typeof val === 'string') val = val.replace(',', '.');
    return Number(val)
  },
  z.number({
    required_error: "Introduce un precio",
    invalid_type_error: "Ej: 10,50"
  })
  .min(0.01, "El precio debe ser mayor que 0")
),
  service_description: z.string("Introduce una descripción")
  .min(10, "La descripción debe ser mayor de 10 caracteres")
  .max(250, "La descripción debe ser menor de 250 caracteres")
})