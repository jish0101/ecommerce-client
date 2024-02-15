import React from 'react';
import { logoDark } from '../../Assets';
import { useLocation } from 'react-router-dom';

function VerifyEmail() {
  const location = useLocation();
  return (
    <div className="w-full ">
      <div className="w-full  my-4 pb-10 ">
        <form className="w-[370px] mx-auto flex flex-col items-center" action="#">
          <img className=" w-32" src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Verification Required</h2>
            <p>
              TO continue, complete this verification step.We've sent an OTP to the
              <span>{location.state.email}</span>. Please enter it below to complete verification.
            </p>
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
