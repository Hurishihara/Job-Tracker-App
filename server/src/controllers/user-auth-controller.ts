import Elysia, { t } from 'elysia';
import { auth } from '../utils/auth';
import { BetterAuthError } from 'better-auth';
import { BadRequestError, ForbiddenError, InternalServerError, UnauthorizedError } from '../utils/error';



export const userAuthRoutes = new Elysia({ name: 'Controller.Auth', prefix: '/auth' })
    .post('/sign-in', async ({ body, set }) => {
        try {
            const { email, password } = body;
            const { headers, response } = await auth.api.signInEmail({
                body: {
                    email,
                    password
                },
                returnHeaders: true,
            });
            const cookies = headers.get('set-cookie');
            set.status = 200;
            if (cookies) {
                set.headers['set-cookie'] = cookies;
            }
            return {
                redirect: true,
                token: response.token,
                url: '/',
                user: response.user
            }
        }
        catch (err: unknown) {
            if (err instanceof BetterAuthError || err instanceof Error) {
                if (err.message === 'Invalid email or password' || err.message === 'User not found') {
                    console.error('Error:', err)
                    throw new UnauthorizedError('Invalid email or password', 'Login failed');
                }
                else if (err.message === 'Email not verified') {
                    console.error('Error:', err)
                    throw new ForbiddenError('Check your email for verification.', 'Email not verified');
                }
                console.error('Error:', err)
                throw new InternalServerError('Something went wrong', 'Oops! Unexpected error occurred');
            }
        }
    }, {
        body: t.Object({
            email: t.String({ format: 'email', error() {
                throw new BadRequestError('Invalid email', 'Bad Request')
            } }),
            password: t.String({ minLength: 7, maxLength: 50, error() {
                throw new BadRequestError('Password must be at least 7 characters and at most 50 characters', 'Bad Request')
            } })
        }),
        detail: {
            summary: 'Sign in to the application',
            description: 'Authenticate a user and return a token',
            tags: ['Authentication']
        }
    })
    .post('/sign-up', async ({ body, set }) => {
        try {
            const { email, password, username } = body;
            const user = await auth.api.signUpEmail({ body: { email, password, name: username, image: '' }});
            set.status = 201;
            return user;
        }
        catch (err: unknown) {
            if (err instanceof BetterAuthError || err instanceof Error) {
                if (err.message === 'User already exists') {
                    throw new BadRequestError('Email already exists', 'Bad Request')
                }
                console.log('Error:', err)
            }
        }
    }, {
        body: t.Object({
            email: t.String({ format: 'email', error() {
                throw new BadRequestError('Invalid email', 'Bad Request')
            } }),
            password: t.String({ minLength: 7, maxLength: 50, error() {
                throw new BadRequestError('Password must be at least 7 characters and at most 50 characters', 'Bad Request')
            } }),
            username: t.String({ minLength: 3, maxLength: 50, error() {
                throw new BadRequestError('Username must be at least 3 characters and at most 50 characters', 'Bad Request')
            } })
        }),
        detail: {
            summary: 'Sign up for the application',
            description: 'Create a new user account',
            tags: ['Authentication']
        }
    })
    .post('/verify-email', async ({ set, body }) => {
        try {
            const { token } = body;
            const res = await auth.api.verifyEmail({
                query: { token },
            })
            set.status = 200;
            return res
        }
        catch (err) {
            set.status = 500;
            console.log(err)
        }
    }, {
        body: t.Object({
            token: t.String({ error () {
                throw new BadRequestError('Invalid token', 'Bad Request')
            }})
        }),
        detail: {
            summary: 'Verify email address',
            description: 'Verify the user\'s email address',
            tags: ['Authentication']
        }
    })
