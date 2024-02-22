import React from 'react';
import { logoDark } from '../../Assets';
import { useSelector } from 'react-redux';
import { PinInput } from '@mantine/core';
function VerifyEmail() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  return (
    <div className="w-full ">
      <div className="w-full  my-4 pb-10 ">
        <form className="w-[370px] mx-auto flex flex-col items-center" action="#">
          <img className=" w-32" src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Verification Required</h2>
            <p>
              TO continue, complete this verification step.We've sent an OTP to the
              <span>{user.email}</span>. Please enter it below to complete verification.
            </p>
            <div className="my-2">
              <h2 className="font-bold">Enter OTP</h2>
              <PinInput />
            </div>
            <div className="my-5">
              <button
                type="button"
                className=" w-full focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
              >
                continue
              </button>
            </div>
            <p className="flex justify-center text-blue-600 ">Resend OTP</p>
            <p className=" text-blue-600 ">I need more help</p>
            <div>
              <label htmlFor="Otp"></label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
