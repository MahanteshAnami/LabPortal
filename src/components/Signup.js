import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// import Footer from './Footer/Footer';
import { GrFormView, GrFormViewHide } from "react-icons/gr";
import { Link } from 'react-router-dom';

// Validation schema with confirmPassword
const signupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // Path of error
});

function Signup({ onSignup }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    onSignup(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col justify-between items-center" style={{ backgroundImage: "url('/bg-1.jpg')" }}>
      <div className="flex flex-grow items-center justify-center w-full">
        <div className="bg-white bg-opacity-75 p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Clinic Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                {...register('username')}
                placeholder="Enter your username"
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="password"
                type={showPassword ? "text" : "password"}
                {...register('password')}
                placeholder="Enter your password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 mt-4 flex items-center text-gray-700 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <GrFormViewHide /> : <GrFormView />}
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div className="mb-6 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirmPassword')}
                placeholder="Confirm your password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 mt-4 flex items-center text-gray-700 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <GrFormViewHide /> : <GrFormView />}
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button
                className="font-bold px-4 focus:outline-none focus:shadow-outline w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                type="submit"
              >
                Continue
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-700 text-sm">
                Already have an account? <Link to="/" className="text-blue-500 hover:text-blue-700 font-bold">Sign In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Signup;