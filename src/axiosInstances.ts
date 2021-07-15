import axios from 'axios';

export const axiosDevInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000/v1',
    timeout: 10000,
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
});

export const axiosProdInstance = axios.create({
    baseURL: 'https://localhost:8000',
    timeout: 1000,
    headers: {'Content-Type': 'application/json'},
});

export default axiosDevInstance;
