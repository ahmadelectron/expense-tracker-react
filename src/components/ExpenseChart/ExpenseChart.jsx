import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useTransactions } from "../../context/TransactionContext";
import "./ExpenseChart.scss";
import { TRANSACTION_TYPES } from "../../utils/constants";

// همان رنگ‌های قبلی شما
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

  // جدا کردن هزینه‌ها
  const expensesOnly = transactions.filter(
    (t) => t.type === TRANSACTION_TYPES.EXPENSE,
  );

  // گروه‌بندی بر اساس دسته (حالا شامل دسته‌های جدید هم می‌شود)
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
              // نمایش نام دسته به صورت فارسی و خوانا
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
              // راست‌چین کردن متن تول‌تیپ
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

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { useTransactions } from "../../context/TransactionContext";
// import "./ExpenseChart.scss";
// import { TRANSACTION_TYPES } from "../../utils/constants";

// // پالت رنگی مدرن و هماهنگ با تم تیره
// const COLORS = [
//   "#FFBB28",
//   "#FF8042",
//   "#00C49F",
//   "#0088FE",
//   "#FF4560",
//   "#775DD0",
// ];

// const CustomTooltip = ({ active, payload }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="custom-tooltip">
//         <p className="label">{`${payload[0].name}`}</p>
//         <p className="value">{`${Number(payload[0].value).toLocaleString()} تومان`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// const ExpenseChart = () => {
//   const { transactions } = useTransactions();

//   const chartData = transactions
//     .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
//     .reduce((acc, curr) => {
//       const existing = acc.find((item) => item.name === curr.category);
//       if (existing) {
//         existing.value += Number(curr.amount);
//       } else {
//         acc.push({ name: curr.category, value: Number(curr.amount) });
//       }
//       return acc;
//     }, []);

//   if (chartData.length === 0) {
//     return (
//       <div className="chart-wrapper empty-state">
//         <p>هنوز هزینه‌ای ثبت نشده است.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chart-wrapper">
//       <h4 className="chart-title">تحلیل هزینه‌ها</h4>
//       <div className="chart-container">
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={chartData}
//               innerRadius={70} // کمی نازک‌تر برای ظاهر مدرن
//               outerRadius={90}
//               paddingAngle={8} // فاصله بیشتر بین قطعات
//               dataKey="value"
//               stroke="none" // حذف خط دور قطعات
//               animationBegin={0}
//               animationDuration={1500}
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip content={<CustomTooltip />} />
//             <Legend
//               verticalAlign="bottom"
//               height={36}
//               iconType="circle"
//               iconSize={10}
//             />
//           </PieChart>
//         </ResponsiveContainer>
//         {/* نمایش مجموع هزینه در مرکز دایره (اختیاری) */}
//         <div className="chart-center-label">
//           <span>کل مخارج</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExpenseChart;

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { useTransactions } from "../../context/TransactionContext";
// import "./ExpenseChart.scss";
// import { TRANSACTION_TYPES } from "../../utils/constants";

// // رنگ‌های جذاب برای دسته‌بندی‌ها
// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#8884d8",
//   "#82ca9d",
// ];

// const ExpenseChart = () => {
//   const { transactions } = useTransactions();

//   // ۱. جدا کردن فقط هزینه‌ها (چون نمودار دایره‌ای معمولاً برای سهم هزینه‌هاست)
//   const expensesOnly = transactions.filter(
//     (t) => t.type === TRANSACTION_TYPES.EXPENSE,
//   );

//   // ۲. تبدیل تراکنش‌ها به فرمت مورد نیاز نمودار (گروه‌بندی بر اساس دسته)
//   const chartData = expensesOnly.reduce((acc, curr) => {
//     // پیدا کردن دسته‌بندی تکراری
//     const existing = acc.find((item) => item.name === curr.category);

//     if (existing) {
//       existing.value += Number(curr.amount);
//     } else {
//       // اگر دسته جدید بود، اضافه‌اش کن
//       acc.push({ name: curr.category, value: Number(curr.amount) });
//     }
//     return acc;
//   }, []);

//   // اگر هنوز تراکنش "هزینه" ثبت نشده باشه
//   if (chartData.length === 0) {
//     return (
//       <div className="chart-wrapper">
//         <p>هنوز هزینه‌ای ثبت نشده است تا در نمودار نمایش داده شود.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="chart-wrapper">
//       <h4>تحلیل هزینه‌ها</h4>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={chartData}
//               innerRadius={60}
//               outerRadius={80}
//               paddingAngle={5}
//               minAngle={15} // این خط باعث می‌شه دسته‌های کوچک (مثل Other) هم دیده بشن
//               dataKey="value"
//               label={({ name }) => name} // نمایش نام دسته کنار هر بخش
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip
//               formatter={(value) => `${Number(value).toLocaleString()} تومان`}
//               itemStyle={{ direction: "rtl" }}
//             />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ExpenseChart;

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import { useTransactions } from "../../context/TransactionContext";
// import "./ExpenseChart.scss";

// // رنگ‌های مختلف برای دسته‌بندی‌ها
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

// const ExpenseChart = () => {
//   const { transactions } = useTransactions();

//   // ۱. فیلتر کردن فقط هزینه‌ها (بدون درآمدها)
//   const expensesOnly = transactions.filter((t) => t.type === "expense");

//   // ۲. دسته‌بندی و جمع مبالغ هر دسته
//   const chartData = expensesOnly.reduce((acc, curr) => {
//     const existing = acc.find((item) => item.name === curr.category);
//     if (existing) {
//       existing.value += Number(curr.amount);
//     } else {
//       acc.push({ name: curr.category, value: Number(curr.amount) });
//     }
//     return acc;
//   }, []);

//   if (chartData.length === 0)
//     return <p>داده‌ای برای نمایش نمودار وجود ندارد.</p>;

//   return (
//     <div className="chart-wrapper">
//       <h4>تحلیل هزینه‌ها بر اساس دسته</h4>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <PieChart>
//             <Pie
//               data={chartData}
//               innerRadius={60} // ایجاد سوراخ وسط (نمودار دوناتی)
//               outerRadius={80}
//               paddingAngle={5}
//               dataKey="value"
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip formatter={(value) => `${value.toLocaleString()} تومان`} />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default ExpenseChart;
