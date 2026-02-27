import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  isSignedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.isSignedIn = true;
    },
    signInSuccess: (state, action) => {
      state.isSignedIn = true;
      state.currentUser = action.payload;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.isSignedIn = false;
    },
  },
});

export const { signInStart, signInSuccess, signOut } = userSlice.actions;
export default userSlice.reducer;