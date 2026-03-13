import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTransactions } from "../../context/TransactionContext";
import "./TransactionForm.scss";
import { TRANSACTION_TYPES } from "../../utils/constants";
import Button from "../Button/Button";

// تعریف قوانین اعتبارسنجی با اضافه شدن فیلد تاریخ
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

  // مقدار پیش‌فرض تاریخ امروز به فرمت YYYY-MM-DD
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
      // ذخیره تاریخ انتخاب شده توسط کاربر
      date: data.date,
    };
    addTransaction(newTransaction);
    reset({ ...data, title: "", amount: "" }); // ریست کردن فرم با حفظ تاریخ و نوع
  };

  const handleAddNewCategory = (e) => {
    e.preventDefault(); // جلوگیری از ارسال فرم هنگام افزودن دسته
    if (newCatName.trim()) {
      addCategory(newCatName.trim());
      setNewCatName("");
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-header">
        {/* <h3 className="form-title">ثبت تراکنش جدید</h3> */}
        <Button type="submit" variant="primary">
          ثبت تراکنش جدید
        </Button>
      </div>

      <div className="form-body">
        {/* ردیف اول: عنوان و مبلغ */}
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

        {/* ردیف دوم: نوع و تاریخ */}
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

        {/* ردیف سوم: دسته‌بندی و افزودن دسته جدید */}
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

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useTransactions } from "../../context/TransactionContext";
// import "./TransactionForm.scss";
// import { TRANSACTION_TYPES } from "../../utils/constants";
// import Button from "../Button/Button";

// const schema = yup
//   .object({
//     title: yup.string().required("عنوان الزامی است").min(3, "حداقل ۳ کاراکتر"),
//     amount: yup
//       .number()
//       .typeError("مبلغ باید عدد باشد")
//       .required("مبلغ الزامی است")
//       .positive("مبلغ باید مثبت باشد"),
//     category: yup.string().required("یک دسته انتخاب کنید"),
//     type: yup.string().oneOf(["income", "expense"]).required(),
//   })
//   .required();

// const TransactionForm = () => {
//   const { addTransaction, categories, addCategory } = useTransactions();
//   const [newCatName, setNewCatName] = useState("");

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: { type: "expense", category: "food" },
//   });

//   const onSubmit = (data) => {
//     const newTransaction = {
//       ...data,
//       id: Date.now(),
//       date: new Date().toLocaleDateString("fa-IR"),
//     };
//     addTransaction(newTransaction);
//     reset();
//   };

//   const handleAddNewCategory = () => {
//     if (newCatName.trim()) {
//       addCategory(newCatName.trim());
//       setNewCatName("");
//     }
//   };

//   return (
//     <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
//       <div className="form-header">
//         <h3 className="form-title">ثبت تراکنش جدید</h3>
//         <Button type="submit" variant="primary">
//           ثبت تراکنش
//         </Button>
//         {/* <button type="submit" className="submit-btn-top">
//           ثبت تراکنش
//         </button> */}
//       </div>

//       <div className="form-body">
//         <div className="form-group">
//           <label>عنوان:</label>
//           <input {...register("title")} placeholder="مثلاً: خرید نان" />
//           {errors.title && (
//             <span className="error-msg">{errors.title.message}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>مبلغ (تومان):</label>
//           <input type="number" {...register("amount")} placeholder="0" />
//           {errors.amount && (
//             <span className="error-msg">{errors.amount.message}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>نوع:</label>
//           <select {...register("type")}>
//             <option value={TRANSACTION_TYPES.EXPENSE}>هزینه</option>
//             <option value={TRANSACTION_TYPES.INCOME}>درآمد</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>دسته‌بندی:</label>
//           <div className="category-adder">
//             <select {...register("category")}>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//             {/* بخش افزودن دسته جدید */}
//             <div className="add-cat-input-box">
//               <input
//                 type="text"
//                 value={newCatName}
//                 onChange={(e) => setNewCatName(e.target.value)}
//                 placeholder="+ دسته جدید"
//               />
//               <Button
//                 onClick={handleAddNewCategory}
//                 variant="primary"
//                 className="small-btn"
//               >
//                 اضافه
//               </Button>
//               {/* <button type="button" onClick={handleAddNewCategory}>
//                 اضافه
//               </button> */}
//             </div>
//           </div>
//           {errors.category && (
//             <span className="error-msg">{errors.category.message}</span>
//           )}
//         </div>
//       </div>
//     </form>
//   );
// };

// export default TransactionForm;

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useTransactions } from "../../context/TransactionContext";
// import "./TransactionForm.scss";
// import { CATEGORIES, TRANSACTION_TYPES } from "../../utils/constants";

