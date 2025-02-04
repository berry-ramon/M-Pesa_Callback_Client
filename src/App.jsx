import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import "boxicons/css/boxicons.min.css";
import Register from "./components/Auth/Register";
import LogTable from "./components/Logs/LogTable";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import TermsAndConditions from "./components/TermsAndConditions";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Verify from "./components/Auth/Verify";
import { ToastNotification } from "./components/ToastNotifications/ToastNotification";
import UserContextProvider from "./context/UserContext";
import WaitingPage from "./components/WaitingPage";
// import TermsAndConditions from "./components/TermsAndConditions"; // Import T&C Page
// import PrivacyPolicy from "./components/PrivacyPolicy"; // Import Privacy Policy Page

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <AuthProvider>
          <ToastNotification />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/waiting" element={<WaitingPage />} />{" "}
            <Route path="/verify/:token" element={<Verify />} />
            <Route path="/login" element={<Login />} />
            <Route path="/terms" element={<TermsAndConditions />} />{" "}
            <Route path="/privacy" element={<PrivacyPolicy />} />{" "}
            <Route element={<ProtectedRoute />}>
              <Route path="/logs" element={<LogTable />} />
            </Route>
          </Routes>
        </AuthProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
