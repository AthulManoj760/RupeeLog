import { useState, useEffect } from "react";
import { auth } from "./firebase";

import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  getDoc,
  onSnapshot
} from "firebase/firestore";

import { db } from "./firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import Profile from "./components/Profile";

import CategoryChart from "./components/CategoryChart";
import CashFlowChart from "./components/CashFlowChart";

function App() {

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [editId, setEditId] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const [username, setUsername] = useState("User");

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {

    if (!user) {
      setUsername("User");
      return;
    }

    const fetchUsername = async () => {

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setUsername(snap.data().username || "User");
      } else {
        setUsername("User");
      }

    };

    fetchUsername();

  }, [user]);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

      if (currentUser) {
        // We removed localStorage seeding for transactions to prevent stale data conflicts
        // Transactions will load immediately via real-time onSnapshot listeners 

        const savedName = localStorage.getItem(
          `username_${currentUser.uid}`
        );

        if (savedName) setUsername(savedName);

      }

    });

    return () => unsubscribe();

  }, []);

  /* ---------------- SAVE TRANSACTIONS ---------------- */

  useEffect(() => {

    if (!user) {
      setTransactions([]);
      return;
    }

    const unSub = onSnapshot(
      collection(db, "users", user.uid, "transactions"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort by date descending
        data.sort((a, b) => new Date(b.date) - new Date(a.date));

        setTransactions(data);
      }
    );

    return () => unSub();

  }, [user]);

  /* ---------------- CALCULATE SUMMARY ---------------- */

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;
  
  // BUDGET ALERTS
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const currentMonthTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
  });

  const monthIncome = currentMonthTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const monthExpense = currentMonthTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const isOverBudget = monthIncome > 0 && monthExpense > monthIncome * 0.8;

  /* ---------------- ADD / UPDATE TRANSACTION ---------------- */

  const handleAdd = async () => {

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    let finalCategory = category;

    if (category === "Others") {
      if (!customCategory.trim()) return;
      finalCategory = customCategory;
    }

    const transactionData = {
      amount: numAmount,
      description,
      type,
      category: finalCategory,
      date
    };

    // UPDATE transaction
    if (editId) {
      await updateDoc(
        doc(db, "users", user.uid, "transactions", editId),
        transactionData
      );
      setEditId(null);
    } else {
      // ADD new transaction
      await addDoc(
        collection(db, "users", user.uid, "transactions"),
        transactionData
      );
    }

    // Since we use onSnapshot, we don't need to manually update local state anymore.

    setAmount("");
    setDescription("");
    setCustomCategory("");

  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {

    await deleteDoc(
      doc(db, "users", user.uid, "transactions", id)
    );

    // Manual state update removed thanks to onSnapshot

  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (transaction) => {

    setAmount(transaction.amount);
    setDescription(transaction.description || "");
    setType(transaction.type);
    setCategory(transaction.category);
    setDate(transaction.date);

    setEditId(transaction.id);

  };

  /* ---------------- LOGOUT ---------------- */

  const logout = async () => {

    await signOut(auth);

    setUser(null);

  };

  /* ---------------- LOGIN / SIGNUP ---------------- */

  if (!user) {

    if (showSignup) {

      return (
        <Signup
          setUser={setUser}
          switchToLogin={() => setShowSignup(false)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      );

    }

    return (
      <Login
        setUser={setUser}
        switchToSignup={() => setShowSignup(true)}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );

  }

  /* ---------------- MAIN DASHBOARD ---------------- */

  return (

    <div className="min-h-screen w-full p-2 sm:p-4 md:p-8 font-sans transition-colors duration-300">
      
      <div className="relative max-w-5xl mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-6 md:p-10 shadow-xl dark:shadow-2xl transition-colors duration-300 z-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 md:mb-10 gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-blue-500 to-emerald-500 w-12 h-12 rounded-xl shadow-lg shadow-emerald-500/20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
              <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
              <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400 tracking-tight pb-2 pr-1 md:pr-2 leading-tight truncate">
            RupeeLog<span className="text-emerald-500">.</span>
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button
            onClick={() => setShowProfile(!showProfile)}
            className={`px-3 py-2 sm:px-4 rounded-xl transition flex items-center justify-center gap-2 font-medium text-sm sm:text-base ${showProfile ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-500/50' : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
          >
            <span>👤</span> <span className="hidden sm:inline">{username}</span>
          </button>

          <button
            onClick={logout}
            className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 px-3 py-2 sm:px-4 rounded-xl hover:bg-red-100 dark:hover:bg-red-500/20 transition font-medium text-sm sm:text-base"
          >
            Logout
          </button>

        </div>

      </div>

      {/* PROFILE PANEL */}

      {showProfile && (
        <Profile
          user={user}
          setUsername={setUsername}
          close={() => setShowProfile(false)}
          theme={theme}
        />
      )}

      {/* SUMMARY */}

      <Summary
        balance={balance}
        income={income}
        expense={expense}
        isOverBudget={isOverBudget}
        theme={theme}
      />

      {/* TRANSACTION FORM */}

      <TransactionForm
        amount={amount}
        setAmount={setAmount}
        description={description}
        setDescription={setDescription}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        customCategory={customCategory}
        setCustomCategory={setCustomCategory}
        date={date}
        setDate={setDate}
        handleAdd={handleAdd}
        editId={editId}
        theme={theme}
      />

      {/* TRANSACTION LIST */}

      <TransactionList
        transactions={transactions}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        theme={theme}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <CashFlowChart transactions={transactions} theme={theme} />
        <CategoryChart transactions={transactions} theme={theme} />
      </div>

      </div>
    </div>

  );

}

export default App;