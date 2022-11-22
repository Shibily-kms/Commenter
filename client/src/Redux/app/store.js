import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../features/auth/authSlice'
import adminAuthRduce from '../features/adminAuth/adminAuthSlice'

export const store = configureStore({
    reducer: {
        // User
        userAuth: userAuthReducer,
        // Admin
        adminAuth: adminAuthRduce
    }
})