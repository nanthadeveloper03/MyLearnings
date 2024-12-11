// import axios from 'axios';
// import { encryptText, decryptText } from '../util/conceal'
// import { store } from '@/store/store';

// const axiosInstance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// axiosInstance.interceptors.request.use(

//     (config) => {
        
//         if (config.url.includes('/account/imgupload')) {
//             config.headers['Content-Type'] = 'multipart/form-data';
//         }

//         let data = config.data || {};

//         const state = store.getState();
//         const auth = state?.auth;

//         if (auth && auth?.isAuthenticated) {

//             config.headers['Authorization'] = `Bearer ${auth?.user?.accessToken}`;
//             data.wsToken = auth?.user?.wsToken;
//         }

//         data.osType = 0; // 0-web, 1-Android, 2-IOS

//         config.data = data;

//         if (config.data) {

//             const encryptedData = encryptText(JSON.stringify(config.data));
//             config.data = { payload: encryptedData };
//         }

//         return config;

//     }, (error) => {

//         return Promise.reject(error);
//     }
// );


// axiosInstance.interceptors.response.use(

//     (response) => {

//         if (response?.data && response?.data?.payload) {

//             try {
                
//                 const decryptedData = decryptText(response.data.payload);
//                 response.data = JSON.parse(decryptedData);
//                 return response;
            
//             } catch (error) {
                
//                 return Promise.reject(new Error('Decryption failed'));
//             }
//         }

//     }, (error) => {

//         //console.error('Response error:', error.response || error.message);

//         if (error.response?.status === 503) {

//             window.location.href = '/maintenance'
//         }

//         if (error.response?.status === 403) {

//             window.location.href = '/blocked'
//         }

//         if (error.response?.status === 401 || error.response?.status === 302) {

//             window.location.href = '/login'
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;