import { createInsertSchema } from 'drizzle-typebox';
import { table } from '../db/schema';
import Elysia, { t } from 'elysia';
import { JobApplicationService } from '../services/job-application-service';
import { StatusCodes } from 'http-status-codes';
import { InternalServerError, UnauthorizedError } from '../utils/error';
import { betterAuthMiddleware } from '../middlewares/auth-middleware';

export const _createJobApplication = createInsertSchema(table.jobApplication, {
    companyName: t.String({ minLength: 1, maxLength: 60 }),
    jobTitle: t.String({ minLength: 1, maxLength: 30}),
    jobStatus: t.Enum({
        Pending: 'Pending',
        InitialInterview: 'Initial Interview',
        FinalInterview: 'Final Interview',
        JobOffer: 'Job Offer',
        Rejected: 'Rejected'
    }),
    location: t.String({ minLength: 1, maxLength: 100 }),
    applicationDate: t.Optional(t.Union([t.Date(), t.Null()])),
    interviewDate: t.Optional(t.Union([t.Date(), t.Null()])),
    jobType: t.Enum({
        FullTime: 'Full-time',
        PartTime: 'Part-time',
        Internship: 'Internship',
        Contractual: 'Contractual',
        Freelance: 'Freelance',
        Temporary: 'Temporary',
        Gig: 'Gig',
        Seasonal: 'Seasonal'
    }),
    applicationMethod: t.String({ minLength: 1, maxLength: 50 }),
    jobLink: t.Optional(t.String({ format: 'uri' })),
    notes: t.Optional(t.String({ maxLength: 150 })),
    userId: t.String()
})

export const JobApplicationRoutes = new Elysia({ name: 'Controller.JobApplication', prefix: '/job-application' })   
    .use(JobApplicationService)
    .use(betterAuthMiddleware)
    .post('/create-job-application', async ({ user, createJobApplication, body, set }) =>  {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to create a job application', 'Unauthorized');
                
            }
            const res = await createJobApplication(body, user.id);
            set.status = StatusCodes.CREATED
            return res;
        }
        catch (err) {
            console.error('Error in JobApplicationController:', err);
            throw err
        }
    }, {
        body: t.Omit(_createJobApplication, ['id', 'userId']),
        auth: true,
        detail: {
            summary: 'Create a job application',
            description: 'Create a new job application',
            tags: ['Job Application'],
            security: [
                {
                    sessionAuth: []
                }
            ]
        },
    })
    .get('/get-job-applications', async ({ user, getJobApplications, set }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to get job applications', 'Unauthorized');
            }

            const res = await getJobApplications(user.id);
            set.status = StatusCodes.OK;
            return res;
            }
        catch (err) {
            console.error('Error in JobApplicationController:', err);
            throw err
        }
    }, {
        auth: true,
        detail: {
            summary: 'Get job applications',
            description: 'Get all job applications for a user',
            tags: ['Job Application'],
            security: [
                {
                    sessionAuth: []
                }
            ]
        }
    })
    .patch('/update-job-application/:id', async ({ user, updateJobApplication, body, params, set }) => {
        try {
            if (!user) {
                throw new UnauthorizedError('Please log in to update a job application', 'Unauthorized');
            }
            const jobApplicationId = params.id;
            const res = await updateJobApplication(body, jobApplicationId);
            set.status = StatusCodes.OK;
            return res;
        } 
        catch (err) {
            console.error('Error in JobApplicationController:', err);
            throw err
        }
    }, {
        body: t.Partial(_createJobApplication),
        params: t.Pick(_createJobApplication, ['id']),
        auth: true,
        detail: {
            summary: 'Update a job application',
            description: 'Update an existing job application',
            tags: ['Job Application'],
            security: [
                {
                    sessionAuth: []
                }
            ]
        }
    })
    .delete('/delete-job-application/:id', async ({ user, deleteJobApplication, params, set }) => {
       try {
            if (!user) {
                throw new UnauthorizedError('Please log in to delete a job application', 'Unauthorized');
            }
            console.log(user)
            const jobId = params.id;
            const res = await deleteJobApplication(jobId);
            set.status = StatusCodes.OK;
            return res;
       }
       catch (err) {
            console.error('Error in JobApplicationController:', err);
            throw err
       }
    }, {
        params: t.Pick(_createJobApplication, ['id']),
        auth: true,
        detail: {
            summary: 'Delete a job application',
            description: 'Delete an existing job application',
            tags: ['Job Application'],
            security: [
                {
                    sessionAuth: []
                }
            ]
        }
    })

