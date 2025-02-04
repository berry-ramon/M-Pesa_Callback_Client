import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import Pagination from "./Pagination";
import { useAuth } from "../../context/useAuth.js"; // Import useAuth
import axiosInstance from "../axiosInstance.js";
import { UserContext } from "../../context/UserContext.jsx";

const LogTable = () => {
  const { user, logout } = useAuth(); // Get user from AuthContext
  const userId = user?.userId; // Extract userId from user object

  console.log(user);
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [copied, setCopied] = useState(false); // State to manage the copy button text
  const [totalPages, setTotalPages] = useState(1);
  const { triggerToast } = useContext(UserContext) || {};

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        if (!userId) return; // Ensure userId is available

        const response = await axiosInstance.get(
          `/api/mpesa/callback/logs/${userId}?page=${page}`
        );
        setLogs(response?.data?.logs);
        setTotalPages(response?.data?.totalPages);
      } catch (err) {
        triggerToast("Error fetching logs", "error");
        console.error("Error fetching logs:", err);
      }
    };
    // fetchLogs();
  }, [userId, page, triggerToast]);

  // Function to copy the callback URL to the clipboard
  const handleCopy = () => {
    const url = `MPESA_CALLBACK_URL=https://m-pesa-callback.vercel.app/api/mpesa/callback/${user.username}`;
    navigator.clipboard
      .writeText(url) // Write to clipboard
      .then(() => {
        setCopied(true); // Set 'copied' state to true after successful copy
        setTimeout(() => setCopied(false), 2000); // Reset the 'copied' state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err); // Error handling
      });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-mpesa-green to-mpesa-lightGreen rounded-lg shadow-2xl transform transition-all duration-500 relative">
      {/* Logout Button */}
      <button
        onClick={logout}
        className="absolute top-2 right-4 p-2 bg-green-200 bg-mpesa-red text-mpesa-white rounded-lg hover:bg-red-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md"
      >
        Logout
      </button>

      {/* Callback URL Section */}
      <div className="mb-6 mt-7 p-4 bg-mpesa-black rounded-lg text-mpesa-white border-2 border-mpesa-lightGreen">
        <p className="text-sm font-semibold">
          Add this callback URL to your <code className="font-mono">.env</code>{" "}
          file:
        </p>
        <div className="flex items-center mt-2">
          <code className="block p-3 bg-mpesa-darkGray rounded-lg text-mpesa-lightGreen font-mono break-all">
            MPESA_CALLBACK_URL=https://m-pesa-callback.vercel.app/api/mpesa/callback/
            {user?.username}
          </code>
          <button
            onClick={handleCopy}
            className="ml-4 p-2 bg-mpesa-lightGreen text-mpesa-white rounded-lg hover:bg-mpesa-green transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-md"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto rounded-lg border-2 border-mpesa-lightGreen">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-gradient-to-r from-mpesa-green to-mpesa-lightGreen text-mpesa-white">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Transaction Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Receipt Number</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Result Code</th>
              <th className="p-3 text-left">Result Description</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={log?._id}
                className={`${
                  index % 2 === 0 ? "bg-mpesa-white" : "bg-gray-50"
                } hover:bg-gradient-to-r hover:from-mpesa-lightGreen hover:to-mpesa-green hover:text-mpesa-white transition-all duration-200`}
              >
                <td className="p-3">{(page - 1) * 10 + index + 1}</td>
                <td className="p-3">
                  {dayjs(
                    log?.data.metadata?.TransactionDate?.toString(),
                    "YYYYMMDDHHmmss"
                  ).format("DD/MM/YYYY HH:mm:ss")}
                </td>
                <td className="p-3">{log?.data?.metadata?.Amount}</td>
                <td className="p-3">
                  {log?.data?.metadata?.MpesaReceiptNumber}
                </td>
                <td className="p-3">{log?.data?.metadata?.PhoneNumber}</td>
                <td className="p-3">{log?.data?.ResultCode}</td>
                <td className="p-3">{log?.data?.ResultDesc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default LogTable;
