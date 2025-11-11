import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    } else {
      setCheckingAuth(false);
    }
  }, [navigate]);

  if (checkingAuth) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Decorative floating circles */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-200 rounded-full opacity-30 animate-pulse blur-xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-200 rounded-full opacity-30 animate-pulse blur-xl" />

      {/* Main content */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-indigo-600 mb-4 drop-shadow"
      >
        Welcome to SkillSphere!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-lg text-gray-700 mb-6"
      >
        Learn. Progress. Celebrate every milestone.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-4"
      >
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
        >
          Login
        </Link>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Link
          to="/register"
          className="px-6 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-indigo-50 transition"
        >
          Register
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-sm text-gray-500 italic"
      >
        “Every lesson is a step toward mastery.”
      </motion.p>
    </div>
  );
}