
import axios from 'axios';

const instance = axios.create({
        baseURL : 'https://jsonplaceholder.typicode.com/posts/',
});

instance.defaults.headers.common['Authorisation'] = 'Auth token ';

export default instance;