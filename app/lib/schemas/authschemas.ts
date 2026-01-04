import * as z from "zod";

export const loginSchema = z.object({
    username: z.string().min(3, "Username should be at least 3 chars long"),
    password: z.string().min(3, "Password should be at least 3 chars long")
});

export const userScheme = z.object({});

export const loginResponseShcema = z.object({
    token: z.string(),
    user: userScheme
});