import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { api } from "./util/axios-config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { CheckCircle, CircleX } from "lucide-react";
import { authClient } from "./util/auth-client";
import image1 from './assets/traqifylogo.png'


const VerifyEmail = () => {
    const navigate = useNavigate();
    const { email } = useParams()
    const [ message, setMessage ] = useState<string>('Verifying your email...')

    const sendVerificationEmail = async () => {
        await authClient.sendVerificationEmail({
            email: email || '',
            callbackURL: '/login'
        })
    }


    useEffect(() => {
        const verifyEmail = async () => {
            const token = new URLSearchParams(window.location.search).get('token');
            if (!token) {
                setMessage('Invalid token. Please try again.');
                return;
            }

            try {
                await api.post('/api/auth/verify-email', {
                    token: token
                });
                setMessage('Email verified successfully! You can now sign in.');
            }
            catch (error) {
                console.error('Error verifying email:', error);
                setMessage('Something went wrong while verifying your email. Please try again.');
            }
        }
        verifyEmail();
    }, [navigate])

    return (
        <>
        <div className='bg-gray-50'>
        <div className='flex flex-row justify-start items-center gap-1 py-5 sm:mx-3 md:mx-3: lg:mx-10 xl:mx-20 2xl:mx-25'>
            <img src={image1} alt='logo' className='h-9 w-9 rounded-lg cursor-pointer' onClick={() => navigate('/')} />
            <h1 className='text-3xl font-bold font-primary cursor-pointer' onClick={() => navigate('/')}>traqify</h1>
        </div>
        <div className='flex items-center justify-center bg-gray-50 h-screen'>
           <Card className='rounded-2xl shadow-xl p-10 '>
                <CardHeader className='text-center text-2xl font-bold font-primary'>
                    <CardTitle className='text-2xl font-bold text-gray-900'>
                        {message === 'Email verified successfully! You can now sign in.' ? (
                            'Email Verified!'
                        ) : message === 'Something went wrong while verifying your email. Please try again.' ? (
                            'Email Verification Failed'
                        ) : 'Oops! Unexpected error occurred'}
                    </CardTitle>
                    <div className='flex flex-row items-center p-3 gap-2'>
                        <CardDescription className='text-muted-foreground font-semibold font-secondary '>
                            {message}
                        </CardDescription>
                        <div>
                            {message === 'Email verified successfully! You can now sign in.' ? (
                                <CheckCircle className='text-green-500 w-5 h-5' />
                            ) : (
                                <CircleX className='text-red-500 w-5 h-5' />
                            )}
                        </div>
                    </div>
                    
                </CardHeader>
                <CardContent>
                    {message === 'Email verified successfully! You can now sign in.' ? (
                        <Button variant='outline' className='w-full p-5 font-tertiary cursor-pointer' onClick={() => navigate('/login')}>
                            Sign in
                        </Button>
                    ) : message === 'Something went wrong while verifying your email. Please try again.' ? (
                        <div className='flex flex-col gap-3'>
                        <Button variant='outline' className='w-full p-5 font-tertiary cursor-pointer' onClick={sendVerificationEmail}>
                            Send verification email 
                        </Button>
                        </div>
                    ) : (
                        <Button variant='outline' className='w-full p-5 font-tertiary cursor-pointer' onClick={() => navigate('/')} disabled>
                            Home
                        </Button>
                    )}
                </CardContent>
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
        </div>
        </>
    )
}

export default VerifyEmail;