import axiosInstance from "../axios/axios";

export const AddExpenseApi = (value) => {
    return axiosInstance.post("/expense", {...value});
};

export const GetExpenseApi = () => {
    return axiosInstance.get("/expense");
};

export const GetExpenseByIdApi = (expenseId) => {
    return axiosInstance.get(`/expense/${expenseId}`);
};

export const UpdateExpenseApi = (expenseId, values) => {
    return axiosInstance.put(`/expense/${expenseId}`, {...values})
};

export const DeleteExpense = (expenseId) => {
    return axiosInstance.delete(`/expense/${expenseId}`)
};