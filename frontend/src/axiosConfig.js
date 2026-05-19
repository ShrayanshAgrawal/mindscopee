import axios from 'axios';

// In production, use the environment variable; in development, proxy handles it
if (process.env.REACT_APP_API_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

export default axios;
