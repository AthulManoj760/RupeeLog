import { useState } from "react";
import { auth } from "../firebase";
import logo from "../assets/rupeelog-logo.svg";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";

function Signup({ switchToLogin, theme, toggleTheme }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signupUser = async () => {
    setError("");

    setLoading(true);

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Firebase auth state will update automatically

    } catch (err) {

      setError(err.message);

    }

    setLoading(false);
  };

  return (

    <div className="relative min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-300">

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-2xl shadow-xl dark:shadow-2xl w-[380px] max-w-[90%] transition-colors duration-300"
      >

        {/* Logo */}
        <div className="text-center mb-8">

          <img
            src={logo}
            alt="RupeeLog Logo"
            className="w-16 h-16 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            RupeeLog
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Create your account
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-4 text-center border border-red-200 dark:border-red-500/30">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Signup button */}
        <button
          onClick={signupUser}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white transition py-3 rounded-xl font-medium shadow-md dark:shadow-lg dark:shadow-blue-500/30 mb-6"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-slate-500 dark:text-slate-400">

          Already have an account?

          <button
            onClick={switchToLogin}
            className="text-blue-600 dark:text-blue-400 font-medium ml-1 hover:underline"
          >
            Login
          </button>

        </p>

      </motion.div>

    </div>
  );
}

export default Signup;