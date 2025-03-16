import Elysia from "elysia";
import { BadRequestError, ForbiddenError, InternalServerError, UnauthorizedError } from "../utils/error";
import { StatusCodes } from "http-status-codes";

export const ErrorHandler = new Elysia({ name: 'Middleware.ErrorHandler' })
    .error({
        UnauthorizedError,
        ForbiddenError,
        BadRequestError,
        InternalServerError
    })
    .decorate('handleError', ({ code, error, set }: any) => {
        const errorName = error?.name ?? 'Error';
        const errorMessage = error?.message ?? 'Something went wrong';
        switch (code) {
            case 'UnauthorizedError':
                set.status = StatusCodes.UNAUTHORIZED;
                return { name: errorName, message: errorMessage };
            case 'ForbiddenError':
                set.status = StatusCodes.FORBIDDEN;
                return { name: errorName, message: errorMessage };
            case 'BadRequestError':
                set.status = StatusCodes.BAD_REQUEST;
                return { name: errorName, message: errorMessage };
            case 'InternalServerError':
                set.status = StatusCodes.INTERNAL_SERVER_ERROR;
                return { name: errorName, message: errorMessage };
            default:
                set.status = StatusCodes.INTERNAL_SERVER_ERROR;
                return { name: 'Internal Server Error', message: 'Something went wrong' };
        }
    })
