import React from "react";

export default function Modal({ children, onClose ,isOpen, title}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md">
        {/* Modal Header */}
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
