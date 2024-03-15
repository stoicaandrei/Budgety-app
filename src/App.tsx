import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

const defaultToken = localStorage.getItem("authToken");

const App = () => {
  const [token, setToken] = useState<string | null>(defaultToken);

  const updateToken = (token: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  return (
    <Routes>
      {token && (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
      {!token && (
        <>
          <Route path="/login" element={<Login onLogin={updateToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default App;
