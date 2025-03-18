import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from "@/auth/AuthContext"

const Private = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

export default Private