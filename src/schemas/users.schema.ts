import z from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  email: z.string().email(),
  password: z.string().min(4),
  name: z.string(),
  role: z.enum(["User", "Employee"]),
  address: z.string(),
  contact: z.number(),
  createdAt: z.date(),
});

export const userCreateSchema = userSchema
  .omit({
    id: true,
    createdAt: true,
  })
  .partial({ role: true });
export const userLoginSchema = userSchema.pick({ email: true, password: true });
export const userReturnSchema = userCreateSchema.omit({
  password: true,
  role: true,
});

//interfaces/types
export type TUser = z.infer<typeof userSchema>;
export type TUserCreate = z.infer<typeof userCreateSchema>;
export type TUserLogin = z.infer<typeof userLoginSchema>;
export type TUserReturn = z.infer<typeof userReturnSchema>;

export type TUserLoginReturn = {
  accessToken: string;
  user: TUserReturn;
};
