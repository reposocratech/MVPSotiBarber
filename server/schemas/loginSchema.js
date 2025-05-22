import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email("El email no es válido"),
    password:  z.string()
                .regex(/^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "La contraseña no es válida"),
})