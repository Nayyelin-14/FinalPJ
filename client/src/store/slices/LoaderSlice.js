import { createSlice } from "@reduxjs/toolkit";

const loadinginitialstate = {
  isProcessing: false,
};
export const LoaderSlice = createSlice({
  name: "loader",
  initialState: loadinginitialstate,

  reducers: {
    //state = initial state
    setLoader: (state, action) => {
      state.isProcessing = action.payload;
    },
  },
});

export const { setLoader } = LoaderSlice.actions;
export default LoaderSlice.reducer;
