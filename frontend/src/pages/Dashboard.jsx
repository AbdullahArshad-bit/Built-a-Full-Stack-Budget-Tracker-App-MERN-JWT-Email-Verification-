import SummaryCards from "../components/SummaryCards";
import ExpensePie from "../components/Charts/ExpensePie";
import IncomeExpenseChart from "../components/Charts/IncomeExpenseChart";
import { useTransactions } from "../context/TransactionsContext";

const Dashboard = () => {
  const { totals, transactions, loading } = useTransactions();

  return (
    <div className="space-y-6">
      <SummaryCards stats={totals} loading={loading} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Expense Breakdown</h3>
            <p className="text-xs text-slate-400">Live data</p>
          </div>
          <ExpensePie transactions={transactions} loading={loading} />
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Income vs Expense</h3>
            <p className="text-xs text-slate-400">Animated bars</p>
          </div>
          <IncomeExpenseChart transactions={transactions} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

