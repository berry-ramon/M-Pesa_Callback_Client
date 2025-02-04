import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../components/axiosInstance";
import { RotatingLines } from "react-loader-spinner";
import { useAuth } from "../context/useAuth"; // Use the useAuth hook

const Verify = () => {
  const { token } = useParams(); // Extract token from URL
  const [message, setMessage] = useState(
    "Click the button to verify your account."
  );
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleVerify = async () => {
    setIsLoading(true); // Start loading
    setMessage("Verifying your account...");

    try {
      // Pass the token as part of the URL
      const response = await axiosInstance.get(`/api/auth/verify/${token}`);
      const { token: newToken, user } = response.data;

      // Use the login function to set the token and user data
      await login(user.email, user.password); // Simulate login after verification

      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/logs"); // Redirect to logs after verification
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setMessage("Verification failed. Please try again.");
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Account Verification</h2>
        <p className="mb-4">{message}</p>

        {/* Verification Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Verify Account"}
        </button>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center mt-4">
            <RotatingLines
              strokeColor="blue"
              strokeWidth="5"
              animationDuration="0.75"
              width="50"
              visible={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
