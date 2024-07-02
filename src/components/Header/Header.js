import React from "react";
import UserInfo from "./UserInfo";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-cyan-600 flex justify-between items-center shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100 py-6 px-12 h-[85px] ">
      <div className="flex items-center">
        <Link to="/patientstable">
          {" "}
          <img
            src="../images/testtubelogo.png"
            alt="logo"
            className="w-32 h-16"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-12">
        <div className="flex space-x-8 text-xl">
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
