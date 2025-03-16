import Elysia from 'elysia';
import { db } from '../db/db';
import { CreateUserDTO, LoginUserDTO } from '../types/user-auth-types';
import { UsersTable } from '../db/schema';
import { eq } from 'drizzle-orm';

export const UserAuthService = new Elysia({ name: 'Service.UserAuth' })
    .decorate('createUser', async ({ firstName, lastName, email, password }: CreateUserDTO) => {
        try {
            const hashedPassword = await Bun.password.hash(password, {
                algorithm: 'bcrypt',
                cost: 15
            })
            const res = await db.insert(UsersTable).values({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashedPassword
            }).returning()
            return { message: 'User created successfully', id: res[0].id};
        }
        catch (err) {
            console.error(err);
            return { message: 'Error creating user', data: null };
        }
    })
    .decorate('loginUser', async ({ email, password }: LoginUserDTO) => {
        try {
            const user = await db.query.UsersTable.findFirst({
                columns: {
                    id: true,
                    email: true,
                    password: true
                },
                where: eq(UsersTable.email, email)
            })
            if (!user?.email) {
                return { message: 'User not found', data: null}
            }
            const isPasswordValid = await Bun.password.verify(password, user.password)
            if (!isPasswordValid) {
                return { message: 'Invalid password', data: null}
            }
            return { message: 'User logged in successfully', data: user };
        }
        catch (err) {
            console.error(err);
            return { message: 'Error logging in user', data: null };
        }
    })
   