import axios from 'axios';

const api = axios.create({
  baseURL: 'http://local.host:3333/',
});

export default api;
