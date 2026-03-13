import { useTransactions } from "../context/TransactionContext";
import { TRANSACTION_TYPES } from "../utils/constants";

export const useFinanceStats = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter((t) => t.type === TRANSACTION_TYPES.INCOME)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const categoryData = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) existing.value += Number(curr.amount);
      else acc.push({ name: curr.category, value: Number(curr.amount) });
      return acc;
    }, []);

  return { totalIncome, totalExpense, balance, categoryData, transactions };
};
