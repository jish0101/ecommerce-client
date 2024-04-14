import { createSlice } from '@reduxjs/toolkit';

export const cartKey = 'cart';

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    selectAll: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      const quantity = payload.quantity;
      const item = payload.item;

      if (state.cartItems.length) {
        const existingItem = state.cartItems.findIndex(({ item: f }) => f._id === item._id);
        if (existingItem !== -1) {
          state.cartItems[existingItem].quantity = quantity;
        } else {
          state.cartItems.push({
            item,
            quantity,
          });
        }
      } else {
        state.cartItems.push({
          item,
          quantity,
        });
      }
    },
    removeFromCart: (state, action) => {
      const payload = action.payload;
      const item = payload.item;

      if (state.cartItems) {
        const restItems = state.cartItems.filter(({ item: f }) => f._id !== item._id);
        state.cartItems = restItems;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    selectAllItems: (state, action) => {
      const payload = action.payload;

      state.cartItems.forEach((item) => {
        item.selected = payload;
      });
      state.selectAll = payload;
    },
    updateSelectProduct: (state, action) => {
      const payload = action.payload;

      const foundIndex = state.cartItems.findIndex(({ item }) => item?._id === payload._id);

      if (foundIndex !== -1) {
        state.cartItems[foundIndex].selected = payload.value;
      }
    },
    removeSelectedProducts: (state) => {
      return state.cartItems.filter((item) => item.selected !== false);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  selectAllItems,
  updateSelectProduct,
  removeSelectedProducts,
} = cartReducer.actions;
export default cartReducer.reducer;
