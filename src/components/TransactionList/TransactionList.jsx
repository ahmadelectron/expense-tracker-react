import { useState } from "react";
import { Link } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";
import "./TransactionList.scss";
import { TRANSACTION_TYPES } from "../../utils/constants"; // CATEGORIES دیگر لازم نیست
import Button from "../Button/Button";

const TransactionList = () => {
  // اضافه کردن categories به لیست مقادیر دریافتی از Context
  const { transactions, deleteTransaction, categories } = useTransactions();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="transaction-list">
      <div className="filter-bar">
        <input
          type="text"
          placeholder="جستجو در عنوان..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* اصلاح این بخش برای نمایش دسته‌های داینامیک */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">همه دسته‌ها</option>
          {/* حالا از لیست categories که در Context است استفاده می‌کنیم */}
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <li
              key={t.id} // حتما key اضافه کن برای پرفورمنس بهتر React
              className={
                t.type === TRANSACTION_TYPES.INCOME
                  ? "income-item"
                  : "expense-item"
              }
            >
              <div className="info">
                <Link to={`/transaction/${t.id}`} className="transaction-link">
                  <strong>{t.title}</strong>
                </Link>
                <span>
                  {t.category} - {t.date}
                </span>
              </div>

              <div className="amount-section">
                <span className="amount">
                  {t.type === "income" ? "+" : "-"}{" "}
                  {Number(t.amount).toLocaleString()} تومان
                </span>
                <Button
                  onClick={() => deleteTransaction(t.id)}
                  variant="danger"
                >
                  حذف
                </Button>
              </div>
            </li>
          ))
        ) : (
          <p className="no-data">هیچ تراکنشی با این مشخصات پیدا نشد!</p>
        )}
      </ul>
    </div>
  );
};

export default TransactionList;

// import { useState } from "react";
// import { Link } from "react-router-dom"; // برای جابجایی بین صفحات
// import { useTransactions } from "../../context/TransactionContext";
// import "./TransactionList.scss";
// import { TRANSACTION_TYPES, CATEGORIES } from "../../utils/constants";
// import Button from "../Button/Button";

// const TransactionList = () => {
//   const { transactions, deleteTransaction } = useTransactions();

//   // استیت‌های مربوط به فیلتر و جستجو
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterCategory, setFilterCategory] = useState("all");

//   // منطق فیلتر کردن لیست (بر اساس نام و دسته‌بندی)
//   const filteredTransactions = transactions.filter((t) => {
//     const matchesSearch = t.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesCategory =
//       filterCategory === "all" || t.category === filterCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="transaction-list">
//       {/* <h3>لیست تراکنش‌ها</h3> */}

//       {/* بخش فیلتر و جستجو */}
//       <div className="filter-bar">
//         <input
//           type="text"
//           placeholder="جستجو در عنوان..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />

//         <select onChange={(e) => setFilterCategory(e.target.value)}>
//           <option value="all">همه دسته‌ها</option>
//           {CATEGORIES.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* نمایش لیست نهایی */}
//       <ul>
//         {filteredTransactions.length > 0 ? (
//           filteredTransactions.map((t) => (
//             <li
//               className={
//                 t.type === TRANSACTION_TYPES.INCOME
//                   ? "income-item"
//                   : "expense-item"
//               }
//             >
//               <div className="info">
//                 {/* لینک به صفحه جزئیات با استفاده از آیدی تراکنش */}
//                 <Link to={`/transaction/${t.id}`} className="transaction-link">
//                   <strong>{t.title}</strong>
//                 </Link>
//                 <span>
//                   {t.category} - {t.date}
//                 </span>
//               </div>

//               <div className="amount-section">
//                 <span className="amount">
//                   {t.type === "income" ? "+" : "-"}{" "}
//                   {Number(t.amount).toLocaleString()} تومان
//                 </span>
//                 <Button
//                   onClick={() => deleteTransaction(t.id)}
//                   variant="danger"
//                 >
//                   حذف
//                 </Button>
//                 {/* <button
//                   className="delete-btn"
//                   onClick={() => deleteTransaction(t.id)}
//                 >
//                   حذف
//                 </button> */}
//               </div>
//             </li>
//           ))
//         ) : (
//           <p className="no-data">هیچ تراکنشی با این مشخصات پیدا نشد!</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default TransactionList;
