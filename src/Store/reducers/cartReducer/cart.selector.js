export const selectCartItems = (state) => state.cart.cartItems;

export const selectAllStatus = (state) => state.cart.selectAll;

export const selectCartItemsCount = (state) => {
  const items = state.cart.cartItems;
  if (items) {
    return items.reduce((acc, item) => acc + Number(item.quantity), 0);
  }
  return 0;
};

export const selectTotalAmount = (state) => {
  const items = state.cart.cartItems;
  if (items) {
    return items.reduce((acc, { item, quantity, selected }) => {
      if (selected) {
        return acc + Number(item.price) * Number(quantity);
      }
      return acc;
    }, 0);
  }
  return 0;
};
