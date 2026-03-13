import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Layout.scss";
import Button from "../Button/Button";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // تابع خروج از حساب کاربری
  const handleLogout = () => {
    logout();
    navigate("/register"); // هدایت به صفحه ثبت‌نام بعد از خروج
  };

  return (
    <div className="layout-container">
      {/* هدر اصلی با استایل شیشه‌ای */}
      <header className="main-header">
        <div className="header-content">
          {/* بخش اطلاعات کاربر و دکمه خروج */}
          <div className="user-section">
            <span className="welcome-text">
              خوش آمدی،{" "}
              <strong className="user-name">{user?.name || "کاربر"}</strong>{" "}
              عزیز
            </span>
            <Button
              variant="danger"
              onClick={handleLogout}
              className="logout-btn"
            >
              خروج
            </Button>
            {/* <button className="logout-btn" onClick={handleLogout}>
              خروج
            </button> */}
          </div>

          {/* منوی ناوبری اصلی */}
          <nav className="nav-menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              داشبورد
            </NavLink>
            {/* اگر در آینده صفحه تراکنش‌ها یا گزارشات اضافه کردی، اینجا NavLink جدید بساز */}
          </nav>
        </div>
      </header>

      {/* محتوای صفحات (Dashboard و غیره) اینجا رندر می‌شوند */}
      <main className="main-content">
        <div className="page-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;

// // src/components/Layout/Layout.jsx
// import { Outlet, NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import "./Layout.scss";

// const Layout = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/register");
//   };

//   return (
//     <div className="layout-container">
//       <header className="main-header">
//         <div className="header-content">
//           <div className="user-section">
//             <span className="welcome-text">
//               خوش آمدی، <strong className="user-name">{user?.name}</strong> عزیز
//             </span>
//             <button className="logout-btn" onClick={handleLogout}>
//               خروج
//             </button>
//           </div>

//           <nav className="nav-menu">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//             >
//               داشبورد
//             </NavLink>
//             {/* اگر صفحات دیگری مثل 'گزارش‌ها' داشتی اینجا اضافه کن */}
//           </nav>
//         </div>
//       </header>

//       <main className="main-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

// import { Outlet, Link } from "react-router-dom";
// import "./Layout.scss"; // استایل دقیقاً همین‌جا ایمپورت می‌شود

// const Layout = () => {
//   return (
//     <div className="layout-container">
//       <header className="header">
//         <h1>مدیریت هزینه‌های من</h1>
//         <nav>
//           <Link to="/" style={{ color: "white", marginRight: "10px" }}>
//             داشبورد
//           </Link>
//           <Link to="/transactions" style={{ color: "white" }}>
//             تراکنش‌ها
//           </Link>
//         </nav>
//       </header>

//       <main className="main-content">
//         {/* اینجا جایی است که صفحات مختلف (Dashboard و غیره) رندر می‌شوند */}
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;

// import { Outlet, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import "./Layout.scss";

// const Layout = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/register");
//   };

//   return (
//     <div className="layout-container">
//       <header className="header">
//         <div className="user-info">
//           <span>خوش آمدی، **{user?.name}** عزیز!</span>
//           <button onClick={handleLogout}>خروج</button>
//         </div>
//         <nav>
//           <Link to="/">داشبورد</Link>
//         </nav>
//       </header>

//       <main className="main-content">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default Layout;
