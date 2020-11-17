import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.dnd5eapi.co/api',
});

export default api;
