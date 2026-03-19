import { motion } from "framer-motion";

function TransactionList({ transactions, handleDelete, handleEdit, theme }) {
  if (transactions.length === 0) {
    return (
      <div className="mt-10 text-center text-slate-500 dark:text-slate-400">
        No transactions yet.
      </div>
    );
  }

  return (
    <div className="mt-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm dark:shadow-xl transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800 dark:text-white">Recent Transactions</h2>

      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <motion.li
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:-translate-y-1 hover:shadow-md dark:hover:shadow-lg transition-all duration-300"
          >
            {/* Transaction Info */}
            <div className="flex flex-col w-full sm:w-auto">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/10 px-2 py-0.5 rounded text-left w-fit mb-1 border border-blue-200 dark:border-blue-500/20">
                {transaction.category}
              </span>
              <p className="font-semibold text-lg text-slate-800 dark:text-white">
                {transaction.description ? transaction.description : transaction.category} 
                <span className={`ml-3 ${transaction.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                  {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount}
                </span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => handleEdit(transaction)}
                className="bg-slate-200 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(transaction.id)}
                className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-300 px-4 py-2 rounded-lg text-sm hover:bg-red-100 dark:hover:bg-red-500/20 transition"
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