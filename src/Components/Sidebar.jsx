import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="lg:w-64 bg-blue-900 text-white flex-shrink-0">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-6">
        <Link
          to="/dashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
        >
          Overview
        </Link>
        <Link
          to="/expense"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
        >
          Expenses
        </Link>
        <Link
          to="/budget"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
        >
          Budgets
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
