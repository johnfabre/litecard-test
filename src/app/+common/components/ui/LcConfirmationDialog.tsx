import React from "react";

interface LcConfirmationDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}

export function LcConfirmationDialog({
  onConfirm,
  onCancel,
  children,
}: LcConfirmationDialogProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none text-black bg-black bg-opacity-20">
      <div className="relative w-auto mx-auto my-6">
        {/* Content */}
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">Confirmation</h3>
          </div>
          {/* Body */}
          <div className="relative p-6 flex-auto">{children}</div>
          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="bg-green-800 text-gray-100 active:bg-green-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
