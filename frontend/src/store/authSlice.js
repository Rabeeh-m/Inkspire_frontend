
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allUserData: null,
  loading: false,
};

// Create a slice for auth
const authSlice = createSlice({
  name: 'auth', 
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.allUserData = action.payload; // Set user data
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Set loading state
    },
    clearUser: (state) => {
      state.allUserData = null; // Clear user data
    },
  },
});

export const { setUser, setLoading, clearUser } = authSlice.actions;

export default authSlice.reducer;
