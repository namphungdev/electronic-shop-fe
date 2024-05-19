import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    search: {
      open: false,
    },
    cart: {
      open: false,
    },
    address: {
      open: false,
    },
  },
  reducers: {
    onCloseDrawer: (state, { payload: name }) => ({
      ...state,
      [name]: { open: false },
    }),
    onOpenDrawer: (state, { payload: name }) => ({
      ...state,
      [name]: { open: true },
    }),
  },
});
export default drawerSlice.reducer;
export const { onCloseDrawer, onOpenDrawer } = drawerSlice.actions;
