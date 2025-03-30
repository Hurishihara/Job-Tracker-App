import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from './schemas/formSchema'
import { Card, CardDescription, CardTitle } from './components/ui/card'
import './index.css'
import image2 from './assets/logo2.png'
import image1 from './assets/logo1.png'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'
import { authClient } from './util/auth-client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterPage = () => {

  const [ searchParams ] = useSearchParams()
  const emailParam = searchParams.get('email') || ''
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        email: emailParam || '',
        username: '',
        password: '',
    }
  })

  useEffect(() => {
    if (emailParam) {
        form.setValue('email', emailParam)

        navigate('/sign-up', { replace: true })
    }
  }, [emailParam, form, navigate])

  const handleOnSubmit = async ({ username, email, password }: z.infer<typeof registerSchema>) => {
    console.log('Forms', username, email, password)
    try {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name: username,
            image: '',
        }, {
            onRequest: (ctx) => {
                console.log('Request', ctx)
            },
            onSuccess: (ctx) => {
                console.log('Success', ctx)
            },
            onError: (ctx) => {
                console.log('Error', ctx)
                console.log('Error creating account')
            }
        });
    }
    catch (err) {
        console.error('Catch err', err)
        console.log('Error creating account')
    }
  }

  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#111111] via-[#111111] via-50% to-[#ffffff]'>
            <Card className='shadow-xl p-[1.5rem]'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                        <div className='flex flex-col justify-between gap=[5rem]'>
                            <div className='flex flex-row items-center gap-[1rem] p-[2rem]'>
                                <img src={image1} className='w-10 h-10 rounded-[0.4rem]' />
                                <CardTitle className='text-[1.8rem]'> traqify </CardTitle>
                            </div>
                            <div className='flex flex-col p-[1.5rem] gap-3'>
                                <CardTitle className='text-[2.5rem] font-semibold leading-[3rem]'> Simplify your job applications  <br />  with organized tracking </CardTitle>
                                <CardDescription className='text-[1.1rem] text-gray-400 font-medium'> Already have an account? </CardDescription>
                            </div>
                            <Form {...form}>
                                <div className='p-[2rem]'>
                                    <form id='login-form' onSubmit={form.handleSubmit(handleOnSubmit)}>
                                        <div className='flex flex-col gap-[1rem]'>
                                        <FormField control={form.control} name='username' render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormControl>
                                                        <Input className='p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='e.g., Michael Robert' type='text'  {...field} />
                                                    </FormControl>
                                                    <FormLabel className={cn('peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Username</FormLabel>
                                                </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name='email' render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormControl>
                                                        <Input className='p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='e.g., test@gmail.com' type='email'  {...field} />
                                                    </FormControl>
                                                    <FormLabel className={cn('peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Email</FormLabel>
                                                </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name='password' render={({ field }) => (
                                            <FormItem className='relative'>
                                                <FormControl>
                                                    <Input className='p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='' type='password'  {...field} />
                                                </FormControl>
                                                <FormLabel className={cn('peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Password</FormLabel>

                                            </FormItem>
                                        )}
                                        />
                                        <Button type='submit' className='rounded-[0.7rem] p-[1.5rem] font-medium font-[2rem]'>Create Account</Button>
                                        </div>
                                    </form>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-span-6'>
                        <img src={image2} className='rounded-[1.5rem]' />
                    </div>
                </div>
            </Card>
        </div>
    </>
  )
}

export default RegisterPage
