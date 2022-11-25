import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    action : false
}

export const sidebarToggle =createSlice({
    name : 'sidebarToggle',
    initialState,
    reducers:{
        setTrue : (state)=>{
            state.action = true
        },
        setFalse : (state)=>{
            state.action = false
        }
    }
})


export const { setTrue, setFalse} = sidebarToggle.actions;
export default sidebarToggle.reducer;