import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../features/auth/authSlice'
import adminAuthReducer from '../features/adminAuth/adminAuthSlice'
import sidebarReducer from '../features/sidebar/sidebarSlice'

export const store = configureStore({
    reducer: {
        // User
        userAuth: userAuthReducer,
        // Admin
        adminAuth: adminAuthReducer,
        // Each
        sidebarToggle : sidebarReducer
    }
})