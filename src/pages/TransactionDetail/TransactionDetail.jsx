import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";
import "./TransactionDetail.scss";
import Button from "../../components/Button/Button";

const TransactionDetail = () => {
  const { id } = useParams();
  const { transactions } = useTransactions();
  const navigate = useNavigate();

  const transaction = transactions.find((t) => String(t.id) === String(id));

  if (!transaction) return <p className="error">تراکنش یافت نشد!</p>;

  return (
    <div className="detail-page">
      <div className="detail-card">
        <Button
          variant="glass"
          onClick={() => navigate(-1)}
          className="back-btn"
        >
          ← بازگشت
        </Button>
        {/* <button className="back-btn" onClick={() => navigate(-1)}>
          ← بازگشت
        </button> */}

        <h2>جزئیات تراکنش</h2>

        <div className="info-grid">
          <div className="info-item">
            <label>عنوان:</label>
            <span>{transaction.title}</span>
          </div>

          <div className="info-item amount-item">
            <label>مبلغ:</label>
            <span>{Number(transaction.amount).toLocaleString()} تومان</span>
          </div>

          <div className="info-item">
            <label>دسته‌بندی:</label>
            <span>{transaction.category}</span>
          </div>

          <div className="info-item">
            <label>تاریخ:</label>
            <span>{transaction.date}</span>
          </div>

          <div className="info-item">
            <label>نوع:</label>
            <span
              style={{
                color: transaction.type === "income" ? "#10b981" : "#ef4444",
              }}
            >
              {transaction.type === "income" ? "درآمد" : "هزینه"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;

// import { useParams, useNavigate } from "react-router-dom";
// import { useTransactions } from "../../context/TransactionContext";
// import "./TransactionDetail.scss"; // دقت کن که آدرس درست باشد

// const TransactionDetail = () => {
//   const { id } = useParams();
//   const { transactions } = useTransactions();
//   const navigate = useNavigate();

//   //   // پیدا کردن تراکنش با تبدیل ID به عدد
//   //   const transaction = transactions.find((t) => t.id === Number(id));

//   // استفاده از Number(id) یا مقایسه با == (به جای ===) برای رفع مشکل تفاوت نوع داده
//   const transaction = transactions.find((t) => String(t.id) === String(id));

//   if (!transaction) {
//     return (
//       <div className="detail-page">
//         <p>تراکنش مورد نظر پیدا نشد!</p>
//         <button onClick={() => navigate("/")}>بازگشت به داشبورد</button>
//       </div>
//     );
//   }

//   return (
//     <div className="detail-page">
//       <button onClick={() => navigate(-1)}>← بازگشت</button>
//       <h2>جزئیات تراکنش</h2>
//       <div className="card">
//         <p>
//           <strong>عنوان:</strong> {transaction.title}
//         </p>
//         <p>
//           <strong>مبلغ:</strong> {Number(transaction.amount).toLocaleString()}{" "}
//           تومان
//         </p>
//         <p>
//           <strong>دسته:</strong> {transaction.category}
//         </p>
//         <p>
//           <strong>تاریخ:</strong> {transaction.date}
//         </p>
//         <p>
//           <strong>نوع:</strong>{" "}
//           {transaction.type === "income" ? "درآمد" : "هزینه"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetail;

// import { useParams, useNavigate } from "react-router-dom";
// import { useTransactions } from "../../context/TransactionContext";

// const TransactionDetail = () => {
//   const { id } = useParams(); // گرفتن آی‌دی از URL
//   const { transactions } = useTransactions();
//   const navigate = useNavigate();

//   // پیدا کردن تراکنش خاص بر اساس ID
//   const transaction = transactions.find((t) => t.id === Number(id));

//   if (!transaction) return <p>تراکنش پیدا نشد!</p>;

//   return (
//     <div className="detail-page">
//       <button onClick={() => navigate(-1)}>بازگشت</button>
//       <h2>جزئیات تراکنش</h2>
//       <div className="card">
//         <p>
//           <strong>عنوان:</strong> {transaction.title}
//         </p>
//         <p>
//           <strong>مبلغ:</strong> {transaction.amount.toLocaleString()} تومان
//         </p>
//         <p>
//           <strong>دسته‌بندی:</strong> {transaction.category}
//         </p>
//         <p>
//           <strong>تاریخ:</strong> {transaction.date}
//         </p>
//         <p>
//           <strong>نوع:</strong>{" "}
//           {transaction.type === "income" ? "درآمد" : "هزینه"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default TransactionDetail;
