import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#AA336A"];

function CategoryChart({ transactions, theme }) {

  // Filter only expenses
  const expenseTransactions = transactions.filter(
    (t) => t.type === "expense"
  );

  // Group by category
  const categoryData = expenseTransactions.reduce((acc, t) => {

    const existing = acc.find((item) => item.name === t.category);

    if (existing) {
      existing.value += Number(t.amount);
    } else {
      acc.push({
        name: t.category,
        value: Number(t.amount)
      });
    }

    return acc;

  }, []);

  // If no expense data
  if (categoryData.length === 0) {
    return (
      <div className="mt-10 text-center text-slate-500 dark:text-slate-400">
        No expense data to display
      </div>
    );
  }

  const tooltipBg  = theme === 'dark' ? '#1e293b' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0';
  const tooltipColor = theme === 'dark' ? '#f8fafc' : '#0f172a';

  return (

    <div className="w-full h-[400px] mt-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col transition-colors duration-300">

      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">
        Category-wise Expense
      </h3>

      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={categoryData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            paddingAngle={3}
          >

            {categoryData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip
            formatter={(value) => `₹ ${value}`}
            contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '12px', color: tooltipColor }}
            itemStyle={{ color: tooltipColor }}
          />

          <Legend wrapperStyle={{ paddingTop: '20px' }} />

        </PieChart>

        </ResponsiveContainer>
      </div>

    </div>

  );

}

export default CategoryChart;