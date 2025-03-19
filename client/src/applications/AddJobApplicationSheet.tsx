import { Button } from "@/components/ui/button"
import { BriefcaseBusiness, CalendarIcon, Plus, } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format, set } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { createJobApplicationSchema, JobApplicationData } from "@/schemas/formSchema"
import { z } from "zod"
import { Form, FormField, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/util/axios-config"

const JobApplicationSheet = () => {

    const form = useForm<JobApplicationData>({
        resolver: zodResolver(createJobApplicationSchema),
        defaultValues: {
            companyName: '',
            jobTitle: '',
            jobStatus: undefined,
            location: '',
            applicationDate: undefined,
            interviewDate: undefined,
            jobType: undefined,
            applicationMethod: '',
            jobLink: '',
            notes: ''
        }
    })
    

    const handleJobApplicationSubmit = async (value: JobApplicationData) => {
        const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
        console.log(value)
        try {
            await delay(2000);
            const res = await api.post('/job-application/create-job-application', value)
            console.log(res)
        }
        catch (err) {
            if (err instanceof z.ZodError) {
                await delay(2000)
                console.log(err.errors)
            }
            
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className='text-sm font-tertiary font-medium text-gray-600' variant='outline' size='sm'>
                    <Plus className='text-black'/> Create Job Application
                </Button>
            </SheetTrigger>
            <SheetContent side='right' className='p-3 min-w-[30rem]'>
                <SheetHeader>
                    <SheetTitle>
                        <BriefcaseBusiness style={{ height: 35, width: 35}} className='text-gray-600' />
                    </SheetTitle>
                    <SheetTitle className='text-black font-primary font-bold text-xl'>
                        Create a New Job Application
                    </SheetTitle>
                    <SheetDescription className='font-secondary  font-semibold text-md'>
                        Fill out the form below to add a new job application to your list.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form id='job-application-form' onSubmit={form.handleSubmit(handleJobApplicationSubmit)}>
                        <div className='grid gap-4 px-4 w-full'>
                            <div className='grid grid-cols-12 items-center gap-4'>
                                <FormField control={form.control} name='companyName' render={({ field }) => (
                                    <>
                                        <Label htmlFor='companyName' className='text-md font-tertiary font-medium col-span-4'>
                                            Company Name
                                        </Label>
                                        <div className='col-span-8'>
                                            <Input id='companyName' disabled={form.formState.isSubmitting} {...field} placeholder='e.g., ZXC Corporation' className='col-span-8 font-tertiary font-medium ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' />
                                            {form.formState.errors.companyName && (
                                                <FormMessage className='text-red-500 text-xs font-tertiary ml-1 mt-0.5'>
                                                    {form.formState.errors.companyName.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    </>
                                )} />
                                <FormField control={form.control} name='jobTitle' render={({ field }) => (
                                    <>
                                        <Label htmlFor='jobTitle' className='text-md font-tertiary font-medium col-span-4'>
                                            Job Title
                                        </Label>
                                        <div className='col-span-8'>
                                            <Input id='jobTitle' disabled={form.formState.isSubmitting} {...field} placeholder='e.g., Software Engineer' className='col-span-8 font-tertiary font-medium ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' />
                                            {form.formState.errors.jobTitle && (
                                                <FormMessage className='text-red-500 text-xs font-tertiary ml-1 mt-0.5'>
                                                    {form.formState.errors.jobTitle.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    </>
                                )} />
                                <FormField control={form.control} name='jobStatus' render={({ field }) => (
                                    <>
                                        <Label htmlFor='status' className='text-md font-tertiary font-medium col-span-4'>
                                            Status
                                        </Label>
                                        <Select disabled={form.formState.isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className='w-[17rem] col-span-8 font-tertiary font-medium'>
                                                <SelectValue placeholder='Select appropriate status' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel className='font-tertiary font-medium'>Application Status</SelectLabel>
                                                    <SelectItem className='font-tertiary' value='Pending'> Pending </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Initial Interview'> Initial Interview </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Final Interview'> Final Interview </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Job Offer'> Job Offer </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Rejected'> Rejected </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </>
                                )} />
                                <FormField control={form.control} name='location' render={({ field }) => (
                                    <>
                                        <Label htmlFor='location' className='text-md font-tertiary font-medium col-span-4'>
                                            Location
                                        </Label>
                                        <div className='col-span-8'>
                                            <Input id='location' disabled={form.formState.isSubmitting} {...field} placeholder='e.g., Makati, PH' className='col-span-8 font-tertiary font-medium ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' />
                                            {form.formState.errors.location && (
                                                <FormMessage className='text-red-500 text-xs font-tertiary ml-1 mt-0.5'>
                                                    {form.formState.errors.location.message}
                                                </FormMessage>
                                            )}
                                        </div>
                                    </>
                                )} />
                                <FormField control={form.control} name='applicationDate' render={({ field }) => (
                                    <>
                                        <Label htmlFor='applicationDate' className='text-md font-tertiary font-medium col-span-4'>
                                            Application Date
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button disabled={form.formState.isSubmitting} className={cn('w-[17rem] justify-start text-left font-medium col-span-8 font-tertiary')} variant='outline'>
                                                    <CalendarIcon  />
                                                    {field.value ? format(field.value, 'PPP') : <span className='font-tertiary font-medium text-gray-500' > Pick application date </span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-auto p-0' align='start'>
                                                <Calendar  mode='single' selected={field.value} onSelect={field.onChange} disabled={(date: Date) => date > new Date() || date < new Date('1900-01-01')} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </>
                                )} />
                                <FormField control={form.control} name='interviewDate' render={({ field }) => (
                                    <>
                                        <Label htmlFor='interviewDate' className='text-md font-tertiary font-medium col-span-4'>
                                            Interview Date
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button disabled={form.formState.isSubmitting} className={cn('w-[17rem] justify-start text-left font-medium col-span-8 font-tertiary')} variant='outline'>
                                                    <CalendarIcon  />
                                                    {field.value ? format(field.value, 'PPP') : <span className='font-tertiary font-medium text-gray-500' > Pick interview date </span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className='w-auto p-0' align='start'>
                                                <Calendar  mode='single' selected={field.value} onSelect={field.onChange} disabled={(date: Date) => date < new Date('1900-01-01')} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </>
                                )} />
                                <FormField control={form.control} name='jobType' render={({ field }) => (
                                    <>
                                        <Label htmlFor='jobType' className='text-md font-tertiary font-medium col-span-4'>
                                            Job Type
                                        </Label>
                                        <Select disabled={form.formState.isSubmitting} onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger className='w-[17rem] col-span-8 font-tertiary font-medium'>
                                                <SelectValue  placeholder='Select appropriate job type' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel className='font-tertiary font-medium'>Application Job Type</SelectLabel>
                                                    <SelectItem className='font-tertiary' value='Full-time'> Full-time </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Part-time'> Part-time </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Internship'> Internship </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Contractual'> Contractual </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Freelance'> Freelance </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Temporary'> Temporary </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Gig'> Gig </SelectItem>
                                                    <SelectItem className='font-tertiary' value='Seasonal'> Seasonal </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </>
                                )} />
                                <FormField control={form.control} name='applicationMethod' render={({ field }) => (
                                    <>
                                        <Label htmlFor='applicationMethod' className='text-md font-tertiary font-medium col-span-4'>
                                            Application Method
                                        </Label>
                                        <div className='col-span-8'>
                                            <Input disabled={form.formState.isSubmitting} id='applicationMethod' {...field} placeholder='e.g., LinkedIn, Indeed, Glassdoor' className='font-tertiary font-medium ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' />  
                                            {form.formState.errors.applicationMethod ? (
                                                <FormMessage className='text-red-500 text-xs font-tertiary ml-1 mt-0.5'>
                                                    {form.formState.errors.applicationMethod?.message}
                                                </FormMessage>
                                            ) : (
                                                <FormMessage className='text-xs font-tertiary text-gray-500 ml-1 mt-0.5'>
                                                    Enter the platform where you found the job listing.
                                                </FormMessage>
                                            )}  
                                        </div>
                                    </>
                                )} />
                                <FormField control={form.control} name='jobLink' render={({ field }) => (
                                    <>
                                        <Label htmlFor='jobLink' className='text-md font-tertiary font-medium col-span-4'>
                                            Job Link
                                        </Label>
                                        <div className='col-span-8'>
                                            <Input id='jobLink' disabled={form.formState.isSubmitting} {...field} placeholder='e.g., https://www.careers.zxc.com' className='font-tertiary font-medium ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' />
                                            {form.formState.errors.jobLink ? (
                                                <FormMessage className='text-red-500 text-xs font-tertiary ml-1 mt-0.5'>
                                                    {form.formState.errors.jobLink.message}
                                                </FormMessage>
                                            ) : (
                                                <FormMessage className='text-xs font-tertiary text-gray-500 ml-1 mt-0.5'>
                                                    Enter the URL of the job listing.
                                                </FormMessage>
                                            )}
                                        </div>
                                    </>
                                )} />
                                <FormField control={form.control} name='notes' render={({ field }) => (
                                    <>
                                        <Label htmlFor='notes' className='text-md font-tertiary font-medium col-span-4'>
                                            Notes
                                        </Label>
                                        <div className='col-span-8'>
                                            <Textarea disabled={form.formState.isSubmitting} {...field} id='notes' placeholder='e.g., Interview questions, follow-up emails, tasks to complete, interview feedback' className='h-20 resize-none overflow-y-auto font-tertiary font-medium ring-0 border-2 focus:!border-black focus-visible:ring-offset-0 focus-visible:ring-0' />
                                            {form.formState.errors.notes ? (
                                                <FormMessage id='notes' className='text-red-500 text-xs font-tertiary ml-1 mt-0.5'>
                                                    {form.formState.errors.notes.message}
                                                </FormMessage>
                                            ) : (
                                                <FormMessage className='text-xs font-tertiary text-gray-500 mt-1'>
                                                    Enter any notes or reminders about the job application.
                                                </FormMessage>
                                            )}
                                        </div>
                                    </>
                                )} />
                            </div>
                        </div>
                        <SheetFooter>
                            <div className='flex items-center justify-end gap-2'>
                                <Button type='submit' className='text-sm font-tertiary font-medium text-white'>
                                    {form.formState.isSubmitting ? (
                                          <svg
                                            className="animate-spin mr-2"
                                            fill="none"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <circle
                                              cx="10"
                                              cy="10"
                                              r="8"
                                              stroke="currentColor"
                                              strokeWidth="2"
                                              className="stroke-gray-300"
                                            />
                                            <path
                                              fill="currentColor"
                                              d="M18 10c0 4.4183-3.5817 8-8 8s-8-3.5817-8-8h2c0 3.3137 2.6863 6 6 6s6-2.6863 6-6h2z"
                                            />
                                          </svg>
                                        ) : (
                                          <Plus className="text-white" />
                                    )}
                                    Create Job Application 
                                </Button>
                            </div>
                        </SheetFooter>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export default JobApplicationSheet