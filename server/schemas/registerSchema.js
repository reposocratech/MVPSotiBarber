import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email("El mail no es válido"),
    password:  z.string()
                .regex(/^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "Contraseña no es válida"),
    repPassword: z.string()
}).refine((data)=>data.password === data.repPassword, {
    message: "las contraseñas no coinciden",
    path: ["repPassword"]
})