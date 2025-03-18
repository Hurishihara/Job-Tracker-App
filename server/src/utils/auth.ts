import { betterAuth } from "better-auth";
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { user, session, account, verification } from '../db/schema';
import { db } from "../db/db";
import { bearer, openAPI } from 'better-auth/plugins'

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema: {   
            user,
            session,
            account,
            verification,
        },
    }),
    session: {
        expiresIn: 2 * 86400,
    },
    advanced: {
        cookiePrefix: 'sync',
        cookies: {
            session_token: {
                attributes: {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 2 * 86400,
                    path: '/',
                }
            }
        }
    },
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: ['http://localhost:5173'],
})