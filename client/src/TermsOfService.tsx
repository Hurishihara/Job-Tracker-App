import { ArrowLeftIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './components/ui/card'


const TermsOfService = () => {
    return (
        <div className='bg-white base:px-3 basexl:px-3 xs:px-3 sm:px-5 md:px-10 lg:px-10 xl:px-20 2xl:px-100 3xl:px-120 py-20 w-full'>
            <div className='flex flex-col gap-5 items-start'>
                <h1 className='text-4xl font-bold font-primary'>
                    Terms of Service
                </h1>
                <p className='text-xl/8 font-secondary text-muted-foreground'>
                    By accessing or using Traqify, you agree to comply with
                    these Terms of Service. If you do not agree, please do not use our platform.
                </p>
            </div>
            <div className='flex flex-col gap-10 items-start mt-10'>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            1. Use of Service
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                          Traqify provides a job application tracking platform. You agree to use this service ethically,
                          maintaining accurate records of your applications. Falsifying information or misusing the system
                          will result in account termination.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            2. User Accounts
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                          You are solely responsible for: 
                          <ul className='list-disc list-inside flex flex-col gap-0 my-3'>
                            <li> Maintaining the confidentiality of your account credentials </li>
                            <li> All application data under your account </li>
                          </ul>
                          Account sharing is prohibited. If you suspect unauthorized access, please contact us immediately.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            3. Content & Data
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            Traqify enables tracking of job applications and related data. You acknowledge that we
                            don't verify employers/listings, application outcomes are your responsibility, and 
                            provided information must be accurate and lawfully obtained.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            4. Intellectual Property 
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            The Traqify platform, including its design, features, and code is our original work. You may
                            use it to track your job applications, but you cannot redistribute or reverse-engineer the platform.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            5. Termination
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            We reserve the right to suspend or terminate your account and access to the service immediately,
                            without prior notice or liability, if you breach these Terms of Service or engage in any unlawful activity.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            6. Changes to Terms
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            We reserve the right to modify these Terms of Service at any time without prior notice.
                            It is your responsibility to review these terms periodically for changes. Your continued 
                            use of the service after any modifications constitutes acceptance of the new terms.
                        </CardDescription>
                    </CardHeader>
                </Card>
                <Card className='rounded-xl px-3 hover:shadow-xl transition-all duration-300 ease-in-out'>
                    <CardHeader>
                        <CardTitle className='text-3xl font-semibold font-primary'>
                            7. Contact Us
                        </CardTitle>
                        <CardDescription className='text-xl/8 mt-3 font-medium font-secondary text-muted-foreground'>
                            If you have any questions about these Terms of Service, please contact us at 
                            apptraqify@gmail.com
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

export default TermsOfService