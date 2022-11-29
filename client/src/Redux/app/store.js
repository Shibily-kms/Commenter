import { configureStore } from '@reduxjs/toolkit'
import userAuthReducer from '../features/user/authSlice'
import adminAuthReducer from '../features/admin/adminAuthSlice'
import sidebarReducer from '../features/sidebar/sidebarSlice'
import adminUserList from '../features/admin/userList'
import userPostReducer from '../features/user/userPostSlice'

export const store = configureStore({
    reducer: {
        // User
        userAuth: userAuthReducer,
        // Admin
        adminAuth: adminAuthReducer,
        userList: adminUserList,
        userPost: userPostReducer,
        // Each
        sidebarToggle: sidebarReducer
    }
})