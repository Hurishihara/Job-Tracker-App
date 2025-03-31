import { createAuthClient } from 'better-auth/react'
import { customSessionClient } from 'better-auth/client/plugins'
import type { auth } from '../../../server/src/utils/auth'

export const authClient = createAuthClient({
    baseURL: 'http://localhost:8000',
    plugins: [ customSessionClient<typeof auth>()]
})