import React, { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    // Perform logout logic here, e.g., clearing user data, etc.
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="relative flex items-center space-x-4 pl-10" ref={dropdownRef}>
      <span
        className="text-white text-2xl border border-white rounded-full text-center p-2 cursor-pointer"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <FaUser />
      </span>
      <div className="bg-transparent rounded-lg py-3 text-white font-semibold cursor-not-allowed w-48 text-center text-lg pr-11">
        Harley Streets
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
// Explanation:
// useRef Hook: The dropdownRef is created using useRef to reference the dropdown element.
// handleClickOutside Function: This function checks if the click event happened outside the dropdown element. If it did, it sets dropdownVisible to false.
// useEffect Hook: The useEffect hook adds the click event listener to the document when the dropdown is visible and removes it when the dropdown is not visible or when the component unmounts.
// Ref Attribute: The ref={dropdownRef} attribute is added to the main container div so that clicks can be detected outside of this element.







