const formatter = (value) =>
  value.toLocaleString("en-PK", { style: "currency", currency: "PKR" });

const cards = [
  {
    key: "income",
    label: "Total Income",
    accent: "from-emerald-500 to-emerald-600",
    text: "text-white",
  },
  {
    key: "expense",
    label: "Total Expense",
    accent: "from-rose-500 to-rose-600",
    text: "text-white",
  },
  {
    key: "balance",
    label: "Net Balance",
    accent: "from-indigo-500 to-indigo-600",
    text: "text-white",
  },
];

const SummaryCards = ({ stats, loading }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`rounded-3xl bg-gradient-to-br ${card.accent} ${card.text} p-6 shadow-card`}
        >
          <p className="text-sm uppercase tracking-widest text-white/70">{card.label}</p>
          <p className="mt-4 text-3xl font-semibold">
            {loading ? (
              <span className="skeleton inline-block h-8 w-32 bg-white/20" />
            ) : (
              formatter(stats[card.key] || 0)
            )}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;

