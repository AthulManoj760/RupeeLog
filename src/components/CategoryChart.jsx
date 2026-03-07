import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#FF8042", "#AA336A"];

function CategoryChart({ transactions }) {

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
      <div className="mt-10 text-center text-slate-400">
        No expense data to display
      </div>
    );
  }

  return (

    <div className="w-full h-[350px] mt-10 bg-slate-800 rounded-xl p-6">

      <h3 className="text-xl text-white text-center mb-4">
        Category-wise Expense
      </h3>

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
          />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default CategoryChart;