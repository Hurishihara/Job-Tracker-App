import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from './schemas/formSchema'
import { Card, CardDescription, CardTitle } from './components/ui/card'
import './index.css'
import logo from './assets/traqifylogo.png'
import whitelogo from './assets/logo-white.png'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {  Footprints } from 'lucide-react'
import { toast } from 'sonner'
import { api } from './util/axios-config'
import axios from 'axios'

const RegisterPage = () => {

  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    const toastId = toast.loading('Creating your account...')
    try {
        await api.post('/api/auth/sign-up', { username, email, password })
        toast.success('Account created successfully!', {
            description: 'Please check your email to verify your account.',
            className: 'font-tertiary text-lg font-bold',
            descriptionClassName: 'font-tertiary text-md font-semibold',
            id: toastId,
            duration: 2000
        })
        setTimeout(() => {
            navigate('/login')
        }, 2000)
        setLoading(false)
    }
    catch (err) {
       if (axios.isAxiosError(err)) {
            setTimeout(() => {
                toast.error(err.response?.data.name, {
                    description: err.response?.data.message,
                    className: 'font-tertiary text-lg font-bold',
                    descriptionClassName: 'font-tertiary text-md font-semibold',
                    id: toastId,
                })
                setLoading(false)
            }, 3000)
       }
    }
  }

  return (
    <>
        <div className='flex flex-row justify-start items-center gap-1 py-5 sm:mx-3 md:mx-3: lg:mx-10 xl:mx-20 2xl:mx-25 mb-25'>
            <img src={whitelogo} alt='logo' className='h-9 w-9 rounded-lg cursor-pointer' onClick={() => navigate('/')} />
            <h1 className='text-3xl font-bold font-primary cursor-pointer' onClick={() => navigate('/')}>traqify</h1>
        </div>
        <div className='flex flex-col items-center justify-center mb-25 base:p-2 basexl:p-2 xs:p-2 sm:p-2 md:p-2 lg:p-10 xl:p-10 2xl:p-10 3xl:p-10'>
            <Card className='base:p-0 basexl:p-0 xs:p-5 sm:p-5 md:p-5 lg:p-5 xl:p-5 2xl:p-5 3xl:p-5 bg-gray-50 base:rounded-none basexl:rounded-none xs:rounded-none sm:rounded-none md:rounded-none lg:rounded-xl xl:rounded-xl 2xl:rounded-xl 3xl:rounded-xl'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='base:col-span-12 basexl:col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6 3xl:col-span-6'>
                        <div className='flex flex-col justify-between gap=[5rem]'>
                            <div className='flex flex-row items-center gap-1 p-[2rem]'>
                                <img src={logo} className='w-9 h-9 rounded-[0.4rem]' />
                                <CardTitle className='text-2xl font-primary font-bold'> traqify </CardTitle>
                            </div>
                            <div className='flex flex-col p-[1.5rem] gap-3'>
                                <CardTitle className='base:text-lg/6 basexl:text-xl/6 xs:text-5xl/13 sm:text-5xl/13 md:text-5xl/13 lg:text-5xl/13 xl:text-5xl/13 2xl:text-5xl/13 3xl:text-5xl/13 font-primary font-semibold max-w-2xl'>
                                    Simplify your job applications with organized tracking
                                </CardTitle>
                                <CardDescription className='base:text-sm basexl:text-lg xs:text-lg sm:text-lg md:text-lg lg:text-lg xl:text-lg 2xl:text-lg 3xl:text-lg font-secondary text-muted-foreground font-medium'>
                                    Already have an account?
                                    <a href='/login' className='ml-1 font-semibold text-black hover:text-black transition-colors duration-200 cursor-pointer relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-400 hover:after:w-full'>
                                        Sign in
                                    </a> 
                                </CardDescription>
                            </div>
                            <Form {...form}>
                                <div className='p-[2rem]'>
                                    <form id='login-form' onSubmit={form.handleSubmit(handleOnSubmit)}>
                                        <div className='flex flex-col gap-[1rem]'>
                                        <FormField control={form.control} name='username' render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormControl>
                                                        <Input disabled={loading} className='font-tertiary p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='e.g., LemonBanana042' type='text'  {...field} />
                                                    </FormControl>
                                                    <FormLabel className={cn('font-tertiary peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-gray-50 rounded-lg px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Username</FormLabel>
                                                </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name='email' render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormControl>
                                                        <Input disabled={loading} className='font-tertiary p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='e.g., test@gmail.com' type='email'  {...field} />
                                                    </FormControl>
                                                    <FormLabel className={cn('font-tertiary peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-gray-50 rounded-lg px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Email</FormLabel>
                                                </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name='password' render={({ field }) => (
                                            <FormItem className='relative'>
                                                <FormControl>
                                                    <Input disabled={loading} className='p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='' type='password'  {...field} />
                                                </FormControl>
                                                <FormLabel className={cn('font-tertiary peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-gray-50 rounded-lg px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Password</FormLabel>

                                            </FormItem>
                                        )}
                                        />
                                        <Button type='submit' disabled={loading} className='font-tertiary rounded-lg p-6 cursor-pointer'>Create Account</Button>
                                        </div>
                                    </form>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='base:hidden basexl:hidden xs:hidden sm:hidden md:hidden lg:block xl:block col-span-6'>
                       <div className='flex flex-col items-center justify-center h-full gap-3 bg-gray-100 rounded-xl shadow-xl px-10'>
                            <Footprints className='self-end mb-5 text-gray-900' style={{ width: 50, height: 50}} />
                            <p className='text-3xl/11 font-primary font-semibold max-w-2xl text-right'>
                                "You won't land your dream job by accident—but by tracking every step with intention."
                            </p>
                            <p className='text-lg text-muted-foreground font-secondary font-semibold self-end'>
                                - James Clear
                            </p>
                       </div>
                    </div>
                </div>
            </Card>
        </div>
        <footer className='bg-black text-white py-5'>
            <div className='grid grid-cols-12 gap-10 sm:px-10 md:px-10 lg:px-20 xl:px-20 px-5'>
                {/* Brand & Tagline */}
                <div className='base:col-span-12 basexl:col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4 2xl:col-span-4'>
                    <h2 className='text-3xl font-bold font-primary'>traqify</h2>
                    <p className='text-sm font-secondary text-gray-400 mt-2 max-w-xs'>Your all-in-one job application tracker. Stay organized, stay ahead.</p>
                </div>
                {/* Legal */}
                <div  className='base:col-span-12 basexl:col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-4 2xl:col-span-6'>
                    <h3 className='text-lg font-primary font-semibold mb-3'>Legal</h3>
                    <ul className='text-sm space-y-2 text-gray-400 font-secondary'>
                        <li><a href='/privacy' className='hover:text-white'>Privacy Policy</a></li>
                        <li><a href='/terms' className='hover:text-white'>Terms of Service</a></li>
                        <li><a href='/cookie' className='hover:text-white'> Cookie Policy </a> </li>
                    </ul>
                </div>
            </div>
            {/* Copyright */}
            <div className='text-center font-secondary text-gray-400 text-sm pt-5'>
                © {new Date().getFullYear()} Traqify. All rights reserved.
            </div>
        </footer>
    </>
  )
}

export default RegisterPage
