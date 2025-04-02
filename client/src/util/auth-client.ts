import { createAuthClient } from 'better-auth/react'
import { customSessionClient } from 'better-auth/client/plugins'
import type { auth } from '../../../server/src/utils/auth'

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_API_URL,
    plugins: [ customSessionClient<typeof auth>()]
})