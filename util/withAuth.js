import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {

    return (props) => {
        
        const { isAuthenticated } = useSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
           
            if (!isAuthenticated) {
                
                router.replace('/login');
            }
        
        }, [isAuthenticated]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
