import 'dotenv/config'
import { jwt } from "@elysiajs/jwt";
import Elysia, { t } from "elysia";

export const UtilJWT = new Elysia({ name: 'Utils.JWT' })
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET!,
        schema: t.Object({
            userId: t.String({ format: 'uuid' })
        })
    }))
