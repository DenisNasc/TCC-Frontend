import axios from 'axios';

import type {AxiosRequestConfig, AxiosInstance, AxiosResponse} from 'axios';
import type ResponseLogin from 'types/fetch/login';

const getCookie = (name: string): string => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (!parts) return '';

    return parts.pop()?.split(';').shift() || '';
};

export const axiosDevInstance = (headers?: AxiosRequestConfig['headers']): AxiosInstance => {
    const axiosDev = axios.create({
        baseURL: 'http://127.0.0.1:5000/v1',
        withCredentials: true,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...headers,
        },
    });

    axiosDev.interceptors.request.use(req => {
        req.headers['X-CSRF-TOKEN'] = getCookie('csrf_access_token');
        return req;
    });

    axiosDev.interceptors.response.use((res: AxiosResponse<ResponseLogin>) => {
        return res;
    });

    return axiosDev;
};

export const axiosProdInstance = axios.create({
    baseURL: 'https://localhost:8000',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
});

export default axiosDevInstance;
