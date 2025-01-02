import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth'; 
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';

// Define a custom Axios instance creator function
const useAxios = () => {
    const accessToken = Cookies.get('access_token');
    const refreshToken = Cookies.get('refresh_token');

    // Create an Axios instance with base URL and access token in the headers
    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Add an interceptor to the Axios instance
    axiosInstance.interceptors.request.use(async (req) => {
        // Check if the access token is expired. If not expired, return the original request
        if (!isAccessTokenExpired(accessToken)) {
            return req; 
        }

        // If the access token is expired, refresh it
        const response = await getRefreshToken(refreshToken);
        // Update the application with the new access and refresh tokens
        setAuthUser(response.access, response.refresh);

        // Update the request's 'Authorization' header with the new access token. Return the updated request
        req.headers.Authorization = `Bearer ${response?.data?.access}`;
        return req;
    });

    return axiosInstance; 
};

export default useAxios;


