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
});

export const getUserPost = createAsyncThunk('user/get-user-post', async (thunkAPI) => {
    try {
        return await axios.get('/user-post', { withCredentials: true })
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
            state.message = ''
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
            state.posts = [action.payload.data.post, ...state.posts]
        },
        [doPost.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        [getUserPost.pending]: (state) => {

            state.isLoading = true
        },
        [getUserPost.fulfilled]: (state, action) => {
            state.isLoading = false

            state.message = action.payload.data.message
            state.count = action.payload.data.posts.length
            state.posts = action.payload.data.posts
        },
        [getUserPost.rejected]: (state, action) => {

            state.isLoading = false
            state.isError = true
            state.message = action.payload
        }
        
    }
})

export const { reset } = userPostSlice.actions;
export default userPostSlice.reducer;