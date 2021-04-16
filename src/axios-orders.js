import axios from 'axios';
import baseURL from '../src/utils/envvariable';
const instance = axios.create({
    baseURL:baseURL
});

export default instance;