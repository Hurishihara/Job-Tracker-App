import * as React from 'react';
import { Html, Head, Body, Container, Section, Text, Tailwind, Button, Hr, Img, Row, Column } from '@react-email/components';


interface VerificationEmailProps {
    token: string;
    email: string;
    username: string
}

export default function VerificationEmail({ token, email, username }: VerificationEmailProps) {
    return (
        <Html>
            <Head>
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                <link
                    href='https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&family=Manrope:wght@200..800&family=Urbanist:wght@100..900&display=swap'
                    rel='stylesheet'
                />
            </Head>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            fontFamily: {
                                secondary: ['Manrope', 'sans-serif'],
                                primary: ['Urbanist', 'sans-serif'],
                                tertiary: ['DM Sans', 'sans-serif'],
                            }
                        }
                    }
                }}>
                <Body className='bg-gray-50 text-gray-900 p-6'>
                    <Container className='bg-white rounded-lg shadow-lg p-6 mx-auto w-full max-w-md'>
                        <Section className='text-center'>
                            <Row>
                                <Column align='right'>
                                    <Img src='https://res.cloudinary.com/dn9c2giu6/image/upload/v1743414889/sidebarlogo_ezk1jh.png' alt='white traqify logo' width={50} height={50} />
                                </Column>
                                <Column align='left'>
                                    <Text
                                    className='text-2xl font-bold text-gray-900 font-primary'
                                    >
                                        traqify
                                    </Text>
                                </Column>
                            </Row>
                            <Text
                                className='text-gray-600 font-secondary text-md text-left'
                            >
                                Hi, { username }!
                            </Text>
                            <Text className='text-gray-600 font-secondary text-md text-left'>
                                Thanks for signing up! Please verify your email address to complete your registration.
                            </Text>
                            <Section className='mt-14'>
                                <Button
                                    href={`https://traqify.live/verify-email/${email}?token=${token}`}
                                    className='bg-black text-white font-semibold py-3 px-10 rounded-md hover:bg-red-500 font-tertiary'
                                    
                                >
                                    Verify Email
                                </Button>
                            </Section>
                            <Hr className='my-6 border-gray-300' />
                            <Text
                                className='text-gray-500 mt-4 text-md font-secondary text-left '
                            >
                               This verification email is intended for { username }, to confirm that you are the owner of this email address.
                               If you were not expecting this email, please ignore it.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
