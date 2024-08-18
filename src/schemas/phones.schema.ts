import z from "zod";

export const phoneSchema = z.object({
  id: z.number().positive(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  stock: z.number(),
  category: z.string(),
  createdAt: z.date(),
});

export const phoneCreateSchema = phoneSchema.omit({
  id: true,
  createdAt: true,
});
export const phoneUpdateSchema = phoneCreateSchema.partial();

//interfaces/types
export type TPhone = z.infer<typeof phoneSchema>;
export type TPhoneCreate = z.infer<typeof phoneCreateSchema>;
export type TPhoneUpdate = z.infer<typeof phoneUpdateSchema>;
