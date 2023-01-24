import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartItems: [], showCart: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addCartItem(state, action) {
      const expenseItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (expenseItem) {
        expenseItem.total += action.payload.price;
        expenseItem.quantity++;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          total: action.payload.price,
        });
      }
    },
    removeCartItem(state, action) {
      const expenseItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[expenseItemIndex].quantity === 1) {
        state.cartItems.splice(expenseItemIndex, 1);
      } else {
        state.cartItems[expenseItemIndex].quantity--;
        state.cartItems[expenseItemIndex].total -= action.payload.price;
      }
    },
    showCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
