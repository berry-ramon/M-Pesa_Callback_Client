import PropTypes from "prop-types";
import { createContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [toast, setToast] = useState({});

  const triggerToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({}), 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <UserContext.Provider value={{ toast, triggerToast }}>
      {children}
    </UserContext.Provider>
  );
};

// **Prop Validation for children**
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
export { UserContext }; // Export context separately
