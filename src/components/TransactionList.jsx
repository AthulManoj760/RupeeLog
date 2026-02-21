function TransactionList({ transactions, handleDelete }) {
  return (
    <>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li
            key={t.id}
            className={t.type === "income" ? "income-item" : "expense-item"}
          >
            <span>
              {t.category} - ₹ {t.amount} ({t.date})
            </span>
            <button onClick={() => handleDelete(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TransactionList;