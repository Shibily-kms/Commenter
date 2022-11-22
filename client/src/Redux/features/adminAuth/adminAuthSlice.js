import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../config/axios'

const initialState = {
    admin: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

// Admin Login
export const loginAdmin = createAsyncThunk('admin/login', async (formData,thunkAPI) => {
    console.log(formData,thunkAPI, 'formadata');
    try {
        return await axios.post('/admin/sign-in', formData,{ withCredentials: true })
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        console.log(message, 'message');
        return thunkAPI.rejectWithValue(message)
    }
})
// Admin Get Data


// Admin LogOut


export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: {
        [loginAdmin.pending]: (state) => {
            state.isLoading = true
        },
        [loginAdmin.fulfilled]: (state, action) => {
            console.log(action.payload,'payload');
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload.data.admin
            
        },
        [loginAdmin.rejected]: (state, action) => {
            console.log(action.payload);
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }
    }
})

export const { reset } = adminAuthSlice.actions;
export default adminAuthSlice.reducer