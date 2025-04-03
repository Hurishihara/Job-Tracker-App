import { ArrowLeftIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './components/ui/card'


const PrivacyPolicy = () => {
    return (
        <div className='bg-white base:px-3 basexl:px-3 xs:px-3 sm:px-5 md:px-10 lg:px-10 xl:px-20 2xl:px-100 3xl:px-120 py-20 w-full'>
            <div className='flex flex-col gap-5 items-start'>
                <h1 className='text-4xl font-bold font-primary'>
                    Privacy Policy
                </h1>
                <p className='text-xl font-secondary text-muted-foreground'>
                    Your privacy matters to us at Traqify. This policy describes
                    our practices for collecting, processing, and protecting your data.
                </p>
            </div>
            <div className='flex flex-col gap-10 items-start mt-10'>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            1. Information Collection
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                           When you sign up for an account or interact with us, we collect personal data
                           such as your username, email address, and any other information you provide. 
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            2. Use of Information
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                          Your data (username, email, etc.) is used exclusively to:
                          <ul className='list-disc list-inside flex flex-col gap-0 my-3'>
                            <li> <span> Authenticate and grant access </span> to our services </li>
                            <li> <span> Track and manage </span> your job applications </li>
                            <li> <span> Maintain service functionality </span> (e.g., account management, troubleshooting) </li>
                          </ul>
                          We do not sell, share, or use your information for unrelated purposes (e.g., marketing, third-party advertising).
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            3. Data Security
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            We employ stringent protective measures to safeguard your personal data against 
                            unauthorized access, modification, or disclosure. 
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            4. Cookies 
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            We use cookies to allow users to use our platform securely and efficiently. 
                            These essential cookies ensure secure access to your account and do not track 
                            additional browsing activity. You may adjust cookie settings through your browser, though this may affect 
                            platform functionality.
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

export default PrivacyPolicy