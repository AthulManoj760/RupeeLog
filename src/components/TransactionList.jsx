import { motion } from "framer-motion";

function TransactionList({ transactions, handleDelete, handleEdit }) {
  if (transactions.length === 0) {
    return (
      <div className="mt-10 text-center text-slate-400">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-6">Transactions</h2>

      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <motion.li
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 p-4 rounded-xl shadow-lg flex justify-between items-center hover:-translate-y-1 hover:shadow-xl transition"
          >
            {/* Transaction Info */}
            <div>
              <p className="font-medium">
                {transaction.category} - ₹ {transaction.amount}
              </p>
              <p className="text-sm text-slate-400">
                {transaction.date}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(transaction)}
                className="bg-slate-600 px-3 py-1 rounded-md text-sm hover:bg-slate-500 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(transaction.id)}
                className="bg-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-500 transition"
              >
                Delete
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;