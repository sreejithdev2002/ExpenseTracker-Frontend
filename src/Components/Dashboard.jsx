import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetExpenseApi } from "../Services/expenseApi";
import { GetBudgetApi } from "../Services/budgetApi";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesResponse = await GetExpenseApi();
        setExpenses(expensesResponse.data);

        const total = expensesResponse.data.reduce(
          (sum, expense) => sum + expense.amount,
          0
        );
        setTotalExpenses(total);

        const budgetResponse = await GetBudgetApi();
        const totalBudget = budgetResponse.data.reduce(
          (sum, budget) => sum + budget.amount,
          0
        );
        setBudget(totalBudget);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const goToAddExpense = () => navigate("/add-expense");
  const goToAddBudget = () => navigate("/add-budget");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard Overview
          </h1>
          <div>
            <button
              className="m-1 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={goToAddBudget}
            >
              Add Budget
            </button>
            <button
              className="m-1 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={goToAddExpense}
            >
              Add Expense
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Expenses
            </h3>
            <p className="mt-2 text-3xl font-bold text-red-500">
              {totalExpenses}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">Budget Left</h3>
            <p
              className={`mt-2 text-3xl font-bold ${
                budget - totalExpenses < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {budget - totalExpenses}
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Budget
            </h3>
            <p className="mt-2 text-3xl font-bold text-blue-500">{budget}</p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Expense History
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Description</th>
                  <th className="py-2 px-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr className="text-gray-700 text-center" key={expense._id}>
                    <td className="py-2 px-4 border-b">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">{expense.category}</td>
                    <td className="py-2 px-4 border-b">
                      {expense.description}
                    </td>
                    <td className="py-2 px-4 border-b text-red-600">
                      -{expense.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
