import React, { useEffect, useState } from 'react'
import { DeleteBudgetApi, GetBudgetApi } from '../Services/budgetApi';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

const ShowBudgets = () => {
    const navigate = useNavigate();

    const [budgets, setBudgets] = useState([]);

    const fetchData = async() => {
        try {
            const budgetData = await GetBudgetApi();
            setBudgets(budgetData.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        fetchData()
    },[]);

    const handleDelete = async (budgetId) => {
      try {
        await DeleteBudgetApi(budgetId);
        setBudgets((prevBudget) =>
          prevBudget.filter((budgetDatas) => budgetDatas._id !== budgetId)
        );
      } catch (error) {
        console.error("Error deleting budgets : ", error);
      }
    };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <section className="mt-8 flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Budget History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-2 px-4">Month</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Year</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.map((budget) => (
                <tr className="text-gray-700 text-center" key={budget._id}>
                  <td className="py-2 px-4 border-b">
                  {new Date(2024, budget.month - 1).toLocaleString('default', { month: 'long' })}
                  </td>
                  <td className="py-2 px-4 border-b">{budget.category}</td>
                  <td className="py-2 px-4 border-b">{budget.year}</td>
                  <td className="py-2 px-4 border-b text-green-600">+{budget.amount}</td>
                  <td className='py-2 px-4 border-b'>
                    <button className='mx-1 px-2 py-1 bg-blue-500 text-white rounded-sm' onClick={()=> navigate(`/edit-budget/${budget._id}`)}>Edit</button>
                    <button className='mx-1 px-2 py-1 bg-red-500 text-white rounded-sm' onClick={()=>handleDelete(budget._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default ShowBudgets
