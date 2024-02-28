import { createSlice } from '@reduxjs/toolkit';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cartItems: null,
  },
  reducers: {
    addToCart: (state, action) => {
      // if item is already in cart increase quantity by quantity in payload
      const cartItems = state?.cartItems;
      const item = action?.payload?.item;
      const newQuantity = action?.payload?.quantity;
      if (cartItems) {
        const existingItem = cartItems.find((item) => item.product._id === payload._id);
        if (existingItem) {
          existingItem.quantity += payload.quantity;
        } else {
          state.cartItems.push(payload);
        }
      }
    },
    removeFromCart: (state, action) => {
      if (state.cartItems) {
        state.cartItems = state.cartItems.filter((item) => item.product._id !== action.payload);
      }
      state.totalPrice -= action.payload.price;
    },
    clearCart: (state) => {
      state.cartItems = null;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartReducer.actions;
export default cartReducer.reducer;
