import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../config/axios'
const INITIAL_STATE = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// User LogIn
export const userLoagIN = createAsyncThunk('user/login', async (formData, thunkAPI) => {
    try {
        return await axios.post('/sign-in', formData, { withCredentials: true })
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
// User Get Data
export const getUserData = createAsyncThunk('user/get-data', async (thunkAPI) => {

    try {
        return await axios.get('/get-user', { withCredentials: true });
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: INITIAL_STATE,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        },
        logOut: (state) => {
            state.user = null
        },
        addSavePost: (state, action) => {
            state?.user?.savePost.push(action.payload.postId)
        },
        removeSavePost: (state, action) => {
            
            console.log(action, 'aciton');
            state.user.savePost = state.user.savePost.filter((value) => value != action.payload.postId)
        }
    },
    extraReducers: {
        [userLoagIN.pending]: (state) => {
            state.isLoading = true
        },
        [userLoagIN.fulfilled]: (state, action) => {

            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.data.user

        },
        [userLoagIN.rejected]: (state, action) => {

            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [getUserData.fulfilled]: (state, action) => {

            state.isSuccess = true
            state.user = action.payload.data.user
        }
    }
})

export const { reset, logOut, addSavePost, removeSavePost } = userAuthSlice.actions;

export default userAuthSlice.reducer;