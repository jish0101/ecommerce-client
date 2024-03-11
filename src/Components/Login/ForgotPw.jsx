import React from 'react';
import { logoDark } from '../../Assets';
import { PinInput } from '@mantine/core';

function ForgotPw() {
  return (
    <div className="w-full ">
      <div className="w-full  my-4 pb-10 ">
        <form className="w-[370px] mx-auto flex flex-col items-center" action="#">
          <img className=" w-32" src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Reset Password</h2>
            <p>
              TO reset password,We've sent an OTP to
              <span className="font-bold"> </span>.
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
                // value={inputData.otp}
                // onChange={handleData}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPw;
