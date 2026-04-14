import { useSelector } from "react-redux"; 
import { TRANSACTION_TYPES } from "../../utils/constants";
import "./Balance.scss";

const Balance = () => {
  const transactions = useSelector((state) => state.transactions.list);

  const totalIncome = transactions
    .filter((t) => t.type === TRANSACTION_TYPES.INCOME)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

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
