import { useUserStore } from "@/store/user-store";
import { authClient } from "@/util/auth-client";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    isAuthenticated: boolean,
    loading: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { user, setUser } = useUserStore()
    const [ isAuthenticated , setIsAuthenticated ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);
    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

    useEffect(() => {

        const checkAuth = async () => {
            try {
                const { data: session } = await authClient.getSession();
                if (session?.user) {
                    console.log('User is authenticated', session.session);
                    await delay(1000); // Simulate a delay for loading state
                    setIsAuthenticated(true);
                    setUser({
                        id: session.user.id,
                        name: session.user.name,
                        email: session.user.email,
                    });
                }
                else {
                    setIsAuthenticated(false);
                }
            }
            catch (err) {
                console.error('Error checking auth', err);
                setIsAuthenticated(false);
            }
            finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, setIsAuthenticated }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}