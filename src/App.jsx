import { useState, useEffect } from "react";
import "./App.css";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import CategoryChart from "./components/CategoryChart";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [customCategory, setCustomCategory] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEdit = (transaction) => {
    console.log("Editing transaction:", transaction);

    setAmount(transaction.amount);
    setType(transaction.type);

    const predefinedCategories = ["Food", "Travel", "Rent", "Shopping"];

    if (predefinedCategories.includes(transaction.category)) {
      setCategory(transaction.category);
      setCustomCategory("");
    } else {
      setCategory("Others");
      setCustomCategory(transaction.category);
    }

    setDate(transaction.date);
    setEditId(transaction.id);
  };
  
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [selectedMonth, setSelectedMonth] = useState(
  new Date().toISOString().slice(0, 7)
  );

  const [budget, setBudget] = useState(() => {
    const savedBudget = localStorage.getItem("budget");
    return savedBudget ? JSON.parse(savedBudget) : 0;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [budget]);

  const handleAdd = () => {
    if (!amount) return;

    let finalCategory = category;

    if (category === "Others") {
      if (!customCategory.trim()) return;
      finalCategory = customCategory.trim();
    }

    if (editId !== null) {
      // UPDATE MODE
      const updatedTransactions = transactions.map((t) =>
        t.id === editId
          ? {
              ...t,
              amount: parseFloat(amount),
              type: type,
              category: finalCategory,
              date: date,
            }
          : t
      );

      setTransactions(updatedTransactions);
      setEditId(null);
    } else {
      // ADD MODE
      const newTransaction = {
        id: Date.now(),
        amount: parseFloat(amount),
        type: type,
        category: finalCategory,
        date: date,
      };

      setTransactions([...transactions, newTransaction]);
    }

    // Reset form
    setAmount("");
    setCategory("Food");
    setCustomCategory("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter
    ((t) => t.date && t.date.startsWith(selectedMonth)
  );

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  const remainingBudget = budget - totalExpense;

  const rawPercent = budget > 0 ? (totalExpense / budget) * 100 : 0;

  const budgetUsedPercent = Math.min(rawPercent, 100);

  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <div className="max-w-5xl mx-auto px-6 py-12">

      {/* Title */}
      <h1 className="text-4xl font-semibold text-center mb-10 tracking-tight">
        RupeeLog
      </h1>

      {/* Month + Budget Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-slate-700 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Set monthly budget"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="bg-slate-700 px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Budget Progress */}
      {budget > 0 && (
        <div className="mb-10">
          <p className="text-center mb-2 text-slate-300">
            Budget: ₹ {budget} | Remaining: ₹ {remainingBudget}
          </p>

          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                rawPercent > 100
                  ? "bg-red-500"
                  : rawPercent > 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{ width: `${budgetUsedPercent}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Summary */}
      <Summary
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      {/* Transaction Form */}
      <div className="mt-10">
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
      </div>

      {/* Transactions List */}
      <div className="mt-10">
        <TransactionList
          transactions={filteredTransactions}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>

      {/* Category Chart */}
      <div className="mt-12 flex justify-center">
        <CategoryChart transactions={filteredTransactions} />
      </div>

    </div>
  </div>
);
}

export default App;