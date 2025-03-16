import Elysia from "elysia";
import { UtilJWT } from "../utils/jwt";

export const AuthMiddleware = new Elysia({ name: 'Middleware.Auth' })
    .use(UtilJWT)
    .onBeforeHandle(async ({ cookie: { auth }, jwt, set, error }) => {
        if (!auth?.value) {
            return error(401, "Please login to access this resource");  // ❌ No token provided
        }

        try {
            const user = await jwt.verify(auth.value);
            if (!user || !user.userId) {  // ❌ Token exists but userId is missing
                return error(401, "Invalid token");
            }

            // ✅ Attach userId to the request context
            Object.assign(auth, { userId: user.userId });
        } catch (err) {
            return error(401, "Unauthorized: Invalid or expired token");
        }
    });