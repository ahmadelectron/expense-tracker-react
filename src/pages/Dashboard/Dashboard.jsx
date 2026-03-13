import Balance from "../../components/Balance/Balance";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";
import ExpenseChart from "../../components/ExpenseChart/ExpenseChart";
import FinanceChart from "../../components/FinanceChart/FinanceChart";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Balance />

      <div className="main-grid">
        <div className="charts-column">
          <div className="glass-card">
            <ExpenseChart />
          </div>
          <div className="glass-card">
            <FinanceChart />
          </div>
        </div>

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

export default Dashboard;
