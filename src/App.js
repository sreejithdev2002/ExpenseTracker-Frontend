import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import ExpenseForm from "./Components/ExpenseForm";
import BudgetForm from "./Components/BudgetForm";
import ShowExpenses from "./Components/ShowExpenses";
import ShowBudgets from "./Components/ShowBudgets";
import UpdateBudgets from "./Components/UpdateBudgets";
import UpdateExpenses from "./Components/UpdateExpenses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-expense" element={<ExpenseForm />} />
        <Route path="/expense" element={<ShowExpenses />} />
        <Route path="/budget" element={<ShowBudgets />} />
        <Route path="/add-budget" element={<BudgetForm />} />
        <Route path="/edit-budget/:id" element={<UpdateBudgets />} />
        <Route path="/edit-expense/:id" element={<UpdateExpenses/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
