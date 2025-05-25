import {z} from 'zod';

export const createServiceSchema = z.object({
  service_name: z.string("Introduce un nombre").min(3, "El nombre debe ser mayor de 3 letras").max(50, "El nombre debe ser menor de 50 caracteres"),
  estimated_time: z.number("Introduce una duración en minutos"),
  price: z.
})