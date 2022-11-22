import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
    user : null
}

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: INITIAL_STATE,
    reducers: {
        setData: (state) => {
            console.log(state);
        }
    }
})

export const { setData } = userAuthSlice.actions;

export default userAuthSlice.reducer;