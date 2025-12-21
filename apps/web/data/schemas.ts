import z from "zod";

export const expedienteSchema = z.object({
    id: z.string().uuid(),
    descripcion: z.string().max(500).optional(),
    cliente: z.string(),
    fechaCreacion: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    estado: z.enum(["abierto", "cerrado", "en_progreso"]),
});

export type ExpedienteFormData = z.infer<typeof expedienteSchema>;