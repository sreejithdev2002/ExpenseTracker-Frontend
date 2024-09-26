import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((request) => {
    const token = localStorage.getItem("expense_JWT");
    request.headers.Authorization = `Bearer ${token}`;
    return request;
})

export default axiosInstance;