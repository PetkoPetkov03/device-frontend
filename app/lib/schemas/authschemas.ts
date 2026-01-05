import * as z from "zod";
import type { GoReturn } from "../utils";

export const loginSchema = z.object({
    username: z.string().min(3, "Username should be at least 3 chars long"),
    password: z.string().min(3, "Password should be at least 3 chars long")
});

export const userSchema = z.object({});

export const loginResponseSchema = z.object({
    token: z.string(),
    user: userSchema
});

export const registerSchema = z.object({
    fullName: z.string().min(3, "Username should be at least 3 chars long"),
    email: z.email(),
    phone: z.string().regex(/^[+]?[0-9\s\-()]{7,15}$/,"Invalid phone number"),
    address: z.string().min(10, "Address too short"),
    purchiseDate: z.string(),
    deviceSerialNumber: z.string(),
    password: z.string().min(3, "Password should be at least 3 chars long")
});

export const registerCheckSchema = registerSchema.extend({
    cPassword: z.string().min(3, "Password should be at least 3 chars long")
}).refine(data => data.password === data.cPassword, {
    error: "Passwords do not match!"
});


export const convertRegisterSchema = (sch: z.infer<typeof registerCheckSchema>|null): GoReturn<z.infer<typeof registerSchema>|null> => {
    if(sch === null) {
        return {schema: sch, err: true, message: "schema is null value"};
    }

    return {schema: registerSchema.parse(sch), err: false}
}

export const registerResponseSchema = z.void();