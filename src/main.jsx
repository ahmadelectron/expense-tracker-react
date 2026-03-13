import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {" "}
      <TransactionProvider>
        {" "}
        <App />
      </TransactionProvider>
    </AuthProvider>
  </StrictMode>,
);
