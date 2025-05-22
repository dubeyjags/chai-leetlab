import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: import.meta.env.mode === 'development' ? 'http://localhost:8081/api/v1' : '/api/v1',
  // baseURL: 'http://localhost:8081/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}); 