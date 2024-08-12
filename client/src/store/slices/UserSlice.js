import { createSlice } from "@reduxjs/toolkit";

const userinitialstate = {
  userId: null,
};
export const UserSlice = createSlice({
  name: "user",
  initialState: {
    userId: userinitialstate,
  },
  reducers: {
    //state = initial state
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = UserSlice.actions;
export default UserSlice.reducer;
