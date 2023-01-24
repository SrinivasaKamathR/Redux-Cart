import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    replaceCartItem(state, action) {
      state.cartItems = action.payload.cartItems;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addCartItem(state, action) {
      const expenseItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (expenseItem) {
        expenseItem.total += action.payload.price;
        expenseItem.quantity++;
        state.totalQuantity++;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
        state.totalQuantity++;
      }
    },
    removeCartItem(state, action) {
      const expenseItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[expenseItemIndex].quantity === 1) {
        state.cartItems.splice(expenseItemIndex, 1);
        state.totalQuantity--;
      } else {
        state.cartItems[expenseItemIndex].quantity--;
        state.cartItems[expenseItemIndex].total -= action.payload.price;
        state.totalQuantity--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
