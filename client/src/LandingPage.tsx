import { ArrowDown, ArrowRight, ChartGantt, HandCoins, LogInIcon, MenuIcon, Rocket, SparkleIcon } from 'lucide-react'
import image1 from './assets/traqifylogo.png'
import image2 from './assets/freepik_image1.png'
import image3 from './assets/freepik_image2.png'
import image4 from './assets/freepik_image3.png'
import { Button } from './components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Separator } from './components/ui/separator'
import { Input } from './components/ui/input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIsMobile } from './hooks/use-mobile'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu'

const LandingPage = () => {

    const [ email, setEmail] = useState<string>('')
    const isMobile = useIsMobile()
    const navigate = useNavigate()

    const handleStartNow = () => {
        if (email) {
            navigate(`/sign-up?email=${encodeURIComponent(email)}`)
        }
    }

    const handleGetStarted = () => {
        navigate('/sign-up')
    }

    return (
       <div className='bg-gray-50 h-screen'>
            <div className='flex flex-row justify-start items-center gap-1 py-5 mb-20 sm:mx-3 md:mx-3: lg:mx-10 xl:mx-20 2xl:mx-25'>
                <img src={image1} alt='logo' className='h-9 w-9 rounded-lg' />
                <h1 className='text-3xl font-bold font-primary'>traqify</h1>
                {isMobile ? (
                    <div className='ml-auto'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <MenuIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel className='font-bold font-primary text-center'>Menu</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className='flex flex-col items-center bg-white gap-1 mt-3'>
                                    <DropdownMenuItem>
                                        <Button variant='outline' className='rounded-md font-semibold font-tertiary py-3 w-35 cursor-pointer' onClick={() => navigate('/login')}>
                                            Sign in
                                            <LogInIcon className='text-black' />
                                        </Button>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem variant='destructive'>
                                        <Button className='rounded-md font-semibold font-tertiary py-3 w-35 cursor-pointer' onClick={handleGetStarted} >
                                            Get Started
                                            <SparkleIcon className='text-white' />
                                        </Button>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) : (
                    <div className='flex flex-row items-center gap-5 ml-auto'>
                        <a 
                          href='/login' 
                          className='font-semibold font-tertiary text-sm text-muted-foreground hover:text-black transition-colors duration-200 cursor-pointer relative after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-400 hover:after:w-full'
                        >
                          Sign in
                        </a>
                        <Button 
                          className='rounded-md font-semibold font-tertiary py-3 px-7 cursor-pointer' 
                          onClick={handleGetStarted}
                        >
                          Get Started
                          <SparkleIcon className='text-white' />
                        </Button>
                    </div>
                )}
            </div>
            <div className='flex flex-col items-center gap-10 justify-center h-full bg-gray-50'>
                <h1 className=' base:text-xl basexl:text-2xl xs:text-4xl sm:text-6xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl 3xl:text-3xl font-bold font-primary text-center max-w-7xl'>
                    Stay on top of <span className='bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text'> your Job Applications</span>
                </h1>
                <h2 className='base:text-md basexl:text-md xs:text-md sm:text-lg md:text-lg lg:text-xl xl:text-3xl 2xl:text-3xl 3xl:text-3xl font-semibold text-center text-muted-foreground font-secondary max-w-3xl'>Effortlessly track your job applications, monitor progress, and stay organized  throughout your job search journey.</h2>
                <div className='relative base:w-70 basexl:w-80 xs:w-100 sm:w-100 md:w-100 lg:w-100 xl:w-100 2xl:w-100 3xl:w-100 mb-20'>
                    <Input 
                    className='p-6 rounded-2xl font-tertiary bg-gray-100 peer  ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' 
                    placeholder='Email address'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <Button 
                    className='absolute right-2 top-1/2 transform -translate-y-1/2 rounded-2xl font-tertiary w-30 cursor-pointer group'
                    onClick={handleStartNow} >
                        Start now 
                        <ArrowRight className='transition-transform duration-300 group-hover:translate-x-1' />
                    </Button>
                </div>
                <div className='flex flex-row items-center base:gap-5 basexl:gap-5 xs:gap-5 sm:gap-5 md:gap-20 lg:gap-20 xl:gap-20 2xl:gap-20 3xl:gap-20 mb-20'>
                    <div className='flex flex-col items-center gap-2'>
                        <p className='base:text-3xl basexl:text-3xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl font-semibold font-primary'>
                            150+
                        </p>
                        <p className='base:text-xs basexl:text-xs xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-center font-semibold text-muted-foreground font-secondary'>
                            Applications Tracked
                        </p>
                    </div>
                    <Separator className='my-10' orientation='vertical' />
                    <div className='flex flex-col items-center gap-2'>
                        <p className='base:text-3xl basexl:text-3xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl font-semibold font-primary'>
                            20+
                        </p>
                        <p className='base:text-xs basexl:text-xs xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-center font-semibold text-muted-foreground font-secondary'>
                            Interviews Scheduled
                        </p>
                    </div>
                    <Separator className='my-10' orientation='vertical' />
                    <div className='flex flex-col items-center gap-2'>
                        <p className='base:text-3xl basexl:text-3xl xs:text-3xl sm:text-5xl md:text-5xl lg:text-5xl xl:text-5xl 2xl:text-5xl 3xl:text-5xl font-semibold font-primary'>
                            91%
                        </p>
                        <p className='base:text-xs basexl:text-xs xs:text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm 3xl:text-sm text-center font-semibold text-muted-foreground font-secondary'>
                            User Satisfaction
                        </p>
                    </div>
                </div>
                <div className="mt-8 animate-bounce">
                    <ArrowDown className="text-black size-15" />
                </div>
            </div>
            <div className='flex flex-col items-center pt-20 pb-50 gap-15 px-2'>
                <Card className='shadow-2xl base:px-1 basexl:px-1 xs:px-2 sm:px-5 md:px-5 lg:px-5 xl:px-5 2xl:px-5 3xl:px-5 base:rounded-none basexl:rounded-none xs:rounded-none sm:rounded-none md:rounded-none lg:rounded-xl xl:rounded-xl: 2xl:rounded-xl bg-indigo-50'>
                    <div className='grid grid-cols-12 items-center gap-4'>
                        <div className='base:col-span-12 basexl-col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6'>
                            <CardHeader>
                                <div className='flex flex-col gap-5'>
                                    <CardTitle> <Rocket style={{ width: 25, height: 25 }} className='text-indigo-900' /> </CardTitle>
                                    <CardTitle className='base:text-2xl/8 basexl:text-3xl/8 xs:text-3xl/8 sm:text-5xl/15 md:text-5xl/15 lg:text-5xl/15 xl:text-5xl/15 2xl:text-5xl/15 3xl:text-5xl/15 font-semibold font-primary max-w-sm'> Stay Organized. Stay Ahead. </CardTitle>
                                    <CardDescription className='base:text-xs basexl:text-xs xs:text-xs sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl 3xl:text-xl font-medium font-secondary max-w-2xl'>
                                        Easily keep track of your job applications with a seamless and user-friendly platform.
                                        Monitor your progress, stay informed about every update, and stay one step ahead in your job search.
                                        With everything organized in one place, you’ll never miss an opportunity—anytime, anywhere. 
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </div>
                        <div className='base:col-span-12 basexl-col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6'>
                            <img src={image2} alt='image' className='sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl' />
                        </div>
                    </div>
                </Card>
                <Card className='shadow-2xl base:px-1 basexl:px-1 xs:px-2 sm:px-5 md:px-5 lg:px-5 xl:px-5 2xl:px-5 3xl:px-5 base:rounded-none basexl:rounded-none xs:rounded-none sm:rounded-none md:rounded-none lg:rounded-xl xl:rounded-xl: 2xl:rounded-xl bg-emerald-50'>
                    <div className='grid grid-cols-12 items-center gap-4'>
                        <div className='base:col-span-12 basexl-col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6'>
                            <CardHeader>
                                <div className='flex flex-col gap-5'>
                                    <CardTitle> <ChartGantt style={{ width: 25, height: 25}} className='text-emerald-900' /> </CardTitle>
                                    <CardTitle className='base:text-2xl/8 basexl:text-3xl/8 xs:text-3xl/8 sm:text-5xl/15 md:text-5xl/15 lg:text-5xl/15 xl:text-5xl/15 2xl:text-5xl/15 3xl:text-5xl/15 font-semibold font-primary max-w-xl'> From Applications to Offers—Simplified </CardTitle>
                                    <CardDescription className='base:text-xs basexl:text-xs xs:text-xs sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl 3xl:text-xl font-medium font-secondary max-w-2xl'>
                                        Turn the chaos of job hunting into a structured path to success. Track interviews, 
                                        follow-ups, and rejections with ease, while data-driven insights help you refine your 
                                        strategy. Every step brings you closer to the job you deserve. 
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </div>
                        <div className='base:col-span-12 basexl-col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6'>
                            <img src={image3} alt='image' className='sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl' />
                        </div>
                    </div>
                </Card>
                <Card className='shadow-2xl base:px-1 basexl:px-1 xs:px-2 sm:px-5 md:px-5 lg:px-5 xl:px-5 2xl:px-5 3xl:px-5 base:rounded-none basexl:rounded-none xs:rounded-none sm:rounded-none md:rounded-none lg:rounded-xl xl:rounded-xl: 2xl:rounded-xl bg-amber-50'>
                    <div className='grid grid-cols-12 items-center gap-4'>
                        <div className='base:col-span-12 basexl-col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6'>
                            <CardHeader>
                                <div className='flex flex-col gap-5'>
                                    <CardTitle> <HandCoins style={{ width: 25, height: 25 }} className='text-amber-900' /> </CardTitle>
                                    <CardTitle className='base:text-2xl/8 basexl:text-3xl/8 xs:text-3xl/8 sm:text-5xl/15 md:text-5xl/15 lg:text-5xl/15 xl:text-5xl/15 2xl:text-5xl/15 3xl:text-5xl/15 font-semibold font-primary max-w-md'> Track Your Job Search—100% Free</CardTitle>
                                    <CardDescription className='base:text-xs basexl:text-xs xs:text-xs sm:text-xl md:text-xl lg:text-xl xl:text-xl 2xl:text-xl 3xl:text-xl font-medium font-secondary max-w-2xl'>
                                        Take control of your career journey without spending a dime. Our free job application 
                                        tracker helps you organize applications, follow up with employers, 
                                        and land interviews—all with zero cost. Because your dream job 
                                        shouldn’t come with a price tag.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </div>
                        <div className='base:col-span-12 basexl-col-span-12 xs:col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6'>
                            <img src={image4} alt='image' className='sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl' />
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
                        <li><a href='/cookies' className='hover:text-white'> Cookie Policy </a> </li>
                    </ul>
                </div>
            </div>
            {/* Copyright */}
            <div className='text-center font-secondary text-gray-400 text-sm pt-5'>
                © {new Date().getFullYear()} Traqify. All rights reserved.
            </div>
        </footer>
    </div>
    )
}

export default LandingPage