interface Transaction {
  amount: number;
  status: "Income" | "Expense";
}

interface SummaryCardsProps {
  transactions: Transaction[];
}

function SummaryCards({ transactions }: SummaryCardsProps) {
  const totalRevenue = transactions
    .filter((transaction) => transaction.status === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.status === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalRevenue - totalExpenses;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      {/* Revenue */}
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Total Revenue
        </p>

        <h2 style={{ margin: "10px 0 0" }}>
          ₹{totalRevenue.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Expenses */}
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Total Expenses
        </p>

        <h2 style={{ margin: "10px 0 0" }}>
          ₹{totalExpenses.toLocaleString("en-IN")}
        </h2>
      </div>

      {/* Balance */}
      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "14px",
          }}
        >
          Balance
        </p>

        <h2 style={{ margin: "10px 0 0" }}>
          ₹{balance.toLocaleString("en-IN")}
        </h2>
      </div>
    </div>
  );
}

export default SummaryCards;