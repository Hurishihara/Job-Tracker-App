import { Card, CardDescription, CardTitle } from './components/ui/card'
import './index.css'
import image2 from './assets/logo2.png'
import image1 from './assets/logo1.png'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from './schemas/formSchema'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from './components/ui/form'
import { Input } from './components/ui/input'
import { cn } from './lib/utils'
import { Button } from './components/ui/button'


const LoginPage = () => {

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const handleOnSubmit = (values: z.infer<typeof loginSchema>) => {
        console.log(values)
    }

  return (
    <>
        <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#111111] via-[#111111] via-50% to-[#ffffff]'>
            <Card className='shadow-xl p-[1.5rem]'>
                <div className='grid grid-cols-12 gap-4'>
                    <div className='col-span-6'>
                        <img src={image2} className='rounded-[1.5rem]' />
                    </div>
                    <div className='col-span-6'>
                        <div className='flex flex-col justify-between gap=[5rem]'>
                            <div className='flex flex-row items-center gap-[1rem] p-[2rem]'>
                                <img src={image1} className='w-10 h-10 rounded-[0.4rem]' />
                                <CardTitle className='text-[1.8rem]'> SyncTrackr </CardTitle>
                            </div>
                            <div className='flex flex-col p-[2rem]'>
                                <CardTitle className='text-[3rem] font-semibold'> Welcome Back </CardTitle>
                                <CardDescription className='text-[1.1rem] text-gray-400 font-medium'> Don't have an account yet? </CardDescription>
                            </div>
                            <Form {...form}>
                                <div className='p-[2rem]'>
                                    <form id='login-form' onSubmit={form.handleSubmit(handleOnSubmit)}>
                                        <div className='flex flex-col gap-[2rem]'>
                                        <FormField control={form.control} name='email' render={({ field }) => (
                                                <FormItem className='relative'>
                                                    <FormControl>
                                                        <Input className='peer p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='' type='email'  {...field} />
                                                    </FormControl>
                                                    <FormLabel className={cn('peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Email</FormLabel>
                                                </FormItem>
                                        )}
                                        />
                                        <FormField control={form.control} name='password' render={({ field }) => (
                                            <FormItem className='relative'>
                                                <FormControl>
                                                    <Input className='peer p-[1.5rem] ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' placeholder='' type='password'  {...field} />
                                                </FormControl>
                                                <FormLabel className={cn('peer-focus:secondary peer-focus:dark:secondary absolute start-3 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text text-lg peer-focus:text-black')}>Password</FormLabel>
                                            </FormItem>
                                        )}
                                        />
                                        <Button type='submit' className='rounded-[0.7rem] p-[1.5rem] font-medium font-[2rem]'>Sign In</Button>
                                        </div>
                                    </form>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </>
  )
}

export default LoginPage
