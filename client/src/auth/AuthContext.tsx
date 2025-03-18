import { authClient } from "@/util/auth-client";
import { set } from "date-fns";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface AuthContextProps {
    isAuthenticated: boolean,
    loading: boolean,
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [ isAuthenticated , setIsAuthenticated ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ data, setData ] = useState<any>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: session } = await authClient.getSession();
                if (session?.user) {
                    console.log('User is authenticated', session.user);
                    setIsAuthenticated(true);
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