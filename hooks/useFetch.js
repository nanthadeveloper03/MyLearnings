import useSWR from 'swr';
import axiosInstance from '../lib/axios';

const axiosFetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const useFetch = (endpoint, options = {}) => {
    
    const { data, error, isLoading, mutate } = useSWR(endpoint, axiosFetcher, options);

    return {
        data,
        error,
        isLoading: !data && !error,
        mutate,
    };
};

export default useFetch;