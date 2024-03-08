import React, { useState, useEffect } from 'react';
import { logoDark } from '../../Assets';
import { PinInput, Text } from '@mantine/core';
import { API_URL } from '../../Api/api';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { notifications } from '@mantine/notifications';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, XCircle } from 'lucide-react';

function VerifyEmail() {
  const data = { otp: '' };
  const api = useAxiosPrivate();
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [inputData, setInputData] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleData = (n) => {
    setInputData({ otp: n });
  };

  const functVerify = async () => {
    try {
      const email = searchParams.get('email');
      if (inputData.otp && inputData.otp.length === 6 && email) {
        const { data } = await api.post(API_URL.verifyEmail, {
          email,
          otp: inputData.otp,
        });
        if (data) {
          const { message } = data;

          notifications.show({
            id: 'verify',
            withCloseButton: true,
            autoClose: 2000,
            title: <h4 className="font-bold text-lg">Welcome</h4>,
            message: <p className="text-base">{message}</p>,
            color: 'yellow',
            withBorder: true,
            radius: 'lg',
            icon: <Check size={40} className="p-1" key={'login'} />,
            loading: false,
          });
          return navigate('/signin');
        }
      }
    } catch (err) {
      const error = err?.response?.data;
      console.log('🚀 ~ functVerify ~ error:', error);
      notifications.show({
        id: 'verify-error',
        withCloseButton: true,
        autoClose: 2000,
        title: <Text className="font-bold text-lg">Oops!</Text>,
        message: <Text className="text-base">{error.message}</Text>,
        color: 'red',
        icon: <XCircle size={50} key={'login'} />,
        loading: false,
      });
      console.error(err);
    }
  };
  const functresend = async () => {
    const { data } = await api.post(API_URL.resendOtp, {
      email: `${email}`,
    });

    return data;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    functresend();
    setMinutes(0);
    setSeconds(9);
  };
  return (
    <div className="w-full ">
      <div className="w-full  my-4 pb-10 ">
        <form className="w-[370px] mx-auto flex flex-col items-center" action="#">
          <img className=" w-32" src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Verification Required</h2>
            <p>
              Complete this verification step. We've sent an OTP to
              <span className="font-bold"> {searchParams.get('email')}</span>.
            </p>
            <div className="grid gap-2 my-2">
              <label className="font-bold">Enter OTP</label>

              <PinInput
                size="md"
                length={6}
                name="otp"
                className="mb-1"
                placeholder="⭐"
                type={'number'}
                value={inputData.otp}
                onChange={handleData}
              />
            </div>
            <div className="my-5">
              <button
                onClick={functVerify}
                type="button"
                className=" w-full focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                Continue
              </button>
            </div>

            <div>
              {seconds > 0 || minutes > 0 ? (
                <p>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p>Didn't recieve code?</p>
              )}
              <button
                className="flex justify-center  hover:underline "
                disabled={seconds > 0 || minutes > 0}
                style={{
                  color: seconds > 0 || minutes > 0 ? '#DFE3E8' : 'blue',
                }}
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>

            <p className=" text-blue-600 ">I need more help</p>
            <div>
              <label htmlFor="Otp"></label>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-100 flex flex-col gap-4 justify-center items-center my-12">
        <div className="flex items-center gap-6 justify-center">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            help
          </p>
        </div>
        <p className="text-xs text-gray-600">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default VerifyEmail;
