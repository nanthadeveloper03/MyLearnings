
import axios from 'axios';
import { encryptText, decryptText } from '../util/conceal';
import { store } from '@/store/store';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    // baseURL: process.env.NEXT_PUBLIC_CHAT_API_BASE_URL,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const auth = state?.auth;
        let data = config.data || {};

        if (auth && auth?.isAuthenticated) {
            config.headers['Authorization'] = `Bearer ${auth?.user?.accessToken}`;
            data.wsToken = auth?.user?.wsToken;
        }

        data.osType = 0; 

        if (data instanceof FormData) {
            
            config.headers['Content-Type'] = 'multipart/form-data';
            data.append('osType', 0);
            if (auth && auth?.isAuthenticated) {
                data.append('wsToken', auth?.user?.wsToken);
            }

            config.data = data;
        
        } else {
            config.headers['Content-Type'] = 'application/json';
            const encryptedData = encryptText(JSON.stringify(data));
            config.data = { payload: encryptedData };
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        // Handle decryption for JSON payload
        if (response?.data && response?.data?.payload) {
            try {
                const decryptedData = decryptText(response.data.payload);
                response.data = JSON.parse(decryptedData);
                //window.location.href = 'https://play.google.com/store/apps/details?id=com.application.ultrapro';
                return response;
            } catch (error) {
                return Promise.reject(new Error('Decryption failed'));
            }
        }
        return response;
    },
    (error) => {
        // Handle common response errors
        if (error.response?.status === 503) {
            window.location.href = '/maintenance';
        }
        if (error.response?.status === 403) {
            window.location.href = '/blocked';
        }
        if (error.response?.status === 401 || error.response?.status === 302) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
