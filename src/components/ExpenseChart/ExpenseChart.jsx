import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useFinanceStats } from "../../hooks/useFinanceStats"; 
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
  const { categoryData } = useFinanceStats();

  if (categoryData.length === 0) {
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
              data={categoryData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              minAngle={15}
              dataKey="value"
              label={({ name }) => name}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${Number(value).toLocaleString()} تومان`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseChart;
