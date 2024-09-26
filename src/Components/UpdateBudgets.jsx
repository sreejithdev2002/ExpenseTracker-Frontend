import React, { useEffect, useState } from "react";
import { GetBudgetByIdApi, UpdateBudgetApi } from "../Services/budgetApi";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const UpdateBudgets = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [budgets, setBudgets] = useState({
    category: "groceries",
    amount: "",
    month: "",
    year: "",
    warning: 90,
  });

  useEffect(() => {
    GetBudgetByIdApi(id)
      .then((response) => {
        setBudgets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching budgets : ", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBudgets((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ...updatedBudgetsData } = budgets;
    console.log(updatedBudgetsData)
    UpdateBudgetApi(id, updatedBudgetsData)
      .then((response) => {
        navigate("/budget");
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
        <h2 className="text-xl font-bold mb-4">Edit Budget</h2>

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
            value={budgets.category}
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
            value={budgets.amount}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="month"
          >
            Month
          </label>
          <input
            type="number"
            id="month"
            name="month"
            onChange={handleChange}
            value={budgets.month}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter month (1-12)"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="year"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            onChange={handleChange}
            value={budgets.year}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter year"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="warning"
          >
            Warning Percentage
          </label>
          <input
            type="number"
            id="warning"
            name="warning"
            onChange={handleChange}
            value={budgets.warning}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Warning (Default 90%)"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Budget
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBudgets;
