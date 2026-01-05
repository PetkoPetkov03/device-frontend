import React, { useContext, useState, type Dispatch, type FormEvent, type SetStateAction } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { convertRegisterSchema, registerCheckSchema, registerResponseSchema, registerSchema } from '~/lib/schemas/authschemas';
import { zodResolver } from '@hookform/resolvers/zod';
import type { GoReturn } from '~/lib/utils';
import { AuthContext } from '~/providers/auth/AuthProvider';
import { fetchApi } from '~/lib/fetchapi';

type RegisterCheckValues = z.infer<typeof registerCheckSchema>;
type RegisterValues = z.infer<typeof registerSchema>;
type RegisterResponse = z.infer<typeof registerResponseSchema>;

export const randomString = (length = 16) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);

  return Array.from(array, (x) => chars[x % chars.length]).join("");
};


const RegisterForm = () => {
  const { token } = useContext(AuthContext);
  const [status, setStatus] = useState<string | null>();

  const form = useForm<RegisterCheckValues>({
    resolver: zodResolver(registerCheckSchema),
    defaultValues: {
      fullName: "",
      password: "",
      address: "",
      deviceSerialNumber: `BG${randomString()}`,
      email: "",
      phone: "",
      purchiseDate: ((new Date()).toString()),
      cPassword: ""
    },
    mode: "onSubmit"
  });

  const formSubmit = async (values: RegisterCheckValues) => {
    // const payload: RegisterValues = {
    //   fullName: values.fullName,
    //   password: values.password
    // } 

    console.log("AAAA");
    const payloadResponse = convertRegisterSchema(values);

    console.log(payloadResponse);

    if (payloadResponse.err) {
      throw new Error(`payload error: ${payloadResponse.message ?? "Unknown!"}`);
    }

    const response = await fetchApi<RegisterResponse>("http://localhost:9000/api/v1/users/registration", "POST", token, payloadResponse.schema!);
  }

  return (
    <div className='d-flex w-100 align-items-center py-4'>
      <main className='form-signin w-50 py-5 mt-5 m-auto d-flex flex-column shadow-lg rounded align-items-center border justify-content-center'>
        <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(
            formSubmit,
            (errors) => console.log("VALIDATION ERRORS:", errors)
          )} className='space-y-4'>
            {status ? (<div className='rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm'>{status}</div>) : null}

            <FormField
              control={form.control}
              name='fullName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Username' autoComplete='username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Address' autoComplete='address-level4' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Email' autoComplete='email' inputMode='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input placeholder='Phone Number' autoComplete='tel' inputMode='tel' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Password' autoComplete='current-password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='cPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Confirm Password' autoComplete='current-password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full rounded' disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </main>
    </div>
  )
}

export default RegisterForm