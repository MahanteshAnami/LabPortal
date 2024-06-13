import React from "react";
import { FaUser } from "react-icons/fa";

const UserInfo = () => {
  return (
    <div className="flex items-center space-x-4 pl-10">
      <span className="text-white text-2xl border border-white rounded-full text-center p-2 cursor-pointer ">
        <FaUser />
      </span>
      <div className="bg-transparent  rounded-lg py-3 text-white font-semibold cursor-not-allowed w-48 text-center text-lg pr-11">
        Ferrara Clifford
      </div>
    </div>
  );
};

export default UserInfo;
