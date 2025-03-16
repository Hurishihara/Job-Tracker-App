import Elysia, { t } from 'elysia';
import { UserAuthController } from '../controllers/user-auth-controller';


export const userAuthRouter = new Elysia({ name: 'Route.UserAuth', prefix: '/auth' })
    .use(UserAuthController)