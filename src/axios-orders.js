import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-app-845dc.firebaseio.com'
});

export default instance;
