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

// Edit Profile
export const editProfile = createAsyncThunk('user/edit-profile', async (form, thunkAPI) => {
    try {
        return await axios.put('/edit-profile', form, { withCredentials: true })
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
            state.user.savePost = state.user.savePost.filter((value) => value != action.payload.postId)
        },
        follow: (state, action) => {
            state?.user?.following.push(action.payload.followId)
        },
        unfollow: (state, action) => {
            state.user.following = state.user.following.filter((value) => value != action.payload.followId)
        }
    },
    extraReducers: {
        [userLoagIN.pending]: (state) => {
            state.isLoading = true
            state.isSuccess = false
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
            state.user = action.payload.data.user

        },
        [editProfile.pending]: (state) => {
            state.isLoading = true
            state.isSuccess = false
        },
        [editProfile.fulfilled]: (state, action) => {

            state.isLoading = false
            state.isSuccess = true
            state.user = action.payload.data.user
            state.message = action.payload.data.message

        },
        [editProfile.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
    }
})

export const { reset, logOut, addSavePost, removeSavePost, follow, unfollow } = userAuthSlice.actions;

export default userAuthSlice.reducer;