import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // ← FORCÉ pour éviter les malentendus
});

export default api;
