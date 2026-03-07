import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Profile({ user, close, setUsername }) {

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
      alert("error.message");

    }

  };

  return (

    <div className="fixed inset-0 flex items-center justify-center bg-black/50">

      <div className="bg-slate-800 p-8 rounded-xl w-[350px] shadow-xl">

        <h2 className="text-xl font-bold mb-4 text-white">
          Profile
        </h2>

        <p className="text-sm mb-2 text-gray-300">
          Email
        </p>

        <div className="bg-slate-700 p-2 rounded mb-4 text-white">
          {user.email}
        </div>

        <p className="text-sm mb-2 text-gray-300">
          Username
        </p>

        <input
          value={usernameInput}
          onChange={(e) => setUsernameInput(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 mb-4 text-white outline-none"
          placeholder="Enter username"
        />

        <button
          onClick={saveUsername}
          className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded mb-2"
        >
          Save Username
        </button>

        <button
          onClick={close}
          className="w-full bg-red-500 hover:bg-red-600 transition py-2 rounded"
        >
          Close
        </button>

      </div>

    </div>

  );
}

export default Profile;