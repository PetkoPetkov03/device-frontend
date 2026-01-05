import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as z from "zod"
import type { registerSchema } from "./schemas/authschemas"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type GoReturn<T> = {
    schema: T,
    err: boolean,
    message?: string
}