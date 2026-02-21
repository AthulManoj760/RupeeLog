function Summary({ balance, totalIncome, totalExpense }) {
  return (
    <div className="summary">
      <div className="card balance">
        <h3>Balance</h3>
        <p>₹ {balance}</p>
      </div>

      <div className="card income">
        <h3>Income</h3>
        <p>₹ {totalIncome}</p>
      </div>

      <div className="card expense">
        <h3>Expense</h3>
        <p>₹ {totalExpense}</p>
      </div>
    </div>
  );
}

export default Summary;