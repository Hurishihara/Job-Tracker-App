import Elysia, { Context, InternalServerError } from 'elysia';
import { userAuthRouter } from "./user-auth-route";
import { jobApplicationRouter } from "./job-application-route";
import { chartDataRouter } from './chart-data-route';
import { ErrorHandler } from '../middlewares/error-handler';

export const router = new Elysia({ prefix: '/api', name: 'Route.Main'})
    .use(ErrorHandler)
    .onError(({ handleError, code, error, set }) => {
        return handleError({ code, error, set })
    })
    .use(userAuthRouter)
    .use(jobApplicationRouter)
    .use(chartDataRouter)