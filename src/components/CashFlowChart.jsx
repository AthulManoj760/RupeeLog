import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useMemo } from "react";

function CashFlowChart({ transactions, theme }) {

  const chartData = useMemo(() => {
    // Group transactions by date
    const grouped = transactions.reduce((acc, t) => {
      if (!acc[t.date]) {
        acc[t.date] = { date: t.date, income: 0, expense: 0 };
      }
      if (t.type === "income") {
        acc[t.date].income += Number(t.amount);
      } else {
        acc[t.date].expense += Number(t.amount);
      }
      return acc;
    }, {});

    // Convert to sorted array
    return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [transactions]);

  if (chartData.length === 0) {
    return null; /* Hide if no data */
  }

  const gridStroke = theme === 'dark' ? '#334155' : '#e2e8f0';
  const axisStroke = theme === 'dark' ? '#94a3b8' : '#64748b';
  const tooltipBg  = theme === 'dark' ? '#1e293b' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '1px solid #334155' : '1px solid #e2e8f0';
  const tooltipColor = theme === 'dark' ? '#f8fafc' : '#0f172a';

  return (
    <div className="w-full h-[400px] mt-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm dark:shadow-xl flex flex-col transition-colors duration-300">
      <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-6">Cash Flow Trend</h3>
      <div className="flex-1 min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} opacity={0.5} />
            <XAxis dataKey="date" stroke={axisStroke} tick={{ fill: axisStroke }} />
            <YAxis stroke={axisStroke} tick={{ fill: axisStroke }} />
            <Tooltip 
              contentStyle={{ backgroundColor: tooltipBg, border: tooltipBorder, borderRadius: '12px', color: tooltipColor }}
              itemStyle={{ color: tooltipColor }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" name="Income" dataKey="income" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line type="monotone" name="Expense" dataKey="expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444', strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CashFlowChart;
