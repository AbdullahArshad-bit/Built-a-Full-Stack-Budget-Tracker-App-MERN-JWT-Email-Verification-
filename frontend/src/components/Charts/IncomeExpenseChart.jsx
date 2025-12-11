import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const IncomeExpenseChart = ({ transactions, loading }) => {
  const chartData = useMemo(() => {
    if (!transactions.length) return [];
    const grouped = transactions.reduce((acc, txn) => {
      const date = new Date(txn.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      if (!acc[key]) {
        acc[key] = {
          key,
          order: date.getTime(),
          month: date.toLocaleString("default", { month: "short" }),
          income: 0,
          expense: 0,
        };
      }
      acc[key][txn.type] += Number(txn.amount || 0);
      return acc;
    }, {});

    return Object.values(grouped).sort((a, b) => a.order - b.order);
  }, [transactions]);

  return (
    <div className="h-80">
      {loading ? (
        <div className="skeleton h-full w-full bg-slate-200" />
      ) : chartData.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-400">
          Add data to view this chart
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default IncomeExpenseChart;

