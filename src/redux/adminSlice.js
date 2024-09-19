import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAdmin: false,
  },
  reducers: {
    setAdminStatus: (state, action) => {
      state.isAdmin = action.payload;
    },
  },
});

export const { setAdminStatus } = adminSlice.actions;
export default adminSlice.reducer;