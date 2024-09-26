import axiosInstance from "../axios/axios";

export const AddBudgetApi = (value) => {
    return axiosInstance.post("/budget", {...value});
};

export const GetBudgetApi = () => {
    return axiosInstance.get("/budget");
};

export const GetBudgetByIdApi = (budgetId) => {
    return axiosInstance.get(`/budget/${budgetId}`);
};

export const UpdateBudgetApi = (budgetId, values) => {
    return axiosInstance.put(`/budget/${budgetId}`, {...values})
};

export const DeleteBudgetApi = (budgetId) => {
    return axiosInstance.delete(`/budget/${budgetId}`);
};