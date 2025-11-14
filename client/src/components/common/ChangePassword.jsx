import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { changePassword } from "../../api/auth.api";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);

  async function handleChangePassword() {
    // Implement change password logic here
    try {
      const data = await changePassword(email, password, newpassword);
      alert("Password changed successfully");
    } catch (error) {
      alert("Change password failed. Please check your credentials.");
      console.error("Change password failed", error);
    }
  }
  return (
    <div className="w-full max-w-md bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
      <form
        className="space-y-4 mt-4 md:mt-6"
        onSubmit={(e) => e.preventDefault()}
      >
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

        <label className="block mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-black">
              Current Password
            </span>
          </div>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={password}
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

        <label className="block mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-black">New Password</span>
          </div>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          onClick={handleChangePassword}
          className="w-full py-2 px-4 rounded-xl text-black font-medium transition bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
