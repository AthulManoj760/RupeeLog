function TransactionForm({
  amount,
  setAmount,
  description,
  setDescription,
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
  theme
}) {

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    if (value !== "Others") {
      setCustomCategory("");
    }
  };

  const handleDescriptionChange = (e) => {
    const val = e.target.value;
    setDescription(val);
    
    // Smart Categorization
    const lowerVal = val.toLowerCase();
    
    if (/(starbucks|mcdonald|kfc|restaurant|food|coffee|burger|pizza|diner|grocer)/.test(lowerVal)) {
      setCategory("Food");
      setCustomCategory("");
    } else if (/(uber|lyft|taxi|train|bus|flight|gas|fuel)/.test(lowerVal)) {
      setCategory("Travel");
      setCustomCategory("");
    } else if (/(rent|lease|landlord|mortgage)/.test(lowerVal)) {
      setCategory("Rent");
      setCustomCategory("");
    } else if (/(amazon|target|walmart|bestbuy|shopping|mall|clothes|shoes|clothing)/.test(lowerVal)) {
      setCategory("Shopping");
      setCustomCategory("");
    }
  };

  const selectChevron = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='${theme === 'dark' ? 'white' : '%2364748b'}'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3e%3c/svg%3e")`;

  return (

    <div className="flex flex-col lg:flex-row flex-wrap gap-4 items-stretch lg:items-center mt-8 p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm dark:shadow-xl transition-colors duration-300">

      {/* Description */}
      <input
        type="text"
        placeholder="What was this for? (e.g. Starbucks)"
        value={description}
        onChange={handleDescriptionChange}
        className="w-full lg:flex-grow lg:w-auto px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 dark:placeholder-slate-500 transition-all"
      />

      {/* Amount */}
      <div className="relative w-full lg:w-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">₹</span>
        <input
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full lg:w-[140px] pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      {/* Type */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="appearance-none w-full lg:w-auto px-4 py-3 pr-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        style={{ backgroundImage: selectChevron, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em' }}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      {/* Category */}
      <select
        value={category}
        onChange={handleCategoryChange}
        className="appearance-none w-full lg:w-auto px-4 py-3 pr-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
        style={{ backgroundImage: selectChevron, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em' }}
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
          placeholder="Custom Category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="w-full lg:w-[160px] px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      )}

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full lg:w-auto px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      />

      {/* Add / Update Button */}
      <button
        onClick={handleAdd}
        className="w-full lg:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 font-semibold text-white rounded-xl shadow-md dark:shadow-lg dark:shadow-blue-500/30 transition active:scale-95 whitespace-nowrap"
      >
        {editId ? "Update" : "Add Transaction"}
      </button>

    </div>

  );

}

export default TransactionForm;