import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import axiosInstance from "../components/axiosInstance";
import { UserContext } from "./UserContext";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { triggerToast } = useContext(UserContext) || {};

  const isAuthenticated = !!token;

  // List of public routes
  const publicRoutes = [
    "/",
    "/register",
    "/waiting",
    "/verify", // Base path for dynamic routes
    "/login",
    "/terms",
    "/privacy",
  ];

  // Function to check if the current route is public
  const isPublicRoute = (pathname) => {
    return publicRoutes.some((route) => pathname.startsWith(route));
  };

  // Login function
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        identifier,
        password,
      });

      const { token, user } = response.data;
      Cookies.set("token", token, { expires: 1 });
      localStorage.setItem("user", JSON.stringify(user));
      setToken(token);
      setUser(user);

      triggerToast("Login successful", "success");
      navigate("/logs");
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
      throw error;
    } finally {
      setIsLoading(false);
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
    navigate("/login");
  };

  // Validate token on app load or route change
  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get("token") || localStorage.getItem("token");

      // Skip validation for public routes
      if (isPublicRoute(location.pathname)) {
        return;
      }

      if (token) {
        try {
          const response = await axiosInstance.get("/api/auth/validate", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.user);
          setToken(token);
        } catch (error) {
          console.error("Token validation failed:", error);
          logout(); // Log out if token validation fails
        }
      } else {
        // Redirect to login only if the current route is not public
        if (!isPublicRoute(location.pathname)) {
          navigate("/login");
        }
      }
    };

    validateToken();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        setUser,
        setToken,
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
