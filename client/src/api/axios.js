import axios from 'axios';

// const API_URL = 'http://localhost:4000';
const API_URL = "http://192.168.1.7:4000";

const instance = axios.create({ baseURL: `${API_URL}` });
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default instance;