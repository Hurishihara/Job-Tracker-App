import { ArrowLeftIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './components/ui/card'


const CookiePolicy = () => {
    return (
        <div className='bg-white base:px-3 basexl:px-3 xs:px-3 sm:px-5 md:px-10 lg:px-10 xl:px-20 2xl:px-100 3xl:px-120 py-20 w-full'>
            <div className='flex flex-col gap-5 items-start'>
                <h1 className='text-4xl font-bold font-primary'>
                    Cookie Policy
                </h1>
                <p className='text-xl font-secondary text-muted-foreground'>
                    Traqify uses cookies to ensure the proper functioning of our website.
                    This policy explains our use of these technologies.
                </p>
            </div>
            <div className='flex flex-col gap-10 items-start mt-10'>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            1. What are Cookies?
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                          Cookies are small text files stored on your device when you visit a website. We use them
                          strictly for the functionality of our platform, such as maintaining your session and preferences.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            2. How We Use Cookies
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                          Traqify uses cookies only for: 
                          <ul className='list-disc list-inside flex flex-col gap-0 my-3'>
                            <li> <span> User authentication </span> (keeping you securely logged in) </li>
                            <li> <span> Session management </span> (maintaining your active visit) </li>
                            <li> <span> Security protection </span> (preventing unauthorized access) </li>
                          </ul>
                          These are essential cookies - disabling them may break core website functions. We do not use cookies for 
                          tracking, analytics, or advertising.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            3. Types of Cookies
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            Traqify uses only strictly necessary session cookies. These cookies are temporary, contain no personal data,
                            and it is deleted when you close your browser.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            4. Managing Cookies 
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            You can control or delete cookies through your browser settings. Please note that disabling
                            cookies will disrupt the authentication process and limit platform functionality. For detailed
                            instructions, refer to your browser's help section.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
            <Button variant='outline' className='font-tertiary mt-10' onClick={() => window.history.back()}>
                <ArrowLeftIcon />
                Go Back
            </Button>
        </div>
    )
}

export default CookiePolicy