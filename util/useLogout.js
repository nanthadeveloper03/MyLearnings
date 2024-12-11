import { useRouter } from 'next/navigation';
import { showNotification } from './common';

const useLogout = () => {
  const router = useRouter();
  const logout = async (isRedirect = 0) => {
    try {
      showNotification(true, 'Logged out successfully!')
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
