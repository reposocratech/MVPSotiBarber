import {z} from "zod";

export const forgetPasswordSchema = z.object({
    email: z.string().email("El email no es válido").min(1, "Rellena el email")
})