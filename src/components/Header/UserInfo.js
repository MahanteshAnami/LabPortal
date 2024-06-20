import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing user data, etc.
    navigate("/");
  };

  return (
    <div className="relative flex items-center space-x-4 pl-10">
      <span
        className="text-white text-2xl border border-white rounded-full text-center p-2 cursor-pointer"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <FaUser />
      </span>
      <div className="bg-transparent rounded-lg py-3 text-white font-semibold cursor-not-allowed w-48 text-center text-lg pr-11">
        Ferrara Clifford
      </div>
      {dropdownVisible && (
        <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg py-2 w-40 z-10 font-bold">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
