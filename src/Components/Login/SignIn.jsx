import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { logoDark } from '../../Assets/index';
import { selectIsAuth } from '../../Store/reducers/Auth/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import { API_KEYS, API_URL } from '../../Api/api';
import { signin } from '../../Store/reducers/Auth/authSlice';
import { Check, XCircle } from 'lucide-react';
import '@mantine/notifications/styles.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../../Lib/GlobalExports';

function SignIn() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  const prevLocation = location.state?.from?.pathname || '/';

  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const { mutateAsync: login, isPending: isLoadingLogin } = useMutation({
    mutationFn: loginApi,
    mutationKey: [API_KEYS.login],
  });

  async function loginApi({ body }) {
    try {
      const { data } = await axios.post(`${BASE_URL}${API_URL.login}`, body, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const formSubmit = async (body) => {
    try {
      const { status, message, data } = await login({ body });

      if (status) {
        notifications.show({
          id: 'login',
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
        return dispatch(signin({ user: data }));
      }
    } catch (err) {
      const error = err?.response?.data;
      notifications.show({
        id: 'login',
        withCloseButton: true,
        autoClose: 2000,
        title: <h4 className="font-bold text-lg">Oops!</h4>,
        message: <p className="text-base">{error?.message}</p>,
        color: 'red',
        radius: 'lg',
        icon: <XCircle size={50} key={'login'} />,
        loading: false,
      });
      console.error(err);
    }
  };

  const emailConfig = {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'This is not a valid email',
    },
    required: {
      value: true,
      message: 'Email is required',
    },
  };

  const passwordConfig = {
    minLength: 6,
    required: {
      value: true,
      message: 'Password is required',
    },
  };

  useEffect(() => {
    try {
      if (isAuthenticatedRedux) {
        navigate(prevLocation, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticatedRedux]);

  return (
    <div className="w-full my-10">
      <div className="w-full shadow-md pb-10">
        <form
          className="w-[370px] mx-auto flex flex-col items-center"
          action="#"
          onSubmit={handleSubmit(formSubmit)}
          noValidate
        >
          <img className="w-32 " src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Sign In</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-sml font-medium" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="w-full py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                  id="email"
                  {...register('email', emailConfig)}
                  placeholder="Enter your email"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2">
                  {errors.email?.message}
                </p>
              </div>
              <div>
                <label className="flex flex-col gap-2" htmlFor="password">
                  Password
                </label>

                <input
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                  id="password"
                  {...register('password', passwordConfig)}
                  placeholder="Enter your password"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2">
                  {errors.password?.message}
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoadingLogin}
                className="w-full py-1.5 flex items-center gap-1 justify-center text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border disabled:opacity-85 disabled:cursor-not-allowed border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                {isLoadingLogin ? (
                  <Loader color="#ffffff" size={'md'} type="dots" />
                ) : (
                  <span>Continue</span>
                )}
              </button>
              <div className="flex justify-center"></div>
              <p className="text-sm text-black leading-4 mt-4">
                By creating an account, you agree with amazon's
                <span className="text-blue-600"> Condition of use </span>
                and
                <span className="text-blue-600"> Privacy Notice.</span>
              </p>
              <div>
                <p className="text-xs text-black mt-2">
                  New here ?
                  <Link className="text-blue-600" to="/signup">
                    {' '}
                    Create an account here.
                  </Link>
                </p>
                <p className="text-xs text-black leadng-4 mt-1">
                  Buying for work?
                  <span className="text-blue-600 cursor-not-allowed">
                    {' '}
                    Create a free business account
                  </span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full flex flex-col gap-4 justify-center items-center my-4">
        <div className="flex items-center gap-6 justify-center">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Conditions of Use
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Privacy Notice
          </p>
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default SignIn;
