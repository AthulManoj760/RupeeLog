import { useState } from "react";
import { auth } from "../firebase";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

function Login({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setUser(userCredential.user);

    } catch (error) {
      alert(error.message);
    }
  };

  const googleLogin = async () => {

    const provider = new GoogleAuthProvider();

    try {

      const result = await signInWithPopup(auth, provider);
      setUser(result.user);

    } catch (error) {
      alert(error.message);
    }
  };

  return (

    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-[380px] max-w-[90%]">

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="text-5xl text-blue-400 font-bold mb-3">
            ₹
          </div>

          <h1 className="text-3xl font-bold text-white">
            RupeeLog
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Smart Expense Tracker
          </p>

        </div>


        {/* Email */}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        {/* Password */}

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-5 px-4 py-3 rounded-lg bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        {/* Login button */}

        <button
          onClick={loginUser}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-medium mb-3"
        >
          Login
        </button>


        {/* Google login */}

        <button
          onClick={googleLogin}
          className="w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-lg font-medium"
        >
          Sign in with Google
        </button>

      </div>

    </div>
  );
}

export default Login;