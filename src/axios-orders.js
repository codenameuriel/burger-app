import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://burger-app-845dc.firebaseio.com'
});

export default axiosInstance;
