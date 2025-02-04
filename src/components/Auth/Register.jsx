import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { UserContext } from "../../context/UserContext";
import { RotatingLines } from "react-loader-spinner"; // Import the spinner

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const { triggerToast } = useContext(UserContext) || {};

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    try {
      const response = await axiosInstance.post("/api/auth/register", {
        email,
        password,
        username,
      });

      if (response.status === 201) {
        localStorage.setItem("userEmail", email);
        triggerToast(`${response.data.message}`, "success");
        setTimeout(() => {
          navigate("/waiting"); // Redirect to waiting page after successful registration
        }, 3000); // Redirect after 3 seconds
      }
    } catch (err) {
      if (err.response) {
        triggerToast(err.response.data.error, "error");
        console.error(`Registration failed:`, err.response.data.error, "error");
      } else {
        triggerToast(
          `Registration failed: Error: ${err.response.data.error}`,
          "error"
        );
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
            required
          />

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Registering..." : "Register"}
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
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
