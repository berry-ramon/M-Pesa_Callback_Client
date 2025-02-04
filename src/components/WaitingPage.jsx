import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner"; // For loading animation
import { UserContext } from "../context/UserContext";
import axiosInstance from "./axiosInstance";
import Cookies from "js-cookie"; // Import js-cookie

const WaitingPage = () => {
  const [isResending, setIsResending] = useState(false);
  const { triggerToast } = useContext(UserContext) || {};

  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("userEmail");
  // Function to resend the verification email
  const handleResendEmail = async () => {
    setIsResending(true);

    // Retrieve the email from localStorage

    if (!storedEmail) {
      setIsResending(false); // Reset the loading state
      triggerToast("No email found. Please register again.", "error");
      navigate("/register");
      return;
    }

    try {
      // Check if the user's email is already verified
      const response = await axiosInstance.post(
        "/api/auth/check-verification",
        {
          email: storedEmail, // Include the email in the request body
        }
      );

      // If email is already verified, inform the user and guide them on next steps
      if (response.data.isVerified) {
        triggerToast(
          "Your email is already verified. Proceed to login.",
          "info"
        );
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        return;
      }

      // Resend verification email if not verified
      await axiosInstance.post("/api/auth/resend-verification-email", {
        email: storedEmail, // Include the email in the request body
      });

      triggerToast("Resend Verification Email Successful", "success");
    } catch (error) {
      triggerToast(
        "Failed to resend verification email. Please try again.",
        "error"
      );
    } finally {
      setIsResending(false);
    }
  };

  // Poll the backend to check if the user's email is verified
  useEffect(() => {
    // Check if there's a stored token
    const token = Cookies.get("token"); // Get token from cookies

    if (token) {
      // If token exists, check if it is expired
      const tokenExpiry = JSON.parse(atob(token.split(".")[1]))?.exp;
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (tokenExpiry && tokenExpiry > currentTime) {
        // Token is valid and not expired
        navigate("/logs"); // Redirect to logs page
        return; // Prevent further checks
      }
    }

    // Proceed with the usual check (polling verification)
    const interval = setInterval(async () => {
      try {
        const response = await axiosInstance.get(
          `/api/auth/check-verification?email=${storedEmail}`
        );

        if (response.data.isVerified) {
          clearInterval(interval); // Clear the polling
          navigate("/login"); // Redirect to login after verification
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-green-800 mb-4">
          Verify Your Email
        </h1>
        <p className="text-gray-700 mb-6">
          We&apos;ve sent a verification link to your email. Please check your
          inbox and click the link to verify your account.
        </p>

        {/* Loading Animation */}
        <div className="flex justify-center mb-6">
          <RotatingLines
            strokeColor="green"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          />
        </div>

        {/* Resend Email Button */}
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
};

export default WaitingPage;
