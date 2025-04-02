import { betterAuth, BetterAuthOptions } from "better-auth";
import { customSession } from "better-auth/plugins";
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { user, session, account, verification } from '../db/schema';
import { db } from "../db/db";
import { transporter } from "../emails/email";
import { renderToStaticMarkup } from "react-dom/server";
import VerificationEmail from "../emails/VerificationEmail";


const options = {
    plugins: [
        customSession(async ({ user, session }) => {
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                session
            }
        })
    ]
} satisfies BetterAuthOptions

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
        updateAge: 60 * 60 * 24,
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60
        }
    },
    advanced: {
        cookiePrefix: 'sync',
        cookies: {
            session_token: {
                attributes: {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'lax',
                    path: '/',
                }
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification:{
        sendVerificationEmail: async ({ user, url, token }, request) =>{
            await transporter.sendMail({
                from: 'apptraqify@gmail.com',
                to: user.email,
                subject: 'Verify your email address',
                html: renderToStaticMarkup(VerificationEmail({ email: user.email, username: user.name, token: token }) )
            })
        },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
    },
    trustedOrigins: ['http://localhost:5173'],
    ...options,
    plugins: [
        ...(options.plugins ?? []),
        customSession(async ({ user, session }) => {
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                },
                session
            }
        }, options)
    ]
})