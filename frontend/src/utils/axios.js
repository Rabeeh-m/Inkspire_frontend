
import axios from 'axios';

// Create an instance of Axios and store it in the 'apiInstance' variable. This instance will have specific configuration options.
const apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    timeout: 50000,

    // Define headers that will be included in every request made using this instance. This is common for specifying the content type and accepted response type.
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export default apiInstance;
