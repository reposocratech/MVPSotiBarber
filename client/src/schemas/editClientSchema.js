import {z} from 'zod';

export const editClientSchema = z.object({
  user_name: z.string().min(3, "El nombre debe ser mayor de 3 caracteres").max(50, "El nombre debe ser menor a 50 caracteres"),
  lastname: z.string().min(3, "El apellido debe ser mayor a 3 caracteres").max(100, "El apellido debe ser menor a 100 caracteres"),
  phone: z.string().min(9, "El número debe contener como mínimo 9 dígitos").max(20, "El número puede contener como máximo 20 dígitos") 
})