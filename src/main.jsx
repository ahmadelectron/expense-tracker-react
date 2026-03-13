// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import "./index.css";
import App from "./App.jsx";

// چون createRoot را ایمپورت کردیم، مستقیم از آن استفاده می‌کنیم
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      {/* اول احراز هویت */}
      <TransactionProvider>
        {" "}
        {/* بعد تراکنش‌ها */}
        <App />
      </TransactionProvider>
    </AuthProvider>
  </StrictMode>,
);
