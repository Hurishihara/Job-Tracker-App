import Elysia, { Context, InternalServerError, t } from 'elysia';
import { jobApplicationRouter } from "./job-application-route";
import { chartDataRouter } from './chart-data-route';
import { ErrorHandler } from '../middlewares/error-handler';
import { auth } from '../utils/auth';
import { betterAuthMiddleware } from '../middlewares/auth-middleware';
import { JobApplicationRoutes } from '../controllers/job-application-controller';
import { userAuthRoutes } from '../controllers/user-auth-controller';


export const router = new Elysia({ prefix: '/api', name: 'Route.Main'})
    .use(ErrorHandler)
    .onError(({ handleError, code, error, set }) => {
        return handleError({ code, error, set })
    })
    .use(JobApplicationRoutes)
    .use(userAuthRoutes)