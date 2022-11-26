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
export const loginAdmin = createAsyncThunk('admin/login', async (formData, thunkAPI) => {
   
    try {
        return await axios.post('/admin/sign-in', formData, { withCredentials: true })
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
       
        return thunkAPI.rejectWithValue(message)
    }
})
// Admin Get Data
export const getAdminData = createAsyncThunk('admin/get-data', async (thunkAPI) => {
   
    try {
       
        return await axios.get('/admin/get-admin', { withCredentials: true });
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
        return thunkAPI.rejectWithValue(message)
    }
})



export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isLoading = false
            state.isSuccess = false
            state.message = ''
        },
        logOut: (state) => {
            state.admin = null
        }
    },
    extraReducers: {
        [loginAdmin.pending]: (state) => {
            state.isLoading = true
        },
        [loginAdmin.fulfilled]: (state, action) => {
           
            state.isLoading = false
            state.isSuccess = true
            state.admin = action.payload.data.admin

        },
        [loginAdmin.rejected]: (state, action) => {
           
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [getAdminData.fulfilled]: (state, action) => {
          
            state.isSuccess = true
            state.admin = action.payload.data.admin
        }

    }
})

export const { reset,logOut } = adminAuthSlice.actions;
export default adminAuthSlice.reducer