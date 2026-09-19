import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Transaction {
  category: string;
  amount: number;
}

interface Props {
  transactions: Transaction[];
}

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

function CategoryBreakdown({
  transactions,
}: Props) {
  const categoryMap: Record<string, number> = {};

  transactions.forEach((transaction) => {
    if (!categoryMap[transaction.category]) {
      categoryMap[transaction.category] = 0;
    }

    categoryMap[transaction.category] +=
      transaction.amount;
  });

  const data = Object.keys(categoryMap).map(
    (category) => ({
      name: category,
      value: categoryMap[category],
    })
  );

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
        marginTop: "30px",
      }}
    >
      <h2>Category Breakdown</h2>

      <div
        style={{
          width: "100%",
          height: "350px",
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryBreakdown;