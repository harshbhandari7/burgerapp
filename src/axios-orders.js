import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerap-b87a5.firebaseio.com/',
});

export default instance;