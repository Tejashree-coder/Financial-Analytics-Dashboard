import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    revenue: 12000,
    expenses: 7000,
  },
  {
    month: "Feb",
    revenue: 15000,
    expenses: 9000,
  },
  {
    month: "Mar",
    revenue: 18000,
    expenses: 10000,
  },
  {
    month: "Apr",
    revenue: 14000,
    expenses: 8000,
  },
  {
    month: "May",
    revenue: 22000,
    expenses: 12000,
  },
  {
    month: "Jun",
    revenue: 25000,
    expenses: 15000,
  },
];

function RevenueChart() {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        marginTop: "30px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>
        Revenue vs Expenses
      </h2>

      <div style={{ width: "100%", height: "350px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#2563eb"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#ef4444"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RevenueChart;