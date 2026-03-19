import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { motion } from "framer-motion";

function Profile({ user, close, setUsername, theme }) {

  const [usernameInput, setUsernameInput] = useState("");

  useEffect(() => {

    const fetchUser = async () => {

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUsernameInput(snap.data().username || "");
      }

    };

    fetchUser();

  }, [user]);

  const saveUsername = async () => {

    try {

      await setDoc(doc(db, "users", user.uid), {
        username: usernameInput,
        email: user.email
      });

      setUsername(usernameInput);
      close();

    } 
    catch (error) {

      console.error(error);
      alert(error.message);

    }

  };

  return (

    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-md dark:shadow-xl mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between transition-colors duration-300"
    >

      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
          Profile Settings
        </h2>

        <div className="mb-4">
          <p className="text-sm mb-1 text-slate-500 dark:text-slate-400">
            Email Address
          </p>
          <div className="px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors duration-300">
            {user.email}
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative">
        <p className="text-sm mb-1 text-slate-500 dark:text-slate-400">
          Username
        </p>
        <input
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all mb-4 lg:mb-0 placeholder-slate-400 dark:placeholder-slate-500"
          placeholder="Enter username"
        />
      </div>

      <div className="flex flex-col gap-3 w-full md:w-auto mt-2 md:mt-6">
        <button
          onClick={saveUsername}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition active:scale-95 whitespace-nowrap"
        >
          Save Changes
        </button>
        <button
          onClick={close}
          className="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition active:scale-95 whitespace-nowrap"
        >
          Close Panel
        </button>
      </div>

    </motion.div>

  );
}

export default Profile;