import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin,userLogout } from "./authService";



//if the page reloads this will ensure user doesn't lose its previous state
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user? user : null,
    isLoading: false,
    message: ""
}

export const login = createAsyncThunk('auth/login',async(userData) => {
    try {
        const response = await userLogin(userData);
        // console.log("response " ,response)
        return response;
    } catch (error) {
        return error.message;
    }
})

export const logout = createAsyncThunk('auth/logout', async() => {
    await userLogout();
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset : (state) => {
            state.message = "",
            state.isLoading = false
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(login.pending, (state,action) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state,action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.message = "";
        })
        .addCase(login.rejected, (state,action) => {
            state.isLoading = false;
            state.user = null;
            state.message = action.payload;
        })
        .addCase(logout.fulfilled, (state,action) => {
            state.isLoading = false;
            state.user = null;
            state.message = "";
        })
    }
})

export const { reset } = authSlice.actions;

export default authSlice.reducer;