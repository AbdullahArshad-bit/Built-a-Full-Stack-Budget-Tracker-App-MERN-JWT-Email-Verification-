import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionsTable from "../components/TransactionsTable";
import { useTransactions } from "../context/TransactionsContext";

const Transactions = () => {
  const { totals, loading } = useTransactions();

  return (
    <div className="space-y-6">
      <SummaryCards stats={totals} loading={loading} />
      <div className="grid gap-6 lg:grid-cols-2">
        <TransactionForm />
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
          <h3 className="text-lg font-semibold text-slate-900">Guidelines</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>• Income increases your balance, expenses decrease it.</li>
            <li>• Use consistent categories to unlock richer analytics.</li>
            <li>• Delete only after confirming from finance logs.</li>
            <li>• All figures auto-format to PKR.</li>
          </ul>
        </div>
      </div>
      <TransactionsTable />
    </div>
  );
};

export default Transactions;

