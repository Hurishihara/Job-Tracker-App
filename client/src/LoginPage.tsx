import { Card, CardDescription, CardTitle } from './components/ui/card'
import './index.css'
import logo from './assets/traqifylogo.png'
import whitelogo from './assets/logo-white.png'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './schemas/formSchema'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'
import { useNavigate } from 'react-router-dom'
import { api } from './util/axios-config'
import { useAuth } from './auth/AuthContext'
import { BrainCircuit } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'


const LoginPage = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = useAuth();
    const { isAuthenticated } = useAuth()
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const handleOnSubmit = async ({ email, password }: z.infer<typeof loginSchema>) => {
        try {

            if (isAuthenticated) {
                toast.info('You are already logged in', {
                    description: 'Redirecting to your dashboard...',
                    className: 'font-tertiary text-lg font-bold',
                    descriptionClassName: 'font-tertiary text-md font-semibold',
                    duration: 1500,
                })
                setTimeout(() => navigate('/dashboard'), 1500)
                return;
            }
        
            const { data } = await api.post('/auth/sign-in', { email, password })
            toast.success('Login successful', {
                description: 'Welcome back! Redirecting to your dashboard...',
                className: 'font-tertiary text-lg font-bold',
                descriptionClassName: 'font-tertiary text-md font-semibold',
            })
            setIsAuthenticated(true)
            if (data.redirect && data.url) {
                setTimeout(() => navigate('/dashboard'), 1500)
                return;
            }
        }
        catch (err: unknown) {
            if (axios.isAxiosError(err)) {
               toast.error(err.response?.data.name, {
                    description: err.response?.data.message,
                    className: 'font-tertiary text-lg font-bold',
                    descriptionClassName: 'font-tertiary text-md font-semibold',
               })
            }
            else {
                console.error('An unexpected error occurred:', err)
                toast.error('An unexpected error occurred. Please try again later.', {
                    duration: 1500,
                })
            }
        }
    }

  return (
    <>
        <div className='flex flex-row justify-start items-center gap-1 py-5 mb-30 mx-25'>
            <img src={whitelogo} alt='logo' className='h-9 w-9 rounded-lg cursor-pointer' onClick={() => navigate('/')} />
            <h1 className='text-3xl font-bold font-primary cursor-pointer' onClick={() => navigate('/')}>traqify</h1>
        </div>
        <div className='flex items-center justify-center mb-30'>
            <Card className='p-[1.5rem] bg-gray-50 rounded-xl'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='sm:hidden md:hidden lg:block xl:block col-span-6'>
                       <div className='flex flex-col items-center justify-center h-full gap-3 bg-gray-100 rounded-xl shadow-xl px-10'>
                            <BrainCircuit className='self-start mb-5 text-gray-900' style={{ width: 50, height: 50}} />
                            <p className='text-3xl/11 font-primary font-semibold max-w-2xl text-left'>
                                "Tracking your job search isn't about counting rejections—it's 
                                about mapping your path to the right yes."
                            </p>
                            <p className='text-lg text-muted-foreground font-secondary font-semibold self-start'>
                                - Tony Robbins
                            </p>
                       </div>
                    </div>
                    <div className='sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6'>
                        <div className='flex flex-col justify-between gap=[5rem]'>
                            <div className='flex flex-row items-center gap-1 p-[2rem]'>
                                <img src={logo} className='w-9 h-9 rounded-[0.4rem]' />
                                <CardTitle className='text-2xl font-primary font-bold'> traqify </CardTitle>
                            </div>
                            <div className='flex flex-col p-10 gap-5'>
                                <CardTitle className='text-5xl font-primary font-semibold'> Hi, Welcome back </CardTitle>
                                <CardDescription className='text-lg font-secondary text-muted-foreground font-medium'>
                                    Don't have an account yet?
                                    <a href='/sign-up' className='ml-1 font-semibold text-black'> Sign up </a> 
                                </CardDescription>
                            </div>
                            <Form {...form}>
                                <div className='p-[2rem]'>
                                    <form id='login-form' onSubmit={form.handleSubmit(handleOnSubmit)}>
                                        <div className='flex flex-col gap-[2rem]'>
                                        <FormField control={form.control} name='email' render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormControl>
                                                        <Input className='font-tertiary peer p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='' type='email'  {...field} />
                                                    </FormControl>
                                                    <FormLabel className={cn('font-tertiary peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-gray-50 rounded-lg px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Email</FormLabel>
                                                </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name='password' render={({ field }) => (
                                            <FormItem className='relative'>
                                                <FormControl>
                                                    <Input className='font-tertiary peer p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='' type='password'  {...field} />
                                                </FormControl>
                                                <FormLabel className={cn('font-tertiary peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-gray-50 rounded-lg px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Password</FormLabel>
                                            </FormItem>
                                        )}
                                        />
                                        <Button type='submit' className='font-tertiary rounded-lg p-6 cursor-pointer'>
                                            Sign in
                                        </Button>
                                        </div>
                                    </form>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
        <footer className='bg-black text-white py-5'>
            <div className='grid grid-cols-12 gap-10 sm:px-10 md:px-10 lg:px-20 xl:px-20 px-5'>
                {/* Brand & Tagline */}
                <div className='col-span-3'>
                    <h2 className='text-3xl font-bold font-primary'>traqify</h2>
                    <p className='text-sm font-secondary text-gray-400 mt-2'>Your all-in-one job application tracker. Stay organized, stay ahead.</p>
                </div>
                {/* Legal */}
                <div  className='col-span-3'>
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

export default LoginPage
