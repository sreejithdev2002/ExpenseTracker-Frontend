import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { GetExpenseByIdApi, UpdateExpenseApi } from "../Services/expenseApi";

const UpdateExpenses = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [expenses, setExpenses] = useState({
    category: "groceries",
    amount: "",
    description: "",
    isRecurring: false,
  });

  useEffect(() => {
    GetExpenseByIdApi(id)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error("Error fetching expenses : ", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setExpenses((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...updatedExpensesData } = expenses;
    console.log(updatedExpensesData);
    UpdateExpenseApi(id, updatedExpensesData)
      .then((response) => {
        navigate("/expense");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full"
      >
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={expenses.category}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="groceries">Groceries</option>
            <option value="entertainment">Entertainment</option>
            <option value="rent">Rent</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            onChange={handleChange}
            value={expenses.amount}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={expenses.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Recurring
          </label>
          <select
            id="isRecurring"
            name="isRecurring"
            value={expenses.isRecurring}
            onChange={handleChange}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateExpenses;
