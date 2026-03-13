// src/pages/Dashboard/Dashboard.jsx
import Balance from "../../components/Balance/Balance";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import FinanceChart from "../../components/FinanceChart/FinanceChart";
import "./Dashboard.scss";

// src/pages/Dashboard/Dashboard.jsx
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      {/* هدر یک‌خطی در بالا */}
      <Balance />

      <div className="main-grid">
        {/* ستون سمت چپ: نمودارها */}
        <div className="charts-column">
          <div className="glass-card">
            <ExpenseChart />
          </div>
          <div className="glass-card">
            <FinanceChart />
          </div>
        </div>

        {/* ستون سمت راست: ثبت و لیست */}
        <div className="actions-column">
          <div className="glass-card">
            <TransactionForm />
          </div>
          <div className="glass-card">
            <h3>لیست تراکنش‌ها</h3>
            <TransactionList />
          </div>
        </div>
      </div>
    </div>
  );
};

// // src/pages/Dashboard/Dashboard.jsx
// const Dashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>داشبورد مالی</h1>
//         <Balance /> {/* موجودی کل را در بالا نگه می‌داریم */}
//       </header>

//       <div className="dashboard-grid">
//         {/* ستون اول: بخش‌های تحلیلی */}
//         <div className="stats-column">
//           <div className="glass-card">
//             <ExpenseChart />
//           </div>
//           <div className="glass-card">
//             <FinanceChart />
//           </div>
//         </div>

//         {/* ستون دوم: عملیات و لیست */}
//         <div className="actions-column">
//           <div className="glass-card">
//             <h3>ثبت تراکنش جدید</h3>
//             <TransactionForm />
//           </div>
//           <div className="glass-card">
//             <h3>لیست تراکنش‌ها</h3>
//             <TransactionList />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Dashboard = () => {
//   return (
//     <div className="dashboard-page">
//       <h1>داشبورد مالی</h1>
//       {/* نمایش موجودی و آمار در بالاترین بخش */}
//       <Balance />
//       <section>
//         <h2>ثبت تراکنش جدید</h2>
//         <ExpenseChart /> {/* نمودار اینجا نمایش داده می‌شود */}
//         <FinanceChart /> {/* نمودار خطی جدید */}
//         <TransactionForm />
//       </section>

//       <section style={{ marginTop: "40px" }}>
//         <TransactionList />
//       </section>
//     </div>
//   );
// };

export default Dashboard;
