// src/components/Balance/Balance.jsx
import { useFinanceStats } from "../../hooks/useFinanceStats";
import "./Balance.scss";

const Balance = () => {
  const { balance, totalIncome, totalExpense } = useFinanceStats();

  return (
    <div className="balance-container">
      <div className="balance-card total">
        <h3>موجودی کل</h3>
        <p>{balance.toLocaleString()} تومان</p>
      </div>
      <div className="balance-card income">
        <h4>درآمد</h4>
        <p>+ {totalIncome.toLocaleString()}</p>
      </div>
      <div className="balance-card expense">
        <h4>هزینه</h4>
        <p>- {totalExpense.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Balance;

// import { useTransactions } from "../../context/TransactionContext";
// import "./Balance.scss";

// const Balance = () => {
//   const { transactions } = useTransactions();

//   // محاسبه مجموع درآمدها
//   const totalIncome = transactions
//     .filter((t) => t.type === "income")
//     .reduce((acc, t) => acc + Number(t.amount), 0);

//   // محاسبه مجموع هزینه‌ها
//   const totalExpense = transactions
//     .filter((t) => t.type === "expense")
//     .reduce((acc, t) => acc + Number(t.amount), 0);

//   // موجودی نهایی
//   const totalBalance = totalIncome - totalExpense;

//   return (
//     <div className="balance-container">
//       <div className="balance-card total">
//         <h3>موجودی کل</h3>
//         <p className={totalBalance >= 0 ? "plus" : "minus"}>
//           {totalBalance.toLocaleString()} تومان
//         </p>
//       </div>

//       <div className="stats-row">
//         <div className="balance-card income">
//           <h4>درآمد</h4>
//           <p>+ {totalIncome.toLocaleString()}</p>
//         </div>
//         <div className="balance-card expense">
//           <h4>هزینه</h4>
//           <p>- {totalExpense.toLocaleString()}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Balance;
