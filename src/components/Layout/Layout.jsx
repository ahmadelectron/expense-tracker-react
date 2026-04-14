import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import Button from "../Button/Button";
import Sidebar from "../Sidebar/Sidebar"; 
import "./Layout.scss";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <div className="layout-container">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <header className="main-header">
        <div className="header-content">
          <div className="user-section">
            <span className="welcome-text">
              خوش آمدی،{" "}
              <strong className="user-name">{user?.name || "کاربر"}</strong>
            </span>

            {/* دکمه جدید در هدر */}
            <button
              className="header-settings-btn"
              onClick={() => setIsSidebarOpen(true)}
            >
              ⚙️ <span className="btn-text">مدیریت داده‌ها</span>
            </button>

            <Button
              variant="danger"
              onClick={handleLogout}
              className="logout-btn"
            >
              خروج
            </Button>
          </div>

          <nav className="nav-menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              داشبورد
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="page-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
