import { useParams, useNavigate } from "react-router-dom";
import { useTransactions } from "../../context/TransactionContext";
import Button from "../../components/Button/Button";
import "./TransactionDetail.scss";

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
