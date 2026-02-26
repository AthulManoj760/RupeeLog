import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const COLORS = [
  "#6366f1", // Indigo
  "#22d3ee", // Cyan
  "#f59e0b", // Amber
  "#ec4899", // Pink
  "#10b981", // Emerald
];

function CategoryChart({ transactions }) {
  // Filter only expenses
  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  // Group by category
  const categoryData = expenseTransactions.reduce((acc, t) => {
    const existing = acc.find((item) => item.name === t.category);
    if (existing) {
      existing.value += t.amount;
    } else {
      acc.push({ name: t.category, value: t.amount });
    }
    return acc;
  }, []);

  if (categoryData.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-slate-800 p-8 rounded-2xl shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <h3 className="text-xl font-medium mb-6 text-center tracking-wide">
        Category-wise Expense
      </h3>

      <div className="w-full h-[320px] flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={95}
              innerRadius={65}
              paddingAngle={4}
              isAnimationActive={true}
              animationDuration={1400}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#1e293b"
                  strokeWidth={3}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "12px",
                color: "#ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
              }}
              formatter={(value) => `₹ ${value}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Modern Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {categoryData.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-slate-700/70 backdrop-blur-md px-4 py-2 rounded-lg transition hover:scale-105"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
              }}
            ></div>
            <span className="text-sm text-slate-200">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default CategoryChart;