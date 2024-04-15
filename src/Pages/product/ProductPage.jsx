import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedCategory } from '../../Store/reducers/SelectedCategory/selectedCategory.selector';
import { Breadcrumbs, Image, Select } from '@mantine/core';
import { formatNumber } from '../../Lib/Utils';
import { Check, MapPin } from 'lucide-react';
import { addToCart, removeFromCart } from '../../Store/reducers/cartReducer/cartReducer';
import { notifications } from '@mantine/notifications';
import { selectCartItems } from '../../Store/reducers/cartReducer/cart.selector';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axios = useAxiosPrivate();
  const selectedCategory = useSelector(selectSelectedCategory);
  const cartItems = useSelector(selectCartItems);
  const [selectedQuantity, setSelectedQuantity] = useState({ label: `Quantity: 1`, value: `1` });
  const { data: productData, isFetching: isLoading } = useQuery({
    queryKey: [id],
    queryFn: fetchProductData,
    staleTime: Infinity,
    retryDelay: Infinity,
    refetchOnWindowFocus: false,
  });

  async function fetchProductData() {
    const { data, status } = await axios.get(`products?id=${id}`);
    if (status) {
      return data?.data;
    }
  }

  const breadCrumData = [
    {
      title: selectedCategory?.label,
      to: -1,
    },
    {
      title: productData?.name,
      to: '#',
    },
  ];

  const quantityOptions = Array.from({ length: 50 }).map((_, i) => ({
    label: `Quantity: ${i + 1}`,
    value: `${i + 1}`,
  }));

  const isInCart = () => {
    return cartItems.find(({ item }) => item._id === id) !== undefined;
  };

  const addToCartHandler = () => {
    if (selectedQuantity && selectedQuantity?.value) {
      const payload = {
        item: productData,
        quantity: selectedQuantity?.value,
      };
      dispatch(addToCart(payload));
      notifications.show({
        id: 'addedToCart',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg capitalize">{productData.name}</h4>,
        message: <p className="text-base">Added item to cart!</p>,
        color: 'yellow',
        icon: <Check size={40} className="p-1" key={'addedToCart'} />,
        loading: false,
      });
    }
  };

  const removeFromCartHandler = () => {
    if (selectedQuantity && selectedQuantity?.value) {
      const payload = {
        item: productData,
      };
      dispatch(removeFromCart(payload));
      notifications.show({
        id: 'removeFromCart',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg capitalize">{productData.name}</h4>,
        message: <p className="text-base">Removed from the cart!</p>,
        color: 'yellow',
        icon: <Check size={40} className="p-1" key={'removeFromCart'} />,
        loading: false,
      });
    }
  };

  const buyNowHandler = () => {
    addToCartHandler();
    return navigate('/checkout');
  };

  return (
    <section className="w-full">
      <div className="mx-4 pt-2">
        <Breadcrumbs separator=">" separatorMargin="xs">
          {breadCrumData.map(({ title, to }, i) => (
            <Link key={i} className="text-gray-500 text-sm capitalize" to={to}>
              {title}
            </Link>
          ))}
        </Breadcrumbs>
      </div>
      <div className="grid lg:grid-cols-6 w-full p-4">
        <div className="lg:col-span-2 rounded-md overflow-hidden w-full h-full">
          <Image className="object-cover" src={productData?.image} />
        </div>
        <div className="lg:col-span-3 p-3 px-8 flex flex-col [&>*]:border-b [&>*]:border-gray-300 [&>*]:p-2">
          <h3 className="text-3xl capitalize">{productData?.name}</h3>
          <p>Ratings: 5 Stars | 1 Rating</p>
          <p className="font-semibold text-lg">About this item:</p>
          <p>Material: {productData?.productMaterial}</p>
          <p className="border-none">Description:</p>
          <p>{productData?.productDescription}</p>
        </div>
        <div className="flex flex-col gap-2 py-4 border-2 rounded-md shadow-md p-3">
          <div className="flex gap-1">
            <p className="text-xs mt-1">{productData?.currency?.code}</p>
            <p className="text-3xl tracking-widest font-semibold">{`${productData?.currency?.symbol}${formatNumber(productData?.price)}`}</p>
          </div>
          <div className="flex min-w-fit rounded-sm pt-2 p-1 gap-1 cursor-pointer">
            <MapPin size={20} className="self-center" />
            <div className="flex flex-col items-center leading-3 text-blue-500">
              <Link className="hover:text-amazon_yellow text-xs pr-3">
                {'Deliver to Jishan - Ghaziabad 201007'}
              </Link>
            </div>
          </div>
          <div>
            <p>
              {productData?.stock > 0 ? (
                <span className="text-2xl text-green-700">In stock</span>
              ) : (
                <span className="text-2xl text-red-500">Out of stock</span>
              )}
            </p>
          </div>
          <div>
            <Select
              data={quantityOptions}
              value={selectedQuantity?.value || null}
              onChange={(_, opt) => setSelectedQuantity(opt)}
              placeholder="Select a quantity"
            />
          </div>
          <div className="my-2 flex flex-col gap-3">
            <button
              onClick={isInCart() === true ? removeFromCartHandler : addToCartHandler}
              disabled={!selectedQuantity}
              className="w-full bg-amazon_yellow_dark rounded-full disabled:cursor-not-allowed disabled:opacity-80 hover:opacity-90 p-1"
            >
              {isInCart() ? 'Remove from cart' : 'Add to cart'}
            </button>
            <button
              onClick={buyNowHandler}
              className="w-full bg-orange_100 rounded-full hover:opacity-90 p-1"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
