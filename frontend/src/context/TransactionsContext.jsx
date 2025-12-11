import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  createTransaction,
  deleteTransactionRequest,
  fetchTransactions,
} from "../api";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
      setError(null);
    } catch (err) {
      const message = err.response?.data?.error || "Unable to load transactions.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const addTransaction = useCallback(
    async (payload) => {
      setPending(true);
      try {
        const created = await createTransaction(payload);
        setTransactions((prev) => [created, ...prev]);
        toast.success(`${created.type === "income" ? "Income" : "Expense"} added`);
        return { success: true };
      } catch (err) {
        const message = err.response?.data?.error || "Unable to add transaction.";
        toast.error(message);
        return { success: false, message };
      } finally {
        setPending(false);
      }
    },
    []
  );

  const deleteTransaction = useCallback(async (id) => {
    setPending(true);
    try {
      await deleteTransactionRequest(id);
      setTransactions((prev) => prev.filter((txn) => txn.id !== id));
      toast.success("Transaction deleted");
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.error || "Unable to delete transaction.";
      toast.error(message);
      return { success: false, message };
    } finally {
      setPending(false);
    }
  }, []);

  const totals = useMemo(() => {
    const income = transactions
      .filter((txn) => txn.type === "income")
      .reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
    const expense = transactions
      .filter((txn) => txn.type === "expense")
      .reduce((sum, txn) => sum + Number(txn.amount || 0), 0);

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const value = {
    transactions,
    loading,
    pending,
    error,
    totals,
    refresh: loadTransactions,
    addTransaction,
    deleteTransaction,
  };

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within TransactionsProvider");
  }
  return context;
};

