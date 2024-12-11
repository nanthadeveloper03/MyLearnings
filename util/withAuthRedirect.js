import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";

const withAuthRedirect = (WrappedComponent) => {
    return (props) => {
        const { isAuthenticated } = useSelector((state) => state.auth);
        const router = useRouter();

        useEffect(() => {
            if (isAuthenticated) {
                router.replace('/dashboard');
            } else {
                router.replace('/login');
            }
        }, [isAuthenticated, router]);

        return null;
    };
};

export default withAuthRedirect;
