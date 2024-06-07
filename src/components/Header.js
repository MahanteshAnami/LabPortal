import React from "react";
import { FaUser } from "react-icons/fa";
import TextField from "@mui/material/TextField";

const Header = () => {
  return (
    <>
      <div className="bg-cyan-700 flex justify-between shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100 py-2 pl-10">
        <div>
          <img src="./images/logo.jpg" height={60} width={60} alt="logo" />
        </div>
        <span className="text-3xl font-semibold text-white align-middle  hover:text-4xl m-2">
          Lab Portal
        </span>
        <div className="flex items-center">
          <span className="text-white text-3xl border border-white rounded-full text-center p-1 m-2 cursor-pointer hover:text-4xl">
            <FaUser />
          </span>
          <TextField
            variant="outlined"
            value="Frerra Clifford"
            className="font-bold w-40 hover:text-xl"
            size="small"
            InputProps={{
              readOnly: true,
              classes: {
                root: "text-white",
                notchedOutline: "border-none",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
