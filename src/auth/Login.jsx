import { useState } from "react";
import { auth } from "../firebase";
import logo from "../assets/rupeelog-logo.svg";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { motion } from "framer-motion";

function Login({ switchToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginUser = async () => {
    setError("");

    setLoading(true);

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // No setUser needed
      // Firebase auth state will update automatically

    } catch (err) {

      setError(err.message);

    }

    setLoading(false);
  };

  const googleLogin = async () => {
    setError("");
    const provider = new GoogleAuthProvider();

    try {

      await signInWithPopup(auth, provider);

      // Again no setUser needed

    } catch (err) {

      setError(err.message);

    }
  };

  return (

    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px] opacity-30 -top-40 -left-40"></div>
      <div className="absolute w-[500px] h-[500px] bg-purple-500 rounded-full blur-[150px] opacity-30 bottom-[-200px] right-[-200px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5 }}
        className="relative backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-[380px] max-w-[90%]"
      >

        {/* Logo */}
        <div className="text-center mb-8">

          <img
            src={logo}
            alt="RupeeLog Logo"
            className="w-16 h-16 mx-auto mb-3"
          />

          <h1 className="text-3xl font-bold text-white">
            RupeeLog
          </h1>

          <p className="text-slate-300 text-sm mt-1">
            Smart Expense Tracker
          </p>

        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-4 text-center border border-red-500/30">
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 px-4 py-3 rounded-lg bg-white/10 text-white border border-white/20 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button
          onClick={loginUser}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-medium mb-3 shadow-lg shadow-blue-500/30"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google login */}
        <button
          onClick={googleLogin}
          className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-lg font-medium mb-4"
        >
          Sign in with Google
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-slate-300">

          Don't have an account?

          <button
            onClick={switchToSignup}
            className="text-blue-400 ml-1 hover:underline"
          >
            Signup
          </button>

        </p>

      </motion.div>

    </div>
  );
}

export default Login;