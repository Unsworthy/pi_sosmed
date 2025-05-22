import axios from 'axios';

export const APISERVICE = () => axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 100000,
})

export const config = (token) => ({
    Headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
    }
})