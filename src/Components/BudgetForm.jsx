import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AddBudgetApi } from "../Services/budgetApi";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const BudgetForm = () => {

  const navigate = useNavigate();

  const initialValues = {
    category: "groceries",
    amount: "",
    month: "",
    year: "",
    warning: 90,
  };

  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .required("Category is required")
      .oneOf(["groceries", "entertainment", "rent", "others"]),
    amount: Yup.number()
      .required("Amount is required")
      .min(0, "Amount must be positive"),
    month: Yup.number().required("Month is required").min(1).max(12),
    year: Yup.number()
      .required("Year is required")
      .min(1900, "Invalid year")
      .max(new Date().getFullYear(), "Future year not allowed"),
    warning: Yup.number()
      .min(0)
      .max(100, "Warning must be a percentage between 0 and 100"),
  });

  const onSubmit = async (values) => {
    const { data } = await AddBudgetApi(values);
    console.log(data);
    navigate("/dashboard")
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar/>
      <form
      onSubmit={formik.handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-full"
    >
      <h2 className="text-xl font-bold mb-4">Set Budget</h2>

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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.category}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="groceries">Groceries</option>
          <option value="entertainment">Entertainment</option>
          <option value="rent">Rent</option>
          <option value="others">Others</option>
        </select>
        {formik.touched.category && formik.errors.category ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.category}
          </div>
        ) : null}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.amount}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter amount"
          required
        />
        {formik.touched.amount && formik.errors.amount ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.amount}
          </div>
        ) : null}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.month}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter month (1-12)"
          required
        />
        {formik.touched.month && formik.errors.month ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.month}</div>
        ) : null}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter year"
          required
        />
        {formik.touched.year && formik.errors.year ? (
          <div className="text-red-500 text-xs mt-1">{formik.errors.year}</div>
        ) : null}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.warning}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Warning (Default 90%)"
        />
        {formik.touched.warning && formik.errors.warning ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.warning}
          </div>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Set Budget
        </button>
      </div>
    </form>
    </div>
  );
};

export default BudgetForm;
