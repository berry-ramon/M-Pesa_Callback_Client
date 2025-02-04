/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const ToastNotification = () => {
  const { toast } = useContext(UserContext) || {}; ;

  if (!toast?.message) return null; // If no message, don't render anything

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white ${
        toast?.type === "success"
          ? "bg-green-500"
          : toast?.type === "error"
            ? "bg-red-500"
            : toast?.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
      }`}
    >
      <p>{toast?.message}</p>
    </div>
  );
};
