import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { addTodo, deleteTodo, getTodos, update } from "./todoService";

const initialState = {
    todos: [],
    isLoading: false,
    message: ""
}

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async(_,thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user;
        const response = await getTodos(user);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const createTodo = createAsyncThunk('todos/createTodo', async(content,thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user;
        const response = await addTodo(user,content);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const updateTodo = createAsyncThunk('todos/updateTodo', async({todoId,content},thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user;
        const response = await update(user,todoId,content);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})
export const removeTodo = createAsyncThunk('todos/removeTodo', async(todoId,thunkAPI) => {
    try {
        const user = thunkAPI.getState().auth.user;
        const response = await deleteTodo(user,todoId);
        return response;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
})

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        reset : (state,action) => {
            state.isLoading = false;
            state.message = ""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.pending, (state,action) => {
            state.isLoading = true;
            state.message = "";
            state.todos = [];
        })
        .addCase(fetchTodos.fulfilled, (state,action) => {
            state.isLoading = false;
            state.message = "";
            state.todos = action.payload;
            console.log("fetched todos when no user 1",action.payload)
        })
        .addCase(fetchTodos.rejected, (state,action) => {
            state.isLoading = false;
            state.message = action.payload;
            state.todos = [];
        })
        .addCase(createTodo.pending, (state,action) => {
            state.isLoading = true;
            state.message = "";
        })
        .addCase(createTodo.fulfilled, (state,action) => {
            state.isLoading = false;
            state.message = "";
            state.todos.push(action.payload);
        })
        .addCase(createTodo.rejected, (state,action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase(removeTodo.pending, (state,action) => {
            state.isLoading = false;
            state.message = "";
        })
        .addCase(removeTodo.fulfilled, (state,action) => {
            state.isLoading = false;
            state.message = "";
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        })
        .addCase(removeTodo.rejected, (state,action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase(updateTodo.pending, (state,action) => {
            state.isLoading = false;
            state.message = "";
        })
        .addCase(updateTodo.fulfilled, (state,action) => {
            state.isLoading = false;
            state.message = "";
            state.todos = state.todos.map(todo => {
                if(todo.id === action.payload.id){
                    return action.payload;
                }
                return todo;
            });
        })
        .addCase(updateTodo.rejected, (state,action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
    }
})


export const { reset } = todoSlice.actions;
export default todoSlice.reducer;