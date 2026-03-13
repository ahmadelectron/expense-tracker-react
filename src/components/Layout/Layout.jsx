import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";
import "./Layout.scss";

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  return (
    <div className="layout-container">
      <header className="main-header">
        <div className="header-content">
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
