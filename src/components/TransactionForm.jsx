function TransactionForm
({
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
  editId,
}) 
{
  return (
    <div className="form">
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Food</option>
        <option>Travel</option>
        <option>Rent</option>
        <option>Shopping</option>
        <option>Others</option>
      </select>

      { category === "Others" && (
        <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleAdd}>
        {editId !== null ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default TransactionForm;