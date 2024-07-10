import React from "react";
import UserInfo from "./UserInfo";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-cyan-600 flex justify-between items-center shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100 py-4 px-6 md:py-6 md:px-12 h-[70px] md:h-[85px]">
      <div className="flex items-center">
        <Link to="/patientstable">
          <img
            src="../images/testtubelogo.png"
            alt="logo"
            className="w-24 h-12 md:w-32 md:h-16"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-4 md:space-x-12">
        <div className="flex space-x-4 text-lg md:text-xl md:space-x-8">
          <NavLink
            className={(e) => {
              return e.isActive ? "text-pink-200" : "text-white";
            }}
            to="/aboutus"
          >
            About Us
          </NavLink>
          <NavLink
            className={(e) => {
              return e.isActive ? "text-pink-200" : "text-white";
            }}
            to="/contactus"
          >
            Contact Us
          </NavLink>
        </div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Header;