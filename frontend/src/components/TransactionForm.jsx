import { useState } from "react";
import { useTransactions } from "../context/TransactionsContext";

const initialForm = {
  title: "",
  amount: "",
  category: "",
  type: "expense",
};

const TransactionForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const { addTransaction, pending } = useTransactions();

  const validate = () => {
    const validationErrors = {};
    if (!form.title.trim()) {
      validationErrors.title = "Title is required";
    }
    const amount = Number(form.amount);
    if (!amount || amount <= 0) {
      validationErrors.amount = "Enter a positive amount";
    }
    if (!["income", "expense"].includes(form.type)) {
      validationErrors.type = "Select a type";
    }
    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category.trim() || "General",
      type: form.type,
    };

    const result = await addTransaction(payload);
    if (result.success) {
      setForm(initialForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-slate-100 bg-white p-4 shadow-card"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Title
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Salary"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </label>
          {errors.title && <p className="mt-1 text-xs text-rose-500">{errors.title}</p>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Amount (PKR)
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="1000"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </label>
          {errors.amount && <p className="mt-1 text-xs text-rose-500">{errors.amount}</p>}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Category
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Utilities, Salary, etc."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Type</p>
          <div className="mt-2 flex items-center gap-4">
            {["income", "expense"].map((type) => (
              <label
                key={type}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-2xl border px-4 py-3 text-sm font-medium capitalize transition ${
                  form.type === type
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={form.type === type}
                  onChange={handleChange}
                  className="hidden"
                />
                {type}
              </label>
            ))}
          </div>
          {errors.type && <p className="mt-1 text-xs text-rose-500">{errors.type}</p>}
        </div>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
      >
        {pending ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
};

export default TransactionForm;

