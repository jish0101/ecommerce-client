import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllStatus,
  selectCartItems,
  selectCartItemsCount,
  selectTotalAmount,
} from '../../Store/reducers/cartReducer/cart.selector';
import { Checkbox, Image, NumberFormatter, Select, Stack } from '@mantine/core';
import {
  addToCart,
  removeFromCart,
  selectAllItems,
  updateSelectProduct,
} from '../../Store/reducers/cartReducer/cartReducer';
import { formatNumber } from '../../Lib/Utils';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const itemsTotal = useSelector(selectTotalAmount);
  const selectAllValue = useSelector(selectAllStatus);
  const cartItemsCount = useSelector(selectCartItemsCount);

  const productItemCountHandler = (item, opt) => {
    if (opt) {
      const payload = {
        item,
        quantity: opt?.value,
      };
      dispatch(addToCart(payload));
    }
  };

  const handleProductDelete = (item) => {
    dispatch(removeFromCart({ item }));
  };

  const handleRedirect = (id) => {
    navigate(`/product-page/${id}`);
  };

  const handleSelectAll = (e) => {
    dispatch(selectAllItems(e));
  };

  const toggleProductSelect = (value, item) => {
    dispatch(updateSelectProduct({ value, _id: item?._id }));
  };

  return (
    <section className="bg-amazon_gray md:p-4 p-2">
      <div className="flex flex-wrap gap-2 md:flex-row flex-col [&>div]:bg-white">
        <div className="flex-1 md:p-4 p-2">
          <div className="w-full flex justify-between items-end border-b pb-3">
            <h2 className="md:text-3xl text-2xl">Shopping Cart</h2>
            <span className="text-gray-500">Price</span>
          </div>
          <div className="flex items-center md:gap-3 gap-1 md:px-4 px-2 my-4">
            <Checkbox
              id="selectall"
              checked={selectAllValue}
              onChange={(event) => handleSelectAll(event.currentTarget.checked)}
            />
            <label htmlFor="selectall" className="select-none">
              Select All
            </label>
          </div>
          <div className="grid md:gap-4 gap-2">
            {cartItems
              ? cartItems.map(({ item, quantity, selected }) => {
                  return (
                    <div
                      key={item?._id}
                      className="flex flex-col md:flex-row md:p-4 justify-between p-2 rounded-md gap-4 items-center border"
                    >
                      <div className="flex gap-2">
                        <div className="flex gap-2 items-center">
                          <Checkbox
                            onChange={(event) =>
                              toggleProductSelect(event.currentTarget.checked, item)
                            }
                            checked={selected}
                          />
                          <div className="w-[150px] rounded-md overflow-hidden">
                            <Image
                              loading="lazy"
                              src={item.image}
                              alt="items-image"
                              className="cursor-pointer"
                              onClick={() => handleRedirect(item?._id)}
                            />
                          </div>
                        </div>
                        <Stack h={'100%'} gap={5}>
                          <p
                            onClick={() => handleRedirect(item?._id)}
                            className="text-xl capitalize cursor-pointer hover:text-orange_100"
                          >
                            {item?.name}
                          </p>
                          <div className="flex items-center gap-3">
                            <Select
                              onChange={(_, opt) => productItemCountHandler(item, opt)}
                              size="sm"
                              value={quantity || null}
                              placeholder="Select Quantity"
                              data={Array.from({ length: item?.stock < 50 ? item?.stock : 50 }).map(
                                (_, i) => ({
                                  label: `Quantity: ${i + 1}`,
                                  value: `${i + 1}`,
                                }),
                              )}
                            />
                            <span className="border-l h-6" />
                            <button
                              onClick={() => handleProductDelete(item)}
                              className="text-blue-600 hover:underline"
                            >
                              Delete
                            </button>
                          </div>
                        </Stack>
                      </div>
                      <div>
                        <p className="text-lg font-semibold">
                          <NumberFormatter
                            prefix={`${item?.currency?.code} `}
                            value={item.price}
                            thousandSeparator
                          />
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
            <div className="flex justify-end items-end gap-2">
              {cartItemsCount > 0 ? (
                <>
                  <p className="md:text-2xl text-lg">Subtotal ({cartItemsCount} items):</p>
                  <p className="font-semibold md:text-2xl text-lg">
                    USD {formatNumber(itemsTotal)}
                  </p>
                </>
              ) : (
                <p className="text-2xl">No items selected</p>
              )}
            </div>
          </div>
        </div>
        <div className="md:p-4 p-2">Items selected</div>
      </div>
    </section>
  );
};

export default Cart;
