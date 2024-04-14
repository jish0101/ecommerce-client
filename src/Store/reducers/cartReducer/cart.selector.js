export const selectCartItems = (state) => state.cart.cartItems;

export const selectAllStatus = (state) => state.cart.selectAll;

export const selectCartItemsCount = (state) => {
  return state.cart.cartItems.length;
};

export const selectSelectedItemCount = (state) => {
  const items = state.cart.cartItems;
  if (items) {
    const selectedItems = items.filter(({ item }) => {
      return item.selected;
    });
    return selectedItems.length;
  }
  return 0;
};

export const selectTotalAmount = (state) => {
  const items = state.cart.cartItems;
  if (items) {
    return items.reduce((acc, { item, quantity }) => {
      if (item.selected) {
        return acc + Number(item.price) * Number(quantity);
      }
      return acc;
    }, 0);
  }
  return 0;
};
