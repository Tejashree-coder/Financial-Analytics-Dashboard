
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// @ts-expect-error CSS is handled by the bundler and has no TypeScript declarations.
import "./Analytics.css";

function Analytics() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Sample analytics data
  const monthlyData = [
    { month: "Apr", income: 42000, expense: 28000 },
    { month: "May", income: 48000, expense: 31000 },
    { month: "Jun", income: 52000, expense: 35000 },
    { month: "Jul", income: 46000, expense: 30000 },
    { month: "Aug", income: 58000, expense: 39000 },
    { month: "Sep", income: 62000, expense: 42000 },
  ];

  const totals = useMemo(() => {
    const income = monthlyData.reduce(
      (sum, item) => sum + item.income,
      0
    );

    const expense = monthlyData.reduce(
      (sum, item) => sum + item.expense,
      0
    );

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, []);

  return (
    <div className="analytics-page">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar handleLogout={handleLogout} />

      {/* Main */}
      <main className="analytics-main">

        {/* Header */}
        <div className="analytics-header">
          <div>
            <h1>Analytics</h1>
            <p>Track and analyze your transaction activity</p>
          </div>

          <select className="analytics-filter">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>This Year</option>
          </select>
        </div>

        {/* Stats */}
        <div className="analytics-stats">

          <div className="analytics-stat-card">
            <div className="stat-icon income-icon">
              ↗
            </div>

            <div>
              <p>Total Income</p>
              <h2>₹{totals.income.toLocaleString("en-IN")}</h2>
              <span className="positive">
                +12.5% from last period
              </span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon expense-icon">
              ↘
            </div>

            <div>
              <p>Total Expense</p>
              <h2>₹{totals.expense.toLocaleString("en-IN")}</h2>
              <span className="negative">
                +8.2% from last period
              </span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon balance-icon">
              ₹
            </div>

            <div>
              <p>Net Balance</p>
              <h2>₹{totals.balance.toLocaleString("en-IN")}</h2>
              <span className="positive">
                +15.3% from last period
              </span>
            </div>
          </div>

          <div className="analytics-stat-card">
            <div className="stat-icon transaction-icon">
              #
            </div>

            <div>
              <p>Total Transactions</p>
              <h2>128</h2>
              <span className="neutral">
                18 this month
              </span>
            </div>
          </div>

        </div>

        {/* Charts Area */}
        <div className="analytics-grid">

          {/* Monthly Overview */}
          <div className="analytics-card monthly-card">

            <div className="analytics-card-header">
              <div>
                <h2>Monthly Overview</h2>
                <p>Income and expenses over the last 6 months</p>
              </div>

              <div className="chart-legend">
                <span>
                  <i className="legend-income"></i>
                  Income
                </span>

                <span>
                  <i className="legend-expense"></i>
                  Expense
                </span>
              </div>
            </div>

            <div className="bar-chart">

              {monthlyData.map((item) => {
                const maxValue = 65000;

                return (
                  <div
                    className="bar-column"
                    key={item.month}
                  >
                    <div className="bars">

                      <div
                        className="bar income-bar"
                        style={{
                          height: `${(item.income / maxValue) * 180}px`,
                        }}
                        title={`Income: ₹${item.income.toLocaleString("en-IN")}`}
                      ></div>

                      <div
                        className="bar expense-bar"
                        style={{
                          height: `${(item.expense / maxValue) * 180}px`,
                        }}
                        title={`Expense: ₹${item.expense.toLocaleString("en-IN")}`}
                      ></div>

                    </div>

                    <span>{item.month}</span>
                  </div>
                );
              })}

            </div>

          </div>

          {/* Transaction Status */}
          <div className="analytics-card">

            <div className="analytics-card-header">
              <div>
                <h2>Transaction Status</h2>
                <p>Current transaction breakdown</p>
              </div>
            </div>

            <div className="status-chart">

              <div className="donut">
                <div className="donut-center">
                  <strong>128</strong>
                  <span>Total</span>
                </div>
              </div>

              <div className="status-list">

                <div className="status-item">
                  <span className="status-color completed"></span>

                  <div>
                    <strong>Completed</strong>
                    <span>82 transactions</span>
                  </div>

                  <b>64%</b>
                </div>

                <div className="status-item">
                  <span className="status-color pending"></span>

                  <div>
                    <strong>Pending</strong>
                    <span>28 transactions</span>
                  </div>

                  <b>22%</b>
                </div>

                <div className="status-item">
                  <span className="status-color failed"></span>

                  <div>
                    <strong>Failed</strong>
                    <span>18 transactions</span>
                  </div>

                  <b>14%</b>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Category Breakdown */}
        <div className="analytics-card category-card">

          <div className="analytics-card-header">
            <div>
              <h2>Transaction Categories</h2>
              <p>Breakdown of your transaction activity</p>
            </div>
          </div>

          <div className="category-list">

            <div className="category-row">
              <div className="category-name">
                <span className="category-dot"></span>
                Food & Dining
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: "72%" }}
                ></div>
              </div>

              <span className="category-percent">
                72%
              </span>
            </div>

            <div className="category-row">
              <div className="category-name">
                <span className="category-dot"></span>
                Shopping
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: "58%" }}
                ></div>
              </div>

              <span className="category-percent">
                58%
              </span>
            </div>

            <div className="category-row">
              <div className="category-name">
                <span className="category-dot"></span>
                Bills & Utilities
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: "44%" }}
                ></div>
              </div>

              <span className="category-percent">
                44%
              </span>
            </div>

            <div className="category-row">
              <div className="category-name">
                <span className="category-dot"></span>
                Travel
              </div>

              <div className="progress-container">
                <div
                  className="progress-bar"
                  style={{ width: "31%" }}
                ></div>
              </div>

              <span className="category-percent">
                31%
              </span>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default Analytics;

