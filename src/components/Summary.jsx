import { motion } from "framer-motion";

function Summary({ balance, income, expense }) {

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

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      {/* Balance */}

      <motion.div
        custom={0}
        initial="hidden"
        animate="show"
        variants={cardAnimation}
        whileHover={{ scale: 1.05 }}
        className="bg-slate-800 p-6 rounded-xl shadow-lg text-center"
      >
        <h2 className="text-lg text-slate-300">Balance</h2>
        <p className="text-2xl font-bold text-white mt-2">
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
        className="bg-green-700 p-6 rounded-xl shadow-lg text-center"
      >
        <h2 className="text-lg text-slate-200">Income</h2>
        <p className="text-2xl font-bold text-white mt-2">
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
        className="bg-red-700 p-6 rounded-xl shadow-lg text-center"
      >
        <h2 className="text-lg text-slate-200">Expense</h2>
        <p className="text-2xl font-bold text-white mt-2">
          ₹ {expense}
        </p>
      </motion.div>

    </div>
  );
}

export default Summary;