import { useState } from "react";
import { useTransactions } from "../context/TransactionsContext";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-PK", { style: "currency", currency: "PKR" });

const ConfirmModal = ({ open, title, message, onConfirm, onCancel, loading }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-500">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-2xl bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600 disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const TransactionsTable = () => {
  const { transactions, loading, deleteTransaction, pending } = useTransactions();
  const [selectedId, setSelectedId] = useState(null);

  const openConfirm = (id) => setSelectedId(id);
  const closeConfirm = () => setSelectedId(null);

  const handleDelete = async () => {
    if (!selectedId) return;
    await deleteTransaction(selectedId);
    setSelectedId(null);
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        <span className="text-xs text-slate-400">{transactions.length} records</span>
      </div>
      <div className="mt-4 overflow-auto">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton h-12 w-full bg-slate-200" />
            ))}
          </div>
        ) : transactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-center">
            <p className="text-sm font-medium text-slate-600">No transactions yet</p>
            <p className="text-xs text-slate-400">
              Add your first income or expense to see it here.
            </p>
          </div>
        ) : (
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-widest text-slate-400">
                <th className="py-3">Title</th>
                <th className="py-3">Category</th>
                <th className="py-3">Type</th>
                <th className="py-3">Date</th>
                <th className="py-3 text-right">Amount</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.id} className="border-t border-slate-100">
                  <td className="py-4 font-medium text-slate-900">{txn.title}</td>
                  <td className="py-4 text-slate-500">{txn.category}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        txn.type === "income"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="py-4 text-slate-500">
                    {new Date(txn.date).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right font-semibold text-slate-900">
                    {formatCurrency(txn.amount)}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      type="button"
                      onClick={() => openConfirm(txn.id)}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ConfirmModal
        open={Boolean(selectedId)}
        title="Delete transaction?"
        message="This action cannot be undone."
        onConfirm={handleDelete}
        onCancel={closeConfirm}
        loading={pending}
      />
    </div>
  );
};

export default TransactionsTable;

