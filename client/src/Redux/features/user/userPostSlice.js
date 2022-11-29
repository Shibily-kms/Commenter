import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../../config/axios'
const INITIAL_STATE = {
    posts: [],
    count: 0,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: null

}

// Extra Redusers
export const doPost = createAsyncThunk('user/do-post', async (formData, thunkAPI) => {
    try {
        return await axios.post('/post', formData, { withCredentials: true })
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const userPostSlice = createSlice({
    name: 'userPosts',
    initialState: INITIAL_STATE,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
        }
    },
    extraReducers: {
        [doPost.pending]: (state) => {
            state.isLoading = true
        },
        [doPost.fulfilled]: (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.message = action.payload.data.message
            state.count = state.count + 1
            state.posts = [...state.posts, action.payload.data.post]
        },
        [doPost.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
    }
})

export const { reset } = userPostSlice.actions;
export default userPostSlice.reducer;