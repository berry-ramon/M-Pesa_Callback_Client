// axiosConfig.js
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie to access cookies

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Centralized base URL for API
  // baseURL: "https://m-pesa-callback-swnx.vercel.app",
  timeout: 10000, // Set a timeout of 10 seconds (optional)
  headers: {
    "Content-Type": "application/json", // Default content type
  },
});

// Interceptors can be added to handle request and response globally
// Example: Add Authorization token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // Fetch token from cookies using js-cookie
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to headers if exists
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, like redirecting to login
      console.error("Unauthorized, redirecting...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
