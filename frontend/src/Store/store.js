import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import todoSlice from "../features/todos/todoSlice";

export const Store = configureStore({
    reducer:  {
        auth: authReducer,
        userTodo: todoSlice
    }
})