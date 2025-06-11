import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must not exceed 20 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(40, "Password must not exceed 40 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string(),
});

export const addContentSchema = z.object({
  link: z.string().url(),
  type: z.string(),
  title: z
    .string()
    .min(10, "Title must be atleast of 5 characters")
    .max(250, "Title must be atleast of 5 characters"),
});

export const shareBrainSchema = z.object({
  share: z.boolean()
})

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type addContentInput = z.infer<typeof addContentSchema>;
export type shareBrainInput = z.infer<typeof shareBrainSchema>;
