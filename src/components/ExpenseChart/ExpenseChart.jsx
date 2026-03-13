import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import { TRANSACTION_TYPES } from "../../utils/constants";
import "./ExpenseChart.scss";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

const ExpenseChart = () => {
  const { transactions } = useTransactions();

  const expensesOnly = transactions.filter(
    (t) => t.type === TRANSACTION_TYPES.EXPENSE,
  );

  const chartData = expensesOnly.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.category);

    if (existing) {
      existing.value += Number(curr.amount);
    } else {
      acc.push({ name: curr.category, value: Number(curr.amount) });
    }
    return acc;
  }, []);

  if (chartData.length === 0) {
    return (
      <div className="chart-wrapper">
        <p>هنوز هزینه‌ای ثبت نشده است تا در نمودار نمایش داده شود.</p>
      </div>
    );
  }

  return (
    <div className="chart-wrapper">
      <h4>تحلیل هزینه‌ها</h4>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              minAngle={15}
              dataKey="value"
              label={({ name }) => name}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${Number(value).toLocaleString()} تومان`}
              // contentStyle={{ direction: "rtl", textAlign: "right" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
