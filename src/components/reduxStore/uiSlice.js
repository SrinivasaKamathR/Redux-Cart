import { createSlice } from "@reduxjs/toolkit";

const initialState = { showCart: false, notification: null };

const uiSlice = createSlice({
  name: "cartUi",
  initialState: initialState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart;
    },
    notification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.status,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
