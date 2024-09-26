import React from "react";
import { useFormik } from "formik";
import { AddExpenseApi } from "../Services/expenseApi";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const ExpenseForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    description: "",
    amount: "",
    category: "groceries",
    isRecurring: false,
  };

  const onSubmit = async (values) => {
    const { data } = await AddExpenseApi(values);
    console.log(data);
    navigate("/dashboard");
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full"
      >
        <h2 className="text-xl font-bold mb-4">Add New Expense</h2>

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
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            required
          />
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
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
            required
          />
        </div>

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
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="groceries">Groceries</option>
            <option value="entertainment">Entertainment</option>
            <option value="rent">Rent</option>
            <option value="income">Utilities</option>
            <option value="others">Others</option>
          </select>
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
            value={formik.values.isRecurring}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
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
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
