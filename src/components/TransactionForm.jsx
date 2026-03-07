function TransactionForm({
  amount,
  setAmount,
  type,
  setType,
  category,
  setCategory,
  customCategory,
  setCustomCategory,
  date,
  setDate,
  handleAdd,
  editId
}) {

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    if (value !== "Others") {
      setCustomCategory("");
    }
  };

  return (

    <div className="flex flex-wrap gap-3 items-center mt-6">

      {/* Amount */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="px-3 py-2 rounded bg-slate-700 text-white outline-none"
      />

      {/* Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="px-3 py-2 rounded bg-slate-700 text-white outline-none"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={handleCategoryChange}
        className="px-3 py-2 rounded bg-slate-700 text-white outline-none"
      >
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Rent">Rent</option>
        <option value="Shopping">Shopping</option>
        <option value="Others">Others</option>
      </select>

      {/* Custom category */}
      {category === "Others" && (
        <input
          type="text"
          placeholder="Enter custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="px-3 py-2 rounded bg-slate-700 text-white outline-none"
        />
      )}

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-3 py-2 rounded bg-slate-700 text-white outline-none"
      />

      {/* Add / Update Button */}
      <button
        onClick={handleAdd}
        className="px-4 py-2 border border-slate-500 rounded-lg hover:bg-blue-500 transition"
      >
        {editId ? "Update" : "Add"}
      </button>

    </div>

  );

}

export default TransactionForm;