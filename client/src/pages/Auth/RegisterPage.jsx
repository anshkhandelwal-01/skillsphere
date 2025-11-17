import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Paper,
//   Typography,
//   InputAdornment
// } from '@mui/material';
// import { Person, Email, Lock } from '@mui/icons-material';
import { useSnackbar } from "notistack";
import { register } from "../../api/auth.api";
// import { motion } from 'framer-motion';
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [name, setName] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [role, setRole] = useState("");

  async function handleRegister() {
    try {
      const data = await register(email, password, name, role);
      enqueueSnackbar("Registered successfully 🎉", { variant: "success" });
    } catch {
      enqueueSnackbar("Registration failed. Please try again.", {
        variant: "error",
      });
    }
  }

  return (
    <div className="w-full max-w-md bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
      <h1> Register New User</h1>
      <form
        className="space-y-4 mt-4 md:mt-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <label className="block">
          <span className="text-sm font-medium text-black">Username</span>
          <input
            type="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Username"
            className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-black">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter you email"
            className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-black">Role</span>
          <select
            onChange={(e) => setRole(e.target.value)}
            className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={role}
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="USER">USER</option>
            <option value="LEAD">TEAM LEAD</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>

        <label className="block mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-black">Password</span>
          </div>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password || "vbsllp"}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-gray-400"
              onClick={() => setShow(!show)}
            >
              {show ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </label>

        <button
          type="submit"
          onClick={handleRegister}
          className="w-full py-2 px-4 rounded-xl text-black font-medium transition bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Register
        </button>
      </form>
    </div>
  );
}
