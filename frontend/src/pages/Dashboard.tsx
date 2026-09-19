import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

// @ts-expect-error
import "./Dashboard.css";

interface Transaction {
  _id: string;
  title?: string;
  category: string;
  amount: number;
  status: string;
  createdAt?: string;
  date?: string;
}

function Dashboard() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");

      setTransactions(res.data);
    } catch (error) {
      console.log("Dashboard transaction error:", error);

      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================
  // CALCULATE SUMMARY
  // =========================

  const income = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.status === "Income"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );
  }, [transactions]);

  const expenses = useMemo(() => {
    return transactions
      .filter(
        (transaction) =>
          transaction.status === "Expense"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );
  }, [transactions]);

  const balance = income - expenses;

  const savings = balance > 0 ? balance : 0;

  // =========================
  // CATEGORY BREAKDOWN
  // =========================

  const categoryData = useMemo(() => {
    const categoryMap: {
      [key: string]: number;
    } = {};

    transactions.forEach((transaction) => {
      const category =
        transaction.category || "Other";

      categoryMap[category] =
        (categoryMap[category] || 0) +
        Number(transaction.amount);
    });

    return Object.entries(categoryMap).map(
      ([name, value]) => ({
        name,
        value,
      })
    );
  }, [transactions]);

  // =========================
  // MONTHLY CHART
  // =========================

  const monthlyData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const result = months.map((month) => ({
      month,
      income: 0,
      expenses: 0,
    }));

    transactions.forEach((transaction) => {
      const transactionDate =
        transaction.date ||
        transaction.createdAt;

      if (!transactionDate) return;

      const date = new Date(transactionDate);

      if (isNaN(date.getTime())) return;

      const monthIndex = date.getMonth();

      if (transaction.status === "Income") {
        result[monthIndex].income += Number(
          transaction.amount
        );
      }

      if (transaction.status === "Expense") {
        result[monthIndex].expenses += Number(
          transaction.amount
        );
      }
    });

    return result;
  }, [transactions]);

  // =========================
  // RECENT TRANSACTIONS
  // =========================

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .reverse()
      .slice(0, 3);
  }, [transactions]);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  // =========================
  // FORMAT MONEY
  // =========================

  const formatMoney = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`;
  };

  // =========================
  // PIE COLORS
  // =========================

  const pieColors = [
    "#22c55e",
    "#f59e0b",
    "#3b82f6",
    "#a855f7",
    "#ec4899",
    "#14b8a6",
  ];

  return (
    <div className="dashboard-page">

      {/* =========================
          SIDEBAR
      ========================= */}

      <Sidebar
        handleLogout={handleLogout}
      />

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar />

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="dashboard-main">

        {/* =========================
            PAGE HEADER
        ========================= */}

        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p>
              Track your income, expenses and
              financial overview
            </p>
          </div>
        </div>

        {/* =========================
            SUMMARY CARDS
        ========================= */}

        <div className="summary-grid">

          {/* BALANCE */}

          <div className="summary-card">
            <div className="summary-icon">
              ▣
            </div>

            <div className="summary-content">
              <span>Balance</span>

              <strong>
                {loading
                  ? "..."
                  : formatMoney(balance)}
              </strong>
            </div>
          </div>

          {/* REVENUE */}

          <div className="summary-card">
            <div className="summary-icon">
              $
            </div>

            <div className="summary-content">
              <span>Revenue</span>

              <strong>
                {loading
                  ? "..."
                  : formatMoney(income)}
              </strong>
            </div>
          </div>

          {/* EXPENSES */}

          <div className="summary-card">
            <div className="summary-icon">
              ▰
            </div>

            <div className="summary-content">
              <span>Expenses</span>

              <strong>
                {loading
                  ? "..."
                  : formatMoney(expenses)}
              </strong>
            </div>
          </div>

          {/* SAVINGS */}

          <div className="summary-card">
            <div className="summary-icon">
              $
            </div>

            <div className="summary-content">
              <span>Savings</span>

              <strong>
                {loading
                  ? "..."
                  : formatMoney(savings)}
              </strong>
            </div>
          </div>
        </div>

        {/* =========================
            CHART + RECENT TRANSACTIONS
        ========================= */}

        <div className="dashboard-two-column">

          {/* =========================
              OVERVIEW
          ========================= */}

          <div className="dashboard-card overview-card">

            <div className="card-header">
              <div>
                <h2>Overview</h2>

                <span>
                  Income and expenses overview
                </span>
              </div>

              <div className="chart-controls">

                <span>
                  <span className="legend-dot income-dot">
                    ●
                  </span>{" "}
                  Income
                </span>

                <span>
                  <span className="legend-dot expense-dot">
                    ●
                  </span>{" "}
                  Expenses
                </span>

                <select>
                  <option>Monthly</option>
                </select>

              </div>
            </div>

            <div className="line-chart-container">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={monthlyData}
                >
                  <CartesianGrid
                    stroke="#30343d"
                    strokeDasharray="4 4"
                  />

                  <XAxis
                    dataKey="month"
                    stroke="#8b909c"
                    tick={{
                      fontSize: 10,
                    }}
                  />

                  <YAxis
                    stroke="#8b909c"
                    tick={{
                      fontSize: 10,
                    }}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#242832",
                      border:
                        "1px solid #363b47",
                      borderRadius: "8px",
                      color: "white",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* =========================
              RECENT TRANSACTIONS
          ========================= */}

          <div className="dashboard-card recent-card">

            <div className="card-header">
              <div>
                <h2>
                  Recent Transactions
                </h2>

                <span>
                  Latest financial activity
                </span>
              </div>

              <button
                className="see-all-button"
                onClick={() =>
                  navigate("/transactions")
                }
              >
                See all
              </button>
            </div>

            {recentTransactions.length ===
            0 ? (
              <p className="empty-text">
                No transactions found.
              </p>
            ) : (
              <div className="recent-list">

                {recentTransactions.map(
                  (transaction) => (
                    <div
                      key={transaction._id}
                      className="recent-item"
                    >

                      <div className="recent-left">

                        <div className="recent-icon">
                          {transaction.title
                            ?.charAt(0)
                            .toUpperCase() ||
                            "T"}
                        </div>

                        <div>
                          <div className="recent-type">
                            {transaction.status ===
                            "Income"
                              ? "Income"
                              : "Expense"}
                          </div>

                          <div className="recent-title">
                            {transaction.title ||
                              transaction.category}
                          </div>
                        </div>

                      </div>

                      <strong
                        className={
                          transaction.status ===
                          "Income"
                            ? "recent-amount income"
                            : "recent-amount expense"
                        }
                      >
                        {transaction.status ===
                        "Income"
                          ? "+"
                          : "-"}
                        {formatMoney(
                          Number(
                            transaction.amount
                          )
                        )}
                      </strong>

                    </div>
                  )
                )}

              </div>
            )}
          </div>
        </div>

        {/* =========================
            CATEGORY BREAKDOWN
        ========================= */}

        <div className="dashboard-card category-card">

          <div className="card-header">
            <div>
              <h2>Category Breakdown</h2>

              <span>
                Spending and income by category
              </span>
            </div>
          </div>

          {categoryData.length === 0 ? (
            <p className="empty-text">
              No category data available.
            </p>
          ) : (
            <div className="category-content">

              <div className="pie-chart-container">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                    >
                      {categoryData.map(
                        (_, index) => (
                          <Cell
                            key={index}
                            fill={
                              pieColors[
                                index %
                                  pieColors.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        background:
                          "#242832",
                        border:
                          "1px solid #363b47",
                        borderRadius:
                          "8px",
                        color: "white",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="category-list">

                {categoryData.map(
                  (category, index) => (
                    <div
                      key={category.name}
                      className="category-item"
                    >

                      <span
                        className="category-dot"
                        style={{
                          background:
                            pieColors[
                              index %
                                pieColors.length
                            ],
                        }}
                      />

                      <span className="category-name">
                        {category.name}
                      </span>

                      <strong>
                        {formatMoney(
                          category.value
                        )}
                      </strong>

                    </div>
                  )
                )}

              </div>
            </div>
          )}
        </div>

        {/* =========================
            TRANSACTIONS TABLE
        ========================= */}

        <div className="dashboard-card transactions-card">

          <div className="card-header">

            <div>
              <h2>Transactions</h2>

              <span>
                Latest transactions
              </span>
            </div>

            <button
              className="view-all-button"
              onClick={() =>
                navigate("/transactions")
              }
            >
              View All
            </button>

          </div>

          <div className="dashboard-table-wrapper">

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {transactions
                  .slice(0, 5)
                  .map((transaction) => (
                    <tr
                      key={transaction._id}
                    >

                      <td>
                        <strong>
                          {transaction.title ||
                            transaction.category}
                        </strong>
                      </td>

                      <td className="muted-text">
                        {transaction.date
                          ? new Date(
                              transaction.date
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : transaction.createdAt
                          ? new Date(
                              transaction.createdAt
                            ).toLocaleDateString(
                              "en-IN"
                            )
                          : "-"}
                      </td>

                      <td className="muted-text">
                        {transaction.category}
                      </td>

                      <td>
                        <span
                          className={
                            transaction.status ===
                            "Income"
                              ? "table-income"
                              : "table-expense"
                          }
                        >
                          {transaction.status ===
                          "Income"
                            ? "+"
                            : "-"}
                          {formatMoney(
                            Number(
                              transaction.amount
                            )
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            transaction.status ===
                            "Income"
                              ? "dashboard-status income-status"
                              : "dashboard-status expense-status"
                          }
                        >
                          {transaction.status}
                        </span>
                      </td>

                    </tr>
                  ))}

              </tbody>
            </table>

            {transactions.length === 0 &&
              !loading && (
                <div className="dashboard-empty">
                  No transactions found.
                </div>
              )}

          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;