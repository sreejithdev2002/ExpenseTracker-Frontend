import React, { useEffect, useState } from "react";
import { DeleteExpense, GetExpenseApi } from "../Services/expenseApi";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const ShowExpenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);

  const fetchData = async () => {
    try {
      const expensesData = await GetExpenseApi();
      setExpenses(expensesData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (expenseId) => {
    try {
      await DeleteExpense(expenseId);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expensesDatas) => expensesDatas._id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expenses : ", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <section className="mt-8 flex-1 p-6">
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
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr className="text-gray-700 text-center" key={expense._id}>
                  <td className="py-2 px-4 border-b">
                    {new Date(expense.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="py-2 px-4 border-b">{expense.category}</td>
                  <td className="py-2 px-4 border-b">{expense.description}</td>
                  <td className="py-2 px-4 border-b text-red-600">
                    -{expense.amount}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="mx-1 px-2 py-1 bg-blue-500 text-white rounded-sm"
                      onClick={() => navigate(`/edit-expense/${expense._id}`)}
                    >
                      Edit
                    </button>
                    <button className="mx-1 px-2 py-1 bg-red-500 text-white rounded-sm" onClick={()=>handleDelete(expense._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ShowExpenses;
