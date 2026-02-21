import { useState, useEffect } from "react";
import "./App.css";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [selectedMonth, setSelectedMonth] = useState(
  new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAdd = () => {
    if (!amount) return;

    const newTransaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      type: type,
      category: category,
      date: date,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
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

  return (
    <div className="container">
      <h1>RupeeLog</h1>
      <div style={{ margin: "15px 0" }}>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      <Summary
        balance={balance}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />

      <TransactionForm
        amount={amount}
        setAmount={setAmount}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        date={date}
        setDate={setDate}
        handleAdd={handleAdd}
      />

      <TransactionList
        transactions={filteredTransactions}
        handleDelete={handleDelete}
      />  
    </div>
  );
}

export default App;