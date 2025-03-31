import { User } from '@/types/user-types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export const useUserStore = create(
    persist<{
        user: User,
        setUser: (user: User) => void,
        clearUser: () => void
    }>(
        (set) => ({
            user: {
                id: '',
                name: '',
                email: '',
                
            },
            setUser: (user) => set({ user }),
            clearUser: () => localStorage.removeItem('user')
        }),
        {
            name: 'user',
        }
    )
)