import Elysia, { t } from 'elysia';
import { UserAuthService } from '../services/user-auth-service';
import { createInsertSchema } from 'drizzle-typebox';
import { table } from '../db/schema';
import { UtilJWT } from '../utils/jwt';

export const _createUser = createInsertSchema(table.UsersTable, {
    firstName: t.String(),
    lastName: t.String(),
    email: t.String({ format: 'email'}),
    password: t.String()
})

export const UserAuthController = new Elysia({ name: 'Controller.UserAuth' })
    .use(UtilJWT)
    .use(UserAuthService)
    .post('/register', async ({ createUser, body, set }) => {
        try {
            const res = await createUser(body);
            set.status = 201;
            return res;
        }
        catch (err) {
            console.error(err);
            set.status = 500;
        }
    }, {
        body: t.Omit(_createUser, ['id']),
    })
    .post('/login', async ({ jwt, loginUser, body, set, cookie: { auth }, }) => {
        try {
            const res = await loginUser(body);
            if (res.data?.id) {
                const value = await jwt.sign({ userId: res.data.id });
                auth.set({
                    value,
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 60000,
                    path: '/'
                })
                set.status = 200;
                return res;
            }
        }
        catch (err) {
            console.error(err);
            set.status = 500;
        }
    }, {
        body: t.Pick(_createUser, ['email', 'password'])
    })
    .post('/logout', async ({ set, cookie: { auth }}) => {
        auth.set({
            value: '',
            httpOnly: true,
            path: '/',
            secure: false,
            sameSite: 'strict'
        })
        set.status = 200;
        return { message: 'User logged out successfully' };
    })