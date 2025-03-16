import { createInsertSchema } from "drizzle-typebox";
import { table } from "../db/schema";
import Elysia, { t } from "elysia";
import { JobApplicationService } from "../services/job-application-service";
import { AuthMiddleware } from "../middlewares/auth";
import { StatusCodes } from "http-status-codes";
import { UnauthorizedError } from "../utils/error";




export const _createJobApplication = createInsertSchema(table.JobApplicationsTable, {
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
    jobLink: t.Optional(t.String({ format: 'uri'})),
    notes: t.Optional(t.String({ maxLength: 60})),
    userId: t.String({ format: 'uuid' })
})

export const JobApplicationController = new Elysia({ name: 'Controller.JobApplication' })
    .use(AuthMiddleware)
    .use(JobApplicationService)
    .post('/create-job-application', async ({ jwt, createJobApplication, body, cookie: { auth }, set, error }) => {
        try {
            const currentUser = await jwt.verify(auth.value);
            if (!currentUser || !currentUser.userId) {
                throw new UnauthorizedError('Please log in to create a job application', 'Unauthorized');
            }
            body.userId = currentUser.userId;
            const res = await createJobApplication(body);
            set.status = StatusCodes.CREATED
            return res;
        }
        catch (err) {
           console.error("Error in JobApplicationController:", err);
           throw err
        }
    }, {
        body: t.Omit(_createJobApplication, ['id'])
    })
    .get('/get-job-applications', async ({ getJobApplications, jwt, cookie: { auth }, set }) => {
        try {
            const currentUser = await jwt.verify(auth.value);
            if (!currentUser || !currentUser.userId) {
                throw new UnauthorizedError('Please log in to get job applications', 'Unauthorized');
            }
            const res = await getJobApplications(currentUser.userId)
            set.status = StatusCodes.OK
        }
        catch (err) {
            console.error("Error in JobApplicationController:", err);
            throw err
        }
    })
    .patch('/update-job-application', async ({ updateJobApplication, jwt, body, cookie: { auth }, set }) => {
        try {
            const currentUser = await jwt.verify(auth.value);
            if (!currentUser || !currentUser.userId) {
                throw new UnauthorizedError('Please log in to update a job application', 'Unauthorized');
            }
            const res = await updateJobApplication(body);
            set.status = StatusCodes.OK
            return res;
        }
        catch (err) {
            console.error("Error in JobApplicationController:", err);
            throw err
        }
    }, {
        body: t.Omit(_createJobApplication, ['userId'])
    })
    .delete('/delete-job-application', async ({ deleteJobApplication, jwt, cookie: { auth }, set }) => {
        try {
            const currentUser = await jwt.verify(auth.value);
            if (!currentUser || !currentUser.userId) {
                throw new UnauthorizedError('Please log in to delete a job application', 'Unauthorized');
            }
            const res = await deleteJobApplication({ id: currentUser.userId });
            set.status = StatusCodes.NO_CONTENT
            return res;
        }
        catch (err) {
            console.error("Error in JobApplicationController:", err);
            throw err
        }
    })

