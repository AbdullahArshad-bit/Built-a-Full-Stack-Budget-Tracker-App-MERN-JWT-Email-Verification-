import { useMemo, useState } from "react";
import SummaryCards from "../components/SummaryCards";
import { useTransactions } from "../context/TransactionsContext";

const formatCurrency = (value) =>
  value.toLocaleString("en-PK", { style: "currency", currency: "PKR" });

const Categories = () => {
  const { transactions, totals, loading } = useTransactions();
  const [filter, setFilter] = useState("expense");

  const grouped = useMemo(() => {
    const map = transactions
      .filter((txn) => (filter === "all" ? true : txn.type === filter))
      .reduce((acc, txn) => {
        const key = txn.category || "General";
        if (!acc[key]) {
          acc[key] = { name: key, total: 0, count: 0 };
        }
        acc[key].total += Number(txn.amount || 0);
        acc[key].count += 1;
        return acc;
      }, {});
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [transactions, filter]);

  return (
    <div className="space-y-6">
      <SummaryCards stats={totals} loading={loading} />
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Categories Overview</h3>
            <p className="text-sm text-slate-500">
              Track how each category contributes to your budget.
            </p>
          </div>
          <div className="flex gap-2">
            {["income", "expense", "all"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFilter(option)}
                className={`rounded-2xl px-4 py-2 text-sm font-semibold capitalize ${
                  filter === option
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {grouped.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
            No data yet. Add a few transactions to see category insights.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {grouped.map((category) => (
              <div
                key={category.name}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600"
              >
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  {category.count} entries
                </p>
                <h4 className="text-xl font-semibold text-slate-900">{category.name}</h4>
                <p className="mt-2 text-base font-semibold text-slate-700">
                  {formatCurrency(category.total)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

