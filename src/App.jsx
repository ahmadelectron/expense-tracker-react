// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Register from "./pages/Register/Register"; // صفحه جدیدی که ساختی
// import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
// // کامپوننت‌های موقت برای تست (بعداً در فایل‌های جداگانه می‌سازیم)
// // const Dashboard = () => <h2>صفحه داشبورد (خلاصه وضعیت)</h2>;
// const Transactions = () => <h2>لیست تراکنش‌ها</h2>;

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ۱. مسیر ثبت‌نام (عمومی) */}
//         <Route path="/register" element={<Register />} />

//         {/* ۲. مسیرهای محافظت‌شده (فقط برای کاربران لاگین شده) */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <Layout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
//           {/* بعداً صفحه جزئیات را هم اینجا اضافه می‌کنیم */}
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import TransactionDetail from "./pages/TransactionDetail/TransactionDetail"; // حتماً این را بساز

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* مسیر عمومی */}
        <Route path="/register" element={<Register />} />

        {/* مسیرهای محافظت شده */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          {/* :id یک پارامتر متغیر است که useParams آن را می‌خواند */}
          <Route path="transaction/:id" element={<TransactionDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
