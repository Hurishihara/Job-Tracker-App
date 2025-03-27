import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "@/auth/AuthContext";
import { Skeleton } from '@/components/ui/skeleton';
import Layout from '../Layout';

const Private = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <Layout> 
                <div className="grid grid-cols-12 gap-5 p-5">
                    {/* Pie Chart Placeholder */}
                    <div className="col-span-6">
                        <Skeleton className="h-[400px] w-[40vw] rounded-lg" /> 
                    </div>
                    
                    {/* Line Chart Placeholder */}
                    <div className="col-span-6">
                        <Skeleton className="h-[400px] w-[40vw]  rounded-lg" />
                    </div>

                    {/* Table Placeholder */}
                    <div className="col-span-12">
                        <Skeleton className="h-[400px] w-[81vw] rounded-lg" />
                    </div>
                </div>
            </Layout>
        );
    }

    return isAuthenticated ? (
        <div className='bg-muted'>
            <Layout>
                <Outlet />    
            </Layout>
        </div>
    ) : <Navigate to='/' />;
};

export default Private;
