import React from 'react';
import useRazorpay from 'react-razorpay';
import { BASE_URL } from '../../Lib/GlobalExports';
import { notifications } from '@mantine/notifications';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectSelectedItemCount,
  selectTotalAmount,
} from '../../Store/reducers/cartReducer/cart.selector';
import { Button, NumberFormatter } from '@mantine/core';
import { endLoading, startLoading } from '../../Store/reducers/globalLoader/loaderSlice';
import { XCircle } from 'lucide-react';

const CheckoutPage = () => {
  const [Razorpay] = useRazorpay();
  const dispatch = useDispatch();
  const axios = useAxiosPrivate();
  const user = useSelector(selectUser);
  const selectedItemCount = useSelector(selectSelectedItemCount);
  const totalAmount = useSelector(selectTotalAmount);
  const cartItems = useSelector(selectCartItems);

  const getKey = async () => {
    try {
      const { status, data } = await axios.get('payment/getKey');
      if (status) {
        return data;
      }
    } catch (err) {
      notifications.show({
        id: 'failedtocreateorder',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg">Server Error</h4>,
        message: <p className="text-base">Failed to create order!</p>,
        color: 'red',
        radius: 'lg',
        icon: <XCircle size={50} key={'failedtocreateorder'} />,
        loading: false,
      });
      console.log(err);
    }
  };

  const createOrder = async () => {
    try {
      const { data } = await axios.post('orders', {
        products: cartItems
          .filter(({ item }) => item.selected)
          .map(({ item, quantity }) => {
            return {
              _id: item._id,
              unit: quantity,
            };
          }),
      });
      return data?.data?.order;
    } catch (error) {
      notifications.show({
        id: 'failedtocreateorder',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg">Server Error</h4>,
        message: <p className="text-base">Failed to create order!</p>,
        color: 'red',
        radius: 'lg',
        icon: <XCircle size={50} key={'failedtocreateorder'} />,
        loading: false,
      });
      console.log(error);
    }
  };

  const handlePayment = async () => {
    if (totalAmount > 0) {
      dispatch(startLoading());
      const order = await createOrder();
      const key = await getKey();
      dispatch(endLoading());

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: user.name,
        image: user.profile,
        order_id: order.orderId,
        callback_url: `${BASE_URL}payment/paymentverification`,
        prefill: {
          name: user.name,
          email: user.email,
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#000000',
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on('payment.failed', function (response) {
        notifications.show({
          id: 'PaymentFailed',
          withCloseButton: true,
          autoClose: 2000,
          title: <h4 className="font-bold text-lg">Oops!</h4>,
          message: <p className="text-base">Payment Failed!</p>,
          color: 'red',
          radius: 'lg',
          icon: <XCircle size={50} key={'PaymentFailed'} />,
          loading: false,
        });
      });

      return rzp1.open();
    }

    return notifications.show({
      id: 'BadRequest',
      withCloseButton: true,
      autoClose: 2000,
      title: <h4 className="font-bold text-lg">Oops!</h4>,
      message: <p className="text-base">Your cart is empty!</p>,
      color: 'red',
      radius: 'lg',
      icon: <XCircle size={50} key={'BadRequest'} />,
      loading: false,
    });
  };

  return (
    <section className="min-h-[40vh] flex flex-col gap-2">
      <div className="border-b flex justify-center p-3 shadow-md">
        <h1 className="text-3xl font-semibold text-slate-900">
          Checkout ({selectedItemCount} {selectedItemCount > 1 ? 'items' : 'item'})
        </h1>
      </div>
      <div className="md:w-3/4 mx-auto grid md:grid-cols-3 gap-3 my-3">
        <div className="flex gap-2 items-start md:col-span-2 justify-between my-2">
          <p className="text-orange_100 text-2xl font-semibold">Shipping Address: </p>
          <p>Your Address Here</p>
          <Button size="compact-md">Change</Button>
        </div>

        <div className="flex flex-col gap-2 border shadow-md rounded-md p-3">
          <h3 className="font-semibold text-xl">Order Summary</h3>
          <div className="flex justify-between border-b py-2">
            <p>Items: </p>
            <p>{<NumberFormatter value={totalAmount} thousandSeparator prefix="₹" />}</p>
          </div>
          <div className="flex justify-between border-b py-2">
            <p>Shipping & Handling: </p>
            <p>FREE</p>
          </div>
          <div className="flex justify-between py-2">
            <p className="text-2xl font-semibold text-red-500">Order total:</p>
            <p className="text-xl font-semibold">
              {<NumberFormatter value={totalAmount} thousandSeparator prefix="₹" />}
            </p>
          </div>
          <div className="my-2 px-2">
            <Button onClick={handlePayment} w={'100%'} color="primaryColor">
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
