// Importing axios to create an instance with a base configuration.
import axios from 'axios';

// Using the NEXT_PUBLIC_API_URL environment variable for the API base URL, defaulting to an empty string if not provided.
const baseURL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * @description Creates an axios instance configured with a base URL for user-related API requests.
 * The base URL is constructed using the environment variable `NEXT_PUBLIC_API_URL` or defaults to an empty string.
 *
 * @see https://axios-http.com/docs/instance for more details on creating axios instances.
 */
const axiosInstance = axios.create({
  baseURL: `${baseURL}`, // Setting the base URL for user-related API requests.
});

export default axiosInstance;
