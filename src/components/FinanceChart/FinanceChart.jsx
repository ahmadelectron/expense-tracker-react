import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import "./FinanceChart.scss";

const FinanceChart = () => {
  const { transactions } = useTransactions();

  // ۱. گروه‌بندی داده‌ها بر اساس تاریخ
  const groupedData = transactions.reduce((acc, curr) => {
    const date = curr.date;
    const existing = acc.find((item) => item.date === date);

    const amount = Number(curr.amount);

    if (existing) {
      if (curr.type === "income") existing.income += amount;
      else existing.expense += amount;
    } else {
      acc.push({
        date,
        income: curr.type === "income" ? amount : 0,
        expense: curr.type === "expense" ? amount : 0,
      });
    }
    return acc;
  }, []);

  // مرتب‌سازی بر اساس تاریخ (اختیاری)
  const sortedData = groupedData.sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  if (transactions.length === 0) return null;

  return (
    <div className="line-chart-wrapper">
      <h4>روند درآمد و هزینه</h4>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={sortedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `${value.toLocaleString()} تومان`} />
            <Legend />
            {/* خط مربوط به درآمد - سبز */}
            <Line
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              name="درآمد"
              strokeWidth={3}
            />
            {/* خط مربوط به هزینه - قرمز */}
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              name="هزینه"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceChart;
