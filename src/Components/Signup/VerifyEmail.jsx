import React, { useState, useEffect } from 'react';
import { logoDark } from '../../Assets';
import { useSelector } from 'react-redux';
import { PinInput } from '@mantine/core';
import { selectUser } from '../../Store/reducers/Auth/authSelector';
import { API_KEYS, API_URL } from '../../Api/api';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';

function VerifyEmail() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const data = { otp: '' };
  const [inputData, setInputData] = useState(data);
  const api = useAxiosPrivate();

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  const user = useSelector(selectUser);

  console.log(user);

  const functVerify = async () => {
    console.log('helo');
    const res = await api.post(
      API_URL.verifyEmail,
      inputData,
      {
        email: `${email}`,
      },
      { 'Content-Type': 'application/json' },
    );
    console.log(res);
    return res;
  };
  const functresend = async () => {
    console.log('helo');
    const res = await api.post(
      API_URL.resendOtp,
      {
        email: `${email}`,
      },
      { 'Content-Type': 'application/json' },
    );
    console.log(res);
    return res;
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
              To continue, complete this verification step.We've sent an OTP to the
              <span className="font-bold"> {user?.email}</span> Please enter it below to complete
              verification.
            </p>
            <div className="my-2  ">
              <label className="font-bold flex justify-center">Enter OTP</label>

              <PinInput
                className="flex justify-center mb-1"
                name="otp"
                value={inputData.otp}
                onChange={handleData}
                length={6}
                placeholder="*"
              />
            </div>
            <div className="my-5">
              <button
                onClick={functVerify}
                type="button"
                className=" w-full focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                continue
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
