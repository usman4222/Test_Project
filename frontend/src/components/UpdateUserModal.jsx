import React from "react";

const UpdateUserModal = ({
  isOpen,
  onClose,
  onUpdate,
  newUsername,
  setNewUsername,
  newEmail,
  setNewEmail,
  newRole,
  setNewRole,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex z-20 justify-center items-center bg-transparent bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Update User Details</h2>

        {/* Username Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter new username"
        />

        {/* Email Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter new email"
        />

        {/* Role Input */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <input
          type="text"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
          placeholder="Enter new role"
        />

        <div className="flex justify-between">
          <button
            onClick={onUpdate}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer"
          >
            Update User
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
