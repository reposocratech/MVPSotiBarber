import { z } from 'zod';

const parseTime = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

const combineDateTime = (dateStr, timeStr) => {
  const date = new Date(dateStr);
  const { hours, minutes } = parseTime(timeStr);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

export const editAppointmentSchema = z
  .object({
    start_date: z.string({
      required_error: 'La fecha es obligatoria',
    }),
    start_hour: z.string({ required_error: "La hora de inicio es obligatoria" }),
    end_hour: z.string({ required_error: "La hora de fin es obligatoria" }),
    client_name: z
      .string({ required_error: "El nombre del cliente es obligatorio" })
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(50, "El nombre no puede tener más de 50 caracteres"),
    client_lastname: z
      .string({ required_error: "El apellido del cliente es obligatorio" })
      .min(3, "El apellido debe tener al menos 3 caracteres")
      .max(100, "El apellido no puede tener más de 100 caracteres"),
    client_phone: z
      .string({ required_error: "El teléfono es obligatorio" })
      .min(9, "El teléfono debe tener al menos 9 dígitos")
      .max(20, "El teléfono no puede tener más de 20 dígitos"),
    employee_user_id: z.coerce
      .number({ required_error: "Debes seleccionar un empleado" })
      .min(1, "Debes seleccionar un empleado válido"),
    service_id: z.coerce
      .number({ required_error: "Debes seleccionar un servicio" })
      .min(1, "Debes seleccionar un servicio válido"),
    status: z.coerce
      .number({ required_error: "Debes seleccionar un estado" })
      .min(1, "Debes seleccionar un estado válido"),
    observation: z
      .string()
      .max(250, "La observación debe tener menos de 250 caracteres")
      .optional(),
  })
  .refine((data) => {
    const start = parseTime(data.start_hour);
    const end = parseTime(data.end_hour);
    return end.hours * 60 + end.minutes > start.hours * 60 + start.minutes;
  }, {
    message: 'La hora de fin debe ser posterior a la hora de inicio',
    path: ['end_hour'],
  })
  .refine((data) => {
    const startDateTime = combineDateTime(data.start_date, data.start_hour);
    const now = new Date();
    return startDateTime >= now;
  }, {
    message: 'La hora de inicio no puede ser anterior a la fecha y hora actual',
    path: ['start_hour'],
  });