import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    username: z.string().min(2, 'Username must be at least 2 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const createJobApplicationSchema = z.object({
    companyName: z.string().trim().min(1, 'Company name is required').max(60, 'Company name must be at most 60 characters long'),
    jobTitle: z.string().trim().min(1, 'Job title is required').max(30, 'Job title must be at most 20 characters long'),
    status: z.enum(['Pending', 'Initial Interview', 'Final Interview', 'Job Offer', 'Rejected']),
    location: z.string().trim().min(1, 'Location is required').max(100, 'Location must be at most 100 characters long'),
    applicationDate: z.date().optional(),
    interviewDate: z.date().optional(),
    jobType: z.enum(['Full-time', 'Part-time', 'Internship', 'Contractual', 'Freelance', 'Temporary', 'Gig', 'Seasonal']),
    applicationMethod: z.string().min(1, 'Application method is required').max(50, 'Application method must be at most 50 characters long'),
    jobLink: z.string().trim().url({ message: 'Invalid URL'}).optional(),
    notes: z.string().trim().max(60, 'Notes must be at most 60 characters long').optional()
})

export type JobApplicationData = z.infer<typeof createJobApplicationSchema>