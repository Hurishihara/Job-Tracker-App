import { Context } from "elysia";
import { auth } from "./auth";

const betterAuthView = async (context: Context) => {
    const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET', 'PUT', 'DELETE'];
    console.log('Better Auth View', context.request)
    if (BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
        return await auth.handler(context.request);
    }
    else {
        context.error(405);
    }
}


export default betterAuthView;