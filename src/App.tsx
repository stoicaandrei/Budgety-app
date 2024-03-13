import Dashboard from "./pages/Dashboard";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";

import { Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
