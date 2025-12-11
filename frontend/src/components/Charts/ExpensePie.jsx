import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#6366f1", "#f97316", "#ec4899", "#14b8a6", "#facc15"];

const ExpensePie = ({ transactions, loading }) => {
  const chartData = useMemo(() => {
    const map = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((acc, txn) => {
        const key = txn.category || "General";
        acc[key] = (acc[key] || 0) + Number(txn.amount || 0);
        return acc;
      }, {});

    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div className="h-80">
      {loading ? (
        <div className="skeleton h-full w-full bg-slate-200" />
      ) : chartData.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-slate-400">
          No expense data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
            >
              {chartData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpensePie;

