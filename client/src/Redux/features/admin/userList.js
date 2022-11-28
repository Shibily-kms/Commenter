import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../config/axios'

const initialState = {
    users: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
}

// Thunk Actions
export const getUserList = createAsyncThunk('admin/get-user-list', async (thunkAPI) => {
    try {
        return await axios.get('/admin/user-list', { withCredentials: true })
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const userBlockOrUnblock = createAsyncThunk('admn/userblock-unblock', async (usrId, thunkAPI) => {
    try {
        return await axios.get('/admin/user-block-or-unblock/' + usrId, { withCredentials: true })
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



// Slice Actions
export const adminUserList = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
       
    },
    extraReducers: {
        [getUserList.pending]: (state) => {
            state.isLoading = true
        },
        [getUserList.fulfilled]: (state, action) => {
            state.isLoading = false
            state.users = action.payload.data.users
        },
        [getUserList.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload.data.message
        },
        [userBlockOrUnblock.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.data.message
            const newState = state.users.map(obj => {
                if (obj.urId === action.payload.data.urId && obj.status === "Active") {
                    return { ...obj, status: "Blocked" }
                } else if (obj.urId === action.payload.data.urId && obj.status === "Blocked") {
                    return { ...obj, status: "Active" }
                }
                return obj;
            })
            state.users = newState

        },
        [userBlockOrUnblock.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload.data.message
        },
    }
})

export const {  reset } = adminUserList.actions;
export default adminUserList.reducer;