import { useState } from "react";
import { Link } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";
import { TRANSACTION_TYPES } from "../../utils/constants";
import Button from "../Button/Button";
import "./TransactionList.scss";

const TransactionList = () => {
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

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">همه دسته‌ها</option>
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
              key={t.id}
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
