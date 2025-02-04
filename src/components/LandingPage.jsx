import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="p-4 bg-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">
            MPESA Integration
          </h1>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 py-16 text-center"
      >
        <h1 className="text-5xl font-bold text-green-800 mb-4">
          Seamless MPESA Integration
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Test and integrate MPESA APIs in a secure sandbox environment.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
          >
            Get Started <FaArrowRight className="ml-2" />
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center"
          >
            Sign Up <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </motion.div>

      {/* Disclaimer Section */}
      <div className="bg-green-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">
            <strong>Disclaimer:</strong> This platform is for{" "}
            <strong>sandbox testing only</strong> and should not be used in
            production.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8 mt-16 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Developer Info */}
            <div className="bg-green-50 p-6 rounded-lg shadow-neumorphic">
              <h3 className="text-lg font-bold text-green-600 mb-4">
                Developer
              </h3>
              <p className="text-gray-700 mb-4">Brandon Kimathi</p>
              <div className="flex space-x-4">
                {/* Email Link */}
                <a
                  href="mailto:berryramon12@gmail.com"
                  className="text-gray-700 hover:text-green-600 transition duration-300"
                >
                  <i className="bx bxl-gmail bx-md"></i>
                </a>
                {/* GitHub Link */}
                <a
                  href="https://github.com/berry-ramon/M-Pesa_Callback_Client.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-green-600 transition duration-300"
                >
                  <i className="bx bxl-github bx-md"></i>
                </a>
                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/your-linkedin" // Replace with your LinkedIn profile link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-green-600 transition duration-300"
                >
                  <i className="bx bxl-linkedin bx-md"></i>
                </a>
                {/* Twitter Link */}
                <a
                  href="https://twitter.com/your-twitter" // Replace with your Twitter profile link
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-green-600 transition duration-300"
                >
                  <i className="bx bxl-twitter bx-md"></i>
                </a>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-green-50 p-6 rounded-lg shadow-neumorphic">
              <h3 className="text-lg font-bold text-green-600 mb-4">
                Terms & Conditions
              </h3>
              <Link
                to="/terms"
                className="text-gray-700 hover:text-green-600 hover:underline transition duration-300"
              >
                Read Terms & Conditions
              </Link>
            </div>

            {/* Privacy Policy */}
            <div className="bg-green-50 p-6 rounded-lg shadow-neumorphic">
              <h3 className="text-lg font-bold text-green-600 mb-4">
                Privacy Policy
              </h3>
              <Link
                to="/privacy"
                className="text-gray-700 hover:text-green-600 hover:underline transition duration-300"
              >
                Read Privacy Policy
              </Link>
            </div>
          </div>

          {/* Contribution Message */}
          <div className="mt-8 text-center">
            <p className="text-gray-700">
              Want to contribute?{" "}
              <a
                href="https://github.com/berry-ramon/M-Pesa_Callback_Client.git" // Replace with your GitHub repo link
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition duration-300"
              >
                Visit the GitHub repository
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
