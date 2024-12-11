import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from "react-redux";

const withOutAuth = (WrappedComponent) => {

    return (props) => {
        
        const { isAuthenticated } = useSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
           
            if (isAuthenticated) {
                
                router.replace('/dashboard');
            }
        
        }, [isAuthenticated]);

        return <WrappedComponent {...props} />;
    };
};

export default withOutAuth;
