import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8"
    >
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Privacy Policy
        </h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide when you register, such as your
            email, username, and password.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide and improve the platform,
            communicate with you, and ensure security.
          </p>
          <h2 className="text-xl font-bold text-green-700">3. Data Security</h2>
          <p>
            We implement security measures to protect your data. However, no
            method of transmission over the internet is 100% secure.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            4. Third-Party Services
          </h2>
          <p>
            We do not share your information with third parties except as
            required by law or to provide the platform&apos;s services.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            5. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
