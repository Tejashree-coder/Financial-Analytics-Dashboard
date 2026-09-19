import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable() {
  const [transactions, setTransactions] =
    useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await api.get(
        "/transactions"
      );

      setTransactions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {transactions.map((t: any) => (
          <tr key={t._id}>
            <td>{t.category}</td>
            <td>{t.amount}</td>
            <td>{t.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;