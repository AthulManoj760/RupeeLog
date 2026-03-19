import { motion } from "framer-motion";

function Summary({ balance, income, expense, isOverBudget }) {

  const cardAnimation = {
    hidden: { opacity: 0, y: 30 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  return (

    <div>
      {/* Budget warning alert */}
      {isOverBudget && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-200 flex items-center gap-3 shadow-sm dark:shadow-md"
        >
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-red-700 dark:text-red-300">Budget Alert</h4>
            <p className="text-sm opacity-90 text-red-600 dark:text-red-200">You have spent over 80% of your income this month!</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

      {/* Balance */}

      <motion.div
        custom={0}
        initial="hidden"
        animate="show"
        variants={cardAnimation}
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm dark:shadow-lg flex flex-col justify-center transition-colors duration-300"
      >
        <h2 className="text-lg font-medium text-slate-500 dark:text-slate-400">Total Balance</h2>
        <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? "text-slate-800 dark:text-white" : "text-red-500 dark:text-red-400"}`}>
          ₹ {balance}
        </p>
      </motion.div>


      {/* Income */}

      <motion.div
        custom={1}
        initial="hidden"
        animate="show"
        variants={cardAnimation}
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm dark:shadow-lg flex flex-col justify-center transition-colors duration-300"
      >
        <h2 className="text-lg font-medium text-emerald-600 dark:text-emerald-400">Income</h2>
        <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
          ₹ {income}
        </p>
      </motion.div>


      {/* Expense */}

      <motion.div
        custom={2}
        initial="hidden"
        animate="show"
        variants={cardAnimation}
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl shadow-sm dark:shadow-lg flex flex-col justify-center transition-colors duration-300"
      >
        <h2 className="text-lg font-medium text-red-600 dark:text-red-400">Expense</h2>
        <p className="text-3xl font-bold text-slate-800 dark:text-white mt-2">
          ₹ {expense}
        </p>
      </motion.div>

    </div>
  </div>
  );
}

export default Summary;