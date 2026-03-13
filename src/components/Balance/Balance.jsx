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
