import {z} from 'zod';

export const registerSchema = z.object({
    email: z.string().email("El email no es válido").min(1, "Campo obligatorio"),
    password:  z
                .string()
                .min(1, "Campo obligatorio")
                .refine(
                    (val) => val === "" || /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(val),
                    { message: "Contraseña no es válida" }
                ),
    repPassword: z.string().min(1,"Campo obligatorio").max(12, "Contraseña demasiado larga")
}).refine((data)=>data.password === data.repPassword, {
    message: "las contraseñas no coinciden",
    path: ["repPassword"]
})