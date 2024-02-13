import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckIcon, Loader } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { logoDark } from '../../Assets/index';
import { selectIsAuth } from '../../Store/reducers/Auth/authSelector';
import { useDispatch, useSelector } from 'react-redux';
import '@mantine/notifications/styles.css';
import { API_KEYS, API_URL, usePostFetch } from '../../Api/api';
import { signin } from '../../Store/reducers/Auth/authSlice';

function SignIn() {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const { mutateAsync: login, isLoading: isLoadingLogin } = usePostFetch({
    queryKey: API_KEYS.login,
    url: API_URL.login,
  });
  const dispatch = useDispatch();
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  const location = useLocation();
  const prevLocation = location.state?.from?.pathname || '/';
  const navigate = useNavigate();

  const formSubmit = async (body) => {
    try {
      const {
        data: { status, message, data: userData },
      } = await login({ body });

      if (status) {
        notifications.show({
          id: 'login',
          withCloseButton: true,
          autoClose: 2000,
          title: <h4 className="font-bold text-lg">Welcome</h4>,
          message: <p className="text-base">{message}</p>,
          color: 'yellow',
          icon: <CheckIcon className="p-2" key={'login'} />,
          className: 'text-yellow-600',
          loading: false,
        });
      }
      dispatch(signin(userData));
      console.log(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const emailConfig = {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'please fill the the email with correct cridentials',
    },
    required: {
      value: true,
      message: 'Please enter the correct email',
    },
  };

  const passwordConfig = {
    minLength: 6,
    required: {
      value: true,
      message: 'please enter the 6 digit password',
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
    <div className="w-full ">
      <div className="w-full  pb-10 ">
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
              <div className="flex flex-col gap-2">
                <label className="text-sml font-medium" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                  id="email"
                  {...register('email', emailConfig)}
                  placeholder="Enter your email"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
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
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  {errors.password?.message}
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              <div className="flex justify-center">
                <Loader color="gray" />
              </div>

              {/* <Button variant="filled" color="yellow" radius="md">
                Button
              </Button> */}
              <p className="text-sm text-black leadng-4 mt-4">
                By creating an account, you agree with amazon's
                <span className="text-blue-600"> Condition of use </span>
                and
                <span className="text-blue-600"> Privacy Notice.</span>
              </p>
              <div>
                <Link to="/signin">
                  <p className="text-xs text-black  mt-2">
                    Already have an account?
                    <span className="text-blue-600"> sign in</span>
                  </p>
                </Link>
                <p className="text-xs text-black leadng-4 mt-1">
                  Buying for work?
                  <span className="text-blue-600"> Create a free business account</span>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-300 flex flex-col gap-4 justify-center items-center py-4">
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

export default SignIn;
