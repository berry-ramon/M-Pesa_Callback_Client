import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8"
    >
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Terms & Conditions
        </h1>
        <div className="space-y-4 text-gray-700">
          <p>
            Welcome to the MPESA Integration Platform. By using this platform,
            you agree to comply with and be bound by the following terms and
            conditions.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using this platform, you agree to these terms and
            conditions. If you do not agree, please do not use the platform.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            2. Sandbox Testing Only
          </h2>
          <p>
            This platform is for <strong>sandbox testing only</strong> and
            should not be used in production environments.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            3. User Responsibilities
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            4. Limitation of Liability
          </h2>
          <p>
            The platform is provided as is without warranties of any kind. We
            are not liable for any damages arising from the use of this
            platform.
          </p>
          <h2 className="text-xl font-bold text-green-700">
            5. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Your
            continued use of the platform constitutes acceptance of the updated
            terms.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;
