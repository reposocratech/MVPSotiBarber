/* import {z} from 'zod';

export const changePasswordSchema = z.object({
    newPassword:  z.string()
                .regex(/^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/, "Contraseña no es válida"),
    repeatPassword: z.string()
}).refine((data)=>data.newPassword === data.repeatPassword, {
    message: "las contraseñas no coinciden",
    path: ["repPassword"]
}) */