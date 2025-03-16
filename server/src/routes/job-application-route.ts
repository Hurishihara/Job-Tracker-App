import Elysia from 'elysia';
import { JobApplicationController } from '../controllers/job-application-controller';

export const jobApplicationRouter = new Elysia({ prefix: '/job-application', name: 'Route.JobApplication' })
    .use(JobApplicationController)
