import React from "react";
import { FaUser } from "react-icons/fa";

const UserInfo = () => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-white text-4xl border border-white rounded-full text-center p-2 cursor-pointer hover:text-5xl">
        <FaUser />
      </span>
      <div className="bg-transparent  rounded-lg py-3 text-white font-bold cursor-not-allowed w-48 text-center text-lg">
        Ferrara Clifford
      </div>
    </div>
  );
};

export default UserInfo;