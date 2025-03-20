import Elysia from 'elysia';
import { ErrorHandler } from '../middlewares/error-handler';
import { JobApplicationRoutes } from '../controllers/job-application-controller';
import { userAuthRoutes } from '../controllers/user-auth-controller';
import { ChartDataRoutes } from '../controllers/chart-data-controller';


export const router = new Elysia({ prefix: '/api', name: 'Route.Main'})
    .use(ErrorHandler)
    .onError(({ handleError, code, error, set }) => {
        return handleError({ code, error, set })
    })
    .use(JobApplicationRoutes)
    .use(userAuthRoutes)
    .use(ChartDataRoutes)