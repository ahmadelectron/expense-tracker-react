import React from "react";
import ExportData from "../ExportData/ExportData";
import "./Sidebar.scss";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`sidebar-overlay ${isOpen ? "active" : ""}`}
      onClick={() => setIsOpen(false)}
    >
      <div className="sidebar-content" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <h3>تنظیمات و خروجی</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>

        <div className="sidebar-body">
          <ExportData />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
