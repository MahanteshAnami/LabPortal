// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';

// // Validation schema for login
// const loginSchema = z.object({
//   username: z.string().min(1, 'Username is required'),
//   password: z.string().min(6, 'Password must be at least 6 characters'),
// });

// function Login({ onLogin }) {
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = (data) => {
//     onLogin(data);
//   };

//   return (
//     <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center" style={{ backgroundImage: "url('/bg-1.jpg')" }}>
//       <div className="bg-white bg-opacity-75 p-8 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
//               Username
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="username"
//               type="text"
//               {...register('username')}
//               placeholder="Enter your username"
//             />
//             {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               type="password"
//               {...register('password')}
//               placeholder="Enter your password"
//             />
//             {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
//           </div>
//           <div className="flex items-center justify-center">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Log In
//             </button>
//           </div>
//           <div className="mt-4 text-center">
//             <p className="text-gray-700 text-sm">
//               New here? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Create an account here</Link>.
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (username.trim() === storedUser && password.trim() === storedPass) {
      navigate("/display-patients-table");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center hover:font-extrabold">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2 hover:font-bold">
              Clinic Name:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 hover:font-bold">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
