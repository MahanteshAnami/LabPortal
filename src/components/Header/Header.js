import React from "react";
import UserInfo from "./UserInfo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-cyan-700 flex justify-between items-center shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100 py-6 px-12">
      <div className="flex items-center">
        <img src="./images/testtubelogo.png" alt="logo" className="w-32 h-16" />
      </div>

      <div className="flex items-center space-x-12">
        <div className="flex space-x-8 text-xl">
          <Link to="/aboutus" className="text-white hover:text-gray-300">
            About Us
          </Link>
          <Link to="/contactus" className="text-white hover:text-gray-300">
            Contact Us
          </Link>
        </div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Header;