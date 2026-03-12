import { createSlice } from '@reduxjs/toolkit';

/**
 * User Slice: Manages the global authentication state of the application.
 * This state is persisted across page reloads via redux-persist.
 */

// Initial state: No user is logged in by default
const initialState = {
  currentUser: null, // Stores user Profile details (username, email, avatar, etc.)
  isSignedIn: false, // Boolean flag to quickly check authentication status
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /**
     * Called when a sign-in process begins (optional loading state).
     */
    signInStart: (state) => {
      state.isSignedIn = true; // Temporary flag or could be a 'loading' boolean
    },
    signInSuccess: (state, action) => {
      state.isSignedIn = true;
      state.currentUser = action.payload;
    },

    /**
     * Dispatched to log out the user. Resets all state values.
     */
    signOut: (state) => {
      state.currentUser = null;
      state.isSignedIn = false;
    },
  },
});

// Export actions for use in components via useDispatch()
export const { signInStart, signInSuccess, signOut } = userSlice.actions;

// Export reducer for store configuration
export default userSlice.reducer;