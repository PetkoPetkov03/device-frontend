
import React, { useContext, useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '~/providers/auth/AuthProvider'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import * as z from "zod"
import { loginSchema, type loginResponseShcema, type userScheme } from '~/lib/schemas/authschemas'
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { fetchApi } from '~/lib/fetchapi'

interface ErrorResponse {
  error: string,
  errorCode: number,
  timestamp: string,
  type: string,
  validations: []
}

type UserEntity = z.infer<typeof userScheme>;

type JsonResponse = z.infer<typeof loginResponseShcema>;

type LoginBody = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { isAuthenticated, login, token } = useContext(AuthContext);
  const form = useForm<LoginBody>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
    mode: "onSubmit"
  })
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>();

  const formSubmit = async (values: LoginBody) => {
    console.log("Working!");
    setStatus(null);


    const dump: JsonResponse = await fetchApi("http://localhost:9000/api/v1/users/login", "POST", token, values);
    login(dump.user, dump.token);
    navigate("/");
  }

  useEffect(() => {
    if (isAuthenticated !== false) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <main className='form-signin w-50 py-5 mt-5 m-auto d-flex shadow-lg flex-column align-items-center border justify-content-center rounded-3'>
      <h1 className='h3 mb-3 fw-normal'>Sign in</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className='space-y-4'>
          {status ? (<div className='rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm'>{status}</div>) : null}

          <FormField
            control={form.control}
            name='username'
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

          <Button type='submit' className='w-full rounded' disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default LoginForm;