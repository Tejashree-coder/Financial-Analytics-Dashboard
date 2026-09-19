import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

// @ts-expect-error
import "./Transactions.css";

function Transactions() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [transactions, setTransactions] = useState<any[]>([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Income");

  const [message, setMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  // =========================
  // FETCH TRANSACTIONS
  // =========================

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions");
      setTransactions(res.data);
    } catch (error) {
      console.error("Fetch transactions failed:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================
  // ADD TRANSACTION
  // =========================

  const addTransaction = async () => {
    if (!title || !category || !amount) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      const res = await api.post("/transactions", {
        title,
        category,
        amount: Number(amount),
        status,
      });

      setTransactions([...transactions, res.data]);

      setTitle("");
      setCategory("");
      setAmount("");
      setStatus("Income");

      setMessage("Transaction Added Successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Add transaction failed:", error);
      setMessage("Failed to Add Transaction");
    }
  };

  // =========================
  // EXPORT CSV
  // =========================

  const exportCSV = async () => {
    try {
      const response = await api.get("/transactions/export/csv", {
        responseType: "blob",
      });

      const blob = new Blob([response.data], {
        type: "text/csv;charset=utf-8;",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      setMessage("CSV Exported Successfully");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("CSV export failed:", error);
      setMessage("Failed to Export CSV");
    }
  };

  // =========================
  // DELETE TRANSACTION
  // =========================

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`);

      setTransactions(
        transactions.filter(
          (transaction) => transaction._id !== id
        )
      );

      setMessage("Transaction Deleted");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Delete transaction failed:", error);
      setMessage("Delete Failed");
    }
  };

  // =========================
  // SEARCH + FILTER
  // =========================

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        transaction.title
          ?.toLowerCase()
          .includes(searchText) ||
        transaction.category
          ?.toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "All"
          ? true
          : transaction.status === filter;

      return matchesSearch && matchesFilter;
    }
  );

  // =========================
  // SORT
  // =========================

  const sortedTransactions = [...filteredTransactions];

  if (sortOrder === "asc") {
    sortedTransactions.sort(
      (a, b) => a.amount - b.amount
    );
  }

  if (sortOrder === "desc") {
    sortedTransactions.sort(
      (a, b) => b.amount - a.amount
    );
  }

  // =========================
  // PAGINATION
  // =========================

  const totalPages = Math.ceil(
    sortedTransactions.length / itemsPerPage
  );

  const safeCurrentPage =
    totalPages > 0
      ? Math.min(currentPage, totalPages)
      : 1;

  const lastIndex =
    safeCurrentPage * itemsPerPage;

  const firstIndex =
    lastIndex - itemsPerPage;

  const currentTransactions =
    sortedTransactions.slice(
      firstIndex,
      lastIndex
    );

  return (
    <div className="transactions-page">
      <Sidebar handleLogout={handleLogout} />

      <Navbar />

      <main className="transactions-main">

        {/* PAGE HEADER */}

        <div className="transactions-header">
          <div>
            <h1>Transactions</h1>

            <p>
              Manage and track all your financial
              transactions
            </p>
          </div>
        </div>

        {/* MESSAGE */}

        {message && (
          <div className="success-message">
            {message}
          </div>
        )}

        {/* ADD TRANSACTION */}

        <div
          className="add-transaction-card"
          id="add-transaction"
        >
          <div className="card-title">
            <div>
              <h2>Add Transaction</h2>

              <span>
                Create a new transaction
              </span>
            </div>
          </div>

          <div className="add-form">

            {/* TITLE */}

            <div className="input-group">
              <label>Title</label>

              <input
                type="text"
                placeholder="e.g. Salary"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />
            </div>

            {/* CATEGORY */}

            <div className="input-group">
              <label>Category</label>

              <input
                type="text"
                placeholder="e.g. Sales"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              />
            </div>

            {/* AMOUNT */}

            <div className="input-group">
              <label>Amount</label>

              <input
                type="number"
                placeholder="₹ 0.00"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />
            </div>

            {/* TYPE */}

            <div className="input-group">
              <label>Type</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <option value="Income">
                  Income
                </option>

                <option value="Expense">
                  Expense
                </option>
              </select>
            </div>

            {/* BUTTONS */}

            <div className="transaction-form-buttons">

              <button
                type="button"
                className="add-button"
                onClick={addTransaction}
              >
                Add
              </button>

              <button
                type="button"
                className="export-button"
                onClick={exportCSV}
              >
                ↓ Export CSV
              </button>

            </div>

          </div>
        </div>

        {/* TRANSACTION LIST */}

        <div className="transaction-card">

          {/* CARD HEADER */}

          <div className="transaction-card-header">

            <div>
              <h2>All Transactions</h2>

              <span>
                {sortedTransactions.length} transactions
              </span>
            </div>

            <div className="transaction-actions">

              {/* SEARCH */}

              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search for anything..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>

              {/* FILTER */}

              <select
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="filter-select"
              >
                <option value="All">
                  All
                </option>

                <option value="Income">
                  Income
                </option>

                <option value="Expense">
                  Expense
                </option>
              </select>

              {/* SORT */}

              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setCurrentPage(1);
                }}
                className="filter-select"
              >
                <option value="none">
                  Sort
                </option>

                <option value="asc">
                  Low → High
                </option>

                <option value="desc">
                  High → Low
                </option>
              </select>

            </div>
          </div>

          {/* TABLE */}

          <div className="table-wrapper">

            <table>

              <thead>
                <tr>
                  <th>TRANSACTION</th>
                  <th>CATEGORY</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>TYPE</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {currentTransactions.length === 0 ? (

                  <tr>
                    <td
                      colSpan={6}
                      className="no-data"
                    >
                      No transactions found
                    </td>
                  </tr>

                ) : (

                  currentTransactions.map(
                    (transaction) => (

                      <tr
                        key={transaction._id}
                      >

                        {/* TRANSACTION */}

                        <td>
                          <div className="transaction-name">

                            <div className="transaction-icon">
                              {transaction.status ===
                              "Income"
                                ? "↗"
                                : "↘"}
                            </div>

                            <div>
                              <strong>
                                {transaction.title}
                              </strong>

                              <small>
                                Financial transaction
                              </small>
                            </div>

                          </div>
                        </td>

                        {/* CATEGORY */}

                        <td>
                          <span className="category-text">
                            {transaction.category}
                          </span>
                        </td>

                        {/* DATE */}

                        <td>
                          <span className="date-text">
                            {transaction.createdAt
                              ? new Date(
                                  transaction.createdAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )
                              : "-"}
                          </span>
                        </td>

                        {/* AMOUNT */}

                        <td>
                          <span
                            className={
                              transaction.status ===
                              "Income"
                                ? "amount income"
                                : "amount expense"
                            }
                          >
                            {transaction.status ===
                            "Income"
                              ? "+"
                              : "-"}
                            ₹
                            {Number(
                              transaction.amount
                            ).toLocaleString("en-IN")}
                          </span>
                        </td>

                        {/* TYPE */}

                        <td>
                          <span
                            className={
                              transaction.status ===
                              "Income"
                                ? "status-badge income-badge"
                                : "status-badge expense-badge"
                            }
                          >
                            {transaction.status}
                          </span>
                        </td>

                        {/* ACTION */}

                        <td>
                          <button
                            type="button"
                            className="delete-button"
                            onClick={() =>
                              deleteTransaction(
                                transaction._id
                              )
                            }
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    )
                  )
                )}

              </tbody>
            </table>

          </div>

          {/* PAGINATION */}

          <div className="pagination">

            <span>
              Showing{" "}
              {sortedTransactions.length === 0
                ? 0
                : firstIndex + 1}
              -
              {Math.min(
                lastIndex,
                sortedTransactions.length
              )}{" "}
              of {sortedTransactions.length}
            </span>

            <div className="pagination-buttons">

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    safeCurrentPage - 1
                  )
                }
                disabled={safeCurrentPage === 1}
              >
                ←
              </button>

              <span>
                Page {safeCurrentPage}{" "}
                {totalPages > 0 &&
                  `of ${totalPages}`}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage(
                    safeCurrentPage + 1
                  )
                }
                disabled={
                  totalPages === 0 ||
                  safeCurrentPage >= totalPages
                }
              >
                →
              </button>

            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

export default Transactions;