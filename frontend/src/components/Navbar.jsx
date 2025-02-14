import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidLogInCircle } from "react-icons/bi";
import { logout } from "../actions/UserAction";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const isActive = (path) => {
    return location.pathname === path
      ? "text-black"
      : "text-gray-600 hover:text-gray-800";
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav
      className="bg-white bg shadow-lg border-b px-5 fixed w-full "
      aria-label="Primary navigation"
    >
      <div className="container mx-auto flex justify-between items-center py-4 ">
        <div>
          <Link to="/" aria-label="Home">
            <span className="text-2xl font-bold font-poppins cursor-pointer">
              Easy<span className="text-[#FE4C50] ">Buy</span>
            </span>
          </Link>
        </div>
        <div className="flex items-center ">
          <div className="hidden md:flex space-x-10 ml-4">
            <Link to="/">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/"
                )}`}
                aria-label="Home"
              >
                Home
              </span>
            </Link>
            <Link to="/">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/"
                )}`}
                aria-label="Price"
              >
                Price
              </span>
            </Link>
            <Link to="/">
              <span
                className={`relative cursor-pointer text-black hover:text-gray-400 duration-300 ${isActive(
                  "/"
                )}`}
                aria-label="Help"
              >
                Help
              </span>
            </Link>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-black hover:text-gray-400  duration-300 text-xl  py-2 rounded cursor-pointer">
            {currentUser ? (
              <div onClick={handleLogout}>
                <IoLogOut />
              </div>
            ) : (
              <Link to="/login">
                <BiSolidLogInCircle />
              </Link>
            )}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <Link to="/">
            <span className={`block ${isActive("/")}`} aria-label="Home">
              Home
            </span>
          </Link>
          <Link to="/">
            <span className={`block ${isActive("/")}`} aria-label="Price">
              Price
            </span>
          </Link>
          <Link to="/">
            <span className={`block ${isActive("/")}`} aria-label="Help">
              Help
            </span>
          </Link>
          <button className="px-4 py-2 bg-blue-500 text-white rounded mt-10" onClick={handleLogout}>
            <span className={`block ${isActive("/")}`} aria-label="Help">
              Logout
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
