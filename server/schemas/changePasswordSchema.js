import {z} from 'zod';

export const changePasswordSchema = z.object({
    newPassword:  z
                .string()
                .min(1, "Campo obligatorio")
                .refine(
                    (val) => val === "" || /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(val),
                    { message: "Contraseña no es válida" }
                ),
    repeatPassword: z.string().min(1,"Campo obligatorio").max(12, "Contraseña demasiado larga")
}).refine((data)=>data.newPassword === data.repeatPassword, {
    message: "las contraseñas no coinciden",
    path: ["repeatPassword"]
})