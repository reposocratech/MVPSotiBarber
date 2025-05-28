import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string()
      .min(1, "Campo obligatorio")
      .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "El mail no es válido"
      }),
  
    password: z.string()
      .min(1, "Campo obligatorio")
      .refine(
        (val) => val === "" || /^(?=(.*[a-zA-Z]))(?=(.*\d))(?=(.*[!@#$%^&*(),.?":{}|<>]))[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{6,}$/.test(val),
        { message: "Contraseña no es válida" }
      ),
  });