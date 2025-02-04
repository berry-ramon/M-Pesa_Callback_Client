import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import axiosInstance from "../components/axiosInstance";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for global use
  const navigate = useNavigate();
  const { triggerToast } = useContext(UserContext) || {};

  const isAuthenticated = !!token;

  // Login function
  const login = async (identifier, password) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        identifier,
        password,
      });

      const { token, user } = response.data;
      console.log("data response after login", token, user);

      // Store token and user data
      Cookies.set("token", token, { expires: 1 }); // Set token for 1 day
      localStorage.setItem("user", JSON.stringify(user)); // Store user data in localStorage
      setToken(token);
      setUser(user);

      triggerToast("Login successful", "success");
      navigate("/logs"); // Navigate to the logs page after successful login
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.error || "Login failed, please try again";
        triggerToast(errorMessage, "error");
        console.warn("Login error response:", error.response);
      } else if (error.request) {
        triggerToast("Network error, please try again", "error");
        console.warn("No response received:", error.request);
      } else {
        triggerToast("An unexpected error occurred", "error");
        console.error("Error:", error.message);
      }
      throw error; // Rethrow the error for handling in the login component
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("token");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    triggerToast("Logout successful", "success");
    navigate("/");
  };

  // Validate token on app load
  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get("token") || localStorage.getItem("token");
      if (token) {
        try {
          const response = await axiosInstance.get("/api/auth/validate", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user); // Set user from validated response
          setToken(token); // Set token
        } catch (error) {
          console.error("Token validation failed:", error);
          logout(); // Log out if token validation fails
        }
      } else {
        logout(); // Log out if no token is found
      }
    };
    validateToken(); // Run the validation on load
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
export { AuthContext };
