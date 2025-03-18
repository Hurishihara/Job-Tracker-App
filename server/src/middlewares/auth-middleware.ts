import Elysia from 'elysia';
import { auth } from '../utils/auth';
import { Session, User } from 'better-auth/types';
import { UnauthorizedError } from '../utils/error';
import { StatusCodes } from 'http-status-codes';
import { createAuthMiddleware } from 'better-auth/plugins';

export const betterAuthMiddleware = new Elysia({ name: 'Middleware.BetterAuth' })
    .mount(auth.handler)
    .macro({
        auth: {
            async resolve({ request: { headers } }) {
                const session = await auth.api.getSession({
                    headers,
                });
                return {
                    user: session?.user,
                    session: session?.session
                }
            }
        }
    })
