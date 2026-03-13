import React, { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("currentUser")) || null,
  isAuthenticated: !!localStorage.getItem("currentUser"),
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_AND_LOGIN":
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT":
      localStorage.removeItem("currentUser");
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = (userData) => {
    dispatch({ type: "REGISTER_AND_LOGIN", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
