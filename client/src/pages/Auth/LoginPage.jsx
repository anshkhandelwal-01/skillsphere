import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { login } from "../../api/auth.api";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  async function handleLogin() {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.user.role);
      localStorage.setItem('email', data.user.email);
      enqueueSnackbar('Logged in successfully 🎉', { variant: 'success' });
      window.location.href = '/dashboard';
    } catch {
      enqueueSnackbar("Login failed. Please check your credentials.", {
        variant: "error",
      });
    }
  }

  return (
    <div className="bg-[#043049] flex flex-col lg:flex-row items-center justify-center w-full">
      {/* Left Image Section */}
      <div className="flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0">
        <img
          src="/src/assets/vaco.png"
          alt="logo"
          className="object-contain w-[50%] sm:w-[60%] md:w-[70%] lg:w-[550px] xl:w-[461px] h-auto"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl md:text-3xl font-semibold text-black mb-2">
          Sign in
        </h1>
        <p className="text-sm md:text-lg text-black mb-6">
          Welcome back — sign in to continue.
        </p>

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
              className="text-black mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="you@example.com"
            />
          </label>

          <label className="block mt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-black">Password</span>
              <span className="text-sm font-bold text-blue-900 hover:underline cursor-pointer">
                Forgot password?
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

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-2 px-4 rounded-xl text-black font-medium transition bg-indigo-300 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
