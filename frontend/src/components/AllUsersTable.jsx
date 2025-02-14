import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers, updateUser } from "../actions/UserAction";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import Loading from "./Loading";

const AllUsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const dispatch = useDispatch();
  let abortController = new AbortController();

  const { loading, users } = useSelector(
    (state) => state.allUsers
  );

  console.log("users",users);
  

  useEffect(() => {
    dispatch(getAllUsers(currentPage, rowsPerPage));
  }, [dispatch, currentPage, rowsPerPage]);

  const handleDelete = (userId) => {
    setUserIdToDelete(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(userIdToDelete));
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = (userId, currentUsername, currentEmail, currentRole) => {
    setSelectedUserId(userId);
    setNewUsername(currentUsername);
    setNewEmail(currentEmail);
    setNewRole(currentRole);
    setIsModalOpen(true);
  };

  const handleUserUpdate = () => {
    const userData = {
      username: newUsername,
      email: newEmail,
      role: newRole,
    };

    dispatch(updateUser(selectedUserId, userData));
    dispatch(getAllUsers(currentPage, rowsPerPage));
    setIsModalOpen(false);
  };

  return (
    <div className="h-[100vh] overflow-x-auto p-10">
      <table className="w-full table-auto bg-[#F8FAFC] rounded-[12px] mt-20 ">
        {/* Table Header */}
        <thead>
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center p-4">
                <div className="flex justify-center items-center">
                  <Loading />
                </div>
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4 text-gray-500">
                No user data available
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
                <td className="p-4 flex space-x-2">
                  {/* Edit Icon */}
                  <button
                    onClick={() =>
                      handleEdit(user._id, user.username, user.email, user.role)
                    }
                    className="text-blue-500 hover:text-blue-700 hover:cursor-pointer"
                  >
                    <FiEdit />
                  </button>
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                  >
                    <RiDeleteBin2Line />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal for delete confirmation */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl mb-4">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:cursor-pointer"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:cursor-pointer"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for editing user role */}
      {isModalOpen && (
        <div className="fixed inset-0 flex z-20 justify-center items-center bg-gray-800 bg-opacity-50">
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
                onClick={handleUserUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:cursor-pointer"
              >
                Update User
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsersTable;
