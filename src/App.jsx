import { useState, useEffect } from "react";
import { auth } from "./firebase";

import { onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./auth/Login";
import Signup from "./auth/Signup";

import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Summary from "./components/Summary";
import Profile from "./components/Profile";

import CategoryChart from "./components/CategoryChart";

function App() {

  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [editId, setEditId] = useState(null);

  const [showProfile, setShowProfile] = useState(false);

  const [username, setUsername] = useState("User");

  /* ---------------- AUTH LISTENER ---------------- */

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      setUser(currentUser);

      if (currentUser) {

        const savedTransactions = JSON.parse(
          localStorage.getItem(`transactions_${currentUser.uid}`)
        ) || [];

        setTransactions(savedTransactions);

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

    if (user) {

      localStorage.setItem(
        `transactions_${user.uid}`,
        JSON.stringify(transactions)
      );

    }

  }, [transactions, user]);

  /* ---------------- CALCULATE SUMMARY ---------------- */

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  /* ---------------- ADD / UPDATE TRANSACTION ---------------- */

  const handleAdd = () => {

    if (!amount) return;

    let finalCategory = category;

    if (category === "Others") {

      if (!customCategory.trim()) return;
      finalCategory = customCategory;

    }

    if (editId) {

      setTransactions(
        transactions.map((t) =>
          t.id === editId
            ? {
                ...t,
                amount: parseFloat(amount),
                type,
                category: finalCategory,
                date
              }
            : t
        )
      );

      setEditId(null);

    } else {

      const newTransaction = {

        id: Date.now(),
        amount: Number(amount),
        type,
        category: finalCategory,
        date

      };

      setTransactions([...transactions, newTransaction]);

    }

    setAmount("");
    setCustomCategory("");

  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = (id) => {

    setTransactions(transactions.filter((t) => t.id !== id));

  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (transaction) => {

    setAmount(transaction.amount);
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
          goToLogin={() => setShowSignup(false)}
        />
      );

    }

    return (
      <Login
        setUser={setUser}
        goToSignup={() => setShowSignup(true)}
      />
    );

  }

  /* ---------------- MAIN DASHBOARD ---------------- */

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">RupeeLog</h1>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="bg-slate-700 px-4 py-2 rounded-lg"
          >
            👤 {username}
          </button>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg"
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
        />
      )}

      {/* SUMMARY */}

      <Summary
        balance={balance}
        income={income}
        expense={expense}
      />

      {/* TRANSACTION FORM */}

      <TransactionForm
        amount={amount}
        setAmount={setAmount}
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
      />

      {/* TRANSACTION LIST */}

      <TransactionList
        transactions={transactions}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />

      <CategoryChart transactions={transactions} />

    </div>

  );

}

export default App;