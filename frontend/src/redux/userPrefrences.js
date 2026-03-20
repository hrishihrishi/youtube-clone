import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: "dark",
}

const userPrefrencesSlice = createSlice({
    name: "userPrefrences",
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
})

export const { setTheme } = userPrefrencesSlice.actions;
export default userPrefrencesSlice.reducer;