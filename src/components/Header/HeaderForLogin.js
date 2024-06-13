import React from "react";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-cyan-700 flex justify-between items-center shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100 py-4 px-12 h-[85px] ">
      <div className="flex items-center">
        <Link to="/">
          {" "}
          <img
            src="./images/testtubelogo.png"
            alt="logo"
            className="w-32 h-16 hover:font-bold"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-12">
        <div className="flex space-x-8 text-xl">
          <Link
            to="/"
            className="text-white   hover:text-gray-300"
          >
            About Us
          </Link>
          <Link
            to="/"
            className="text-white   hover:text-gray-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
