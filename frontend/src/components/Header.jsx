import { useMemo } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { useTransactions } from "../context/TransactionsContext";
import { useAuth } from "../context/AuthContext";

const Header = ({ title }) => {
  const { refresh, pending, totals, loading } = useTransactions();
  const { user } = useAuth();
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return ["Dashboard"];
    return segments.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1));
  }, [location.pathname]);

  const formatCurrency = (value) =>
    value.toLocaleString("en-PK", { style: "currency", currency: "PKR" });

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-slate-100 bg-white/80 px-4 py-4 backdrop-blur lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            {breadcrumbs.join(" / ")}
          </p>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            {user && (
              <span className="text-sm text-slate-500">Welcome, {user.name}</span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={refresh}
          disabled={loading || pending}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 disabled:opacity-60"
        >
          <ArrowPathIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>
      <div className="grid gap-3 text-sm text-slate-500 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900/90 px-4 py-3 text-slate-50 shadow-card">
          <p className="text-xs uppercase tracking-widest text-slate-200">Income</p>
          <p className="text-lg font-semibold">{formatCurrency(totals.income)}</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-card">
          <p className="text-xs uppercase tracking-widest text-slate-400">Expense</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatCurrency(totals.expense)}
          </p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 shadow-card">
          <p className="text-xs uppercase tracking-widest text-slate-400">Balance</p>
          <p
            className={`text-lg font-semibold ${
              totals.balance >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {formatCurrency(totals.balance)}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;

