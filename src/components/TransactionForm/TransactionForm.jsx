import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTransactions } from "../../context/TransactionContext";
import { TRANSACTION_TYPES } from "../../utils/constants";
import Button from "../Button/Button";
import "./TransactionForm.scss";

const schema = yup
  .object({
    title: yup.string().required("عنوان الزامی است").min(3, "حداقل ۳ کاراکتر"),
    amount: yup
      .number()
      .typeError("مبلغ باید عدد باشد")
      .required("مبلغ الزامی است")
      .positive("مبلغ باید مثبت باشد"),
    category: yup.string().required("یک دسته انتخاب کنید"),
    type: yup.string().oneOf(["income", "expense"]).required(),
    date: yup.string().required("انتخاب تاریخ الزامی است"),
  })
  .required();

const TransactionForm = () => {
  const { addTransaction, categories, addCategory } = useTransactions();
  const [newCatName, setNewCatName] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: "expense",
      category: "food",
      date: today,
    },
  });

  const onSubmit = (data) => {
    const newTransaction = {
      ...data,
      id: Date.now(),
      date: data.date,
    };
    addTransaction(newTransaction);
    reset({ ...data, title: "", amount: "" });
  };

  const handleAddNewCategory = (e) => {
    e.preventDefault();
    if (newCatName.trim()) {
      addCategory(newCatName.trim());
      setNewCatName("");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        <Button type="submit" variant="primary">
          ثبت تراکنش جدید
        </Button>
      </div>

      <div className="form-body">
        <div className="form-group">
          <label>عنوان:</label>
          <input {...register("title")} placeholder="مثلاً: خرید نان" />
          {errors.title && (
            <span className="error-msg">{errors.title.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>مبلغ (تومان):</label>
          <input type="number" {...register("amount")} placeholder="0" />
          {errors.amount && (
            <span className="error-msg">{errors.amount.message}</span>
          )}
        </div>

        <div className="form-group">
          <label>نوع:</label>
          <select {...register("type")}>
            <option value={TRANSACTION_TYPES.EXPENSE}>هزینه</option>
            <option value={TRANSACTION_TYPES.INCOME}>درآمد</option>
          </select>
        </div>

        <div className="form-group">
          <label>تاریخ:</label>
          <input type="date" {...register("date")} />
          {errors.date && (
            <span className="error-msg">{errors.date.message}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label>دسته‌بندی:</label>
          <div className="category-adder">
            <select {...register("category")}>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="add-cat-input-box">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="+ دسته جدید"
              />
              <Button
                onClick={handleAddNewCategory}
                variant="primary"
                className="small-btn"
              >
                اضافه
              </Button>
            </div>
          </div>
          {errors.category && (
            <span className="error-msg">{errors.category.message}</span>
          )}
        </div>
      </div>
    </form>
  );
};

export default TransactionForm;