// const schema = yup
//   .object({
//     title: yup.string().required("عنوان الزامی است").min(3, "حداقل ۳ کاراکتر"),
//     amount: yup
//       .number()
//       .typeError("مبلغ باید عدد باشد")
//       .required("مبلغ الزامی است")
//       .positive("مبلغ باید مثبت باشد"),
//     category: yup.string().required("یک دسته انتخاب کنید"),
//     type: yup.string().oneOf(["income", "expense"]).required(),
//   })
//   .required();

// const TransactionForm = () => {
//   const { addTransaction } = useTransactions();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: { type: "expense", category: "food" },
//   });

//   const onSubmit = (data) => {
//     const newTransaction = {
//       ...data,
//       id: Date.now(),
//       date: new Date().toLocaleDateString("fa-IR"),
//     };
//     addTransaction(newTransaction);
//     reset();
//   };

//   return (
//     <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
//       {/* هدر فرم: دکمه و عنوان در یک خط */}
//       <div className="form-header">
//         <h3 className="form-title">ثبت تراکنش جدید</h3>
//         <button type="submit" className="submit-btn-top">
//           ثبت تراکنش
//         </button>
//       </div>

//       <div className="form-body">
//         <div className="form-group">
//           <label>عنوان:</label>
//           <input {...register("title")} placeholder="مثلاً: خرید نان" />
//           {errors.title && (
//             <span className="error-msg">{errors.title.message}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>مبلغ (تومان):</label>
//           <input type="number" {...register("amount")} placeholder="0" />
//           {errors.amount && (
//             <span className="error-msg">{errors.amount.message}</span>
//           )}
//         </div>

//         <div className="form-group">
//           <label>نوع:</label>
//           <select {...register("type")}>
//             <option value={TRANSACTION_TYPES.EXPENSE}>هزینه</option>
//             <option value={TRANSACTION_TYPES.INCOME}>درآمد</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>دسته‌بندی:</label>
//           <select {...register("category")}>
//             {CATEGORIES.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default TransactionForm;

// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useTransactions } from "../../context/TransactionContext";
// import "./TransactionForm.scss";
// import { CATEGORIES, TRANSACTION_TYPES } from "../../utils/constants";

// // ۱. تعریف طرحواره (Schema) برای اعتبارسنجی با YUP
// const schema = yup
//   .object({
//     title: yup.string().required("عنوان الزامی است").min(3, "حداقل ۳ کاراکتر"),
//     amount: yup
//       .number()
//       .typeError("مبلغ باید عدد باشد")
//       .required("مبلغ الزامی است")
//       .positive("مبلغ باید مثبت باشد"),
//     category: yup.string().required("یک دسته انتخاب کنید"),
//     type: yup.string().oneOf(["income", "expense"]).required(),
//   })
//   .required();

// const TransactionForm = () => {
//   const { addTransaction } = useTransactions(); // استفاده از کانتکست

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: { type: "expense", category: "food" },
//   });

//   const onSubmit = (data) => {
//     // اضافه کردن ID و تاریخ به داده‌های فرم
//     const newTransaction = {
//       ...data,
//       id: Date.now(),
//       date: new Date().toLocaleDateString("fa-IR"),
//     };

//     addTransaction(newTransaction);
//     reset(); // پاک کردن فرم بعد از ثبت
//     alert("تراکنش با موفقیت ثبت شد!");
//   };

//   return (
//     <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
//       <div className="form-group">
//         <label>عنوان:</label>
//         <input {...register("title")} placeholder="مثلاً: خرید نان" />
//         <p className="error-msg">{errors.title?.message}</p>
//       </div>

//       <div className="form-group">
//         <label>مبلغ (تومان):</label>
//         <input type="number" {...register("amount")} />
//         <p className="error-msg">{errors.amount?.message}</p>
//       </div>

//       <div className="form-group">
//         <label>نوع:</label>
//         <select {...register("type")}>
//           <option value={TRANSACTION_TYPES.EXPENSE}>هزینه</option>
//           <option value={TRANSACTION_TYPES.INCOME}>درآمد</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <label>دسته‌بندی:</label>
//         <select {...register("category")}>
//           {CATEGORIES.map((cat) => (
//             <option key={cat} value={cat}>
//               {cat}
//             </option>
//           ))}
//         </select>
//       </div>

//       <button type="submit">ثبت تراکنش</button>
//     </form>
//   );
// };

// export default TransactionForm;
