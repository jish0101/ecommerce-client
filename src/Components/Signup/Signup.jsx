import React, { useEffect } from 'react';
import { logoDark } from '../../Assets/index';
// import { signup } from '../../Store/reducers/Auth/authSlice';
// import { DevTool } from '@hookform/devtools';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../Store/reducers/Auth/authSelector';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Loader } from '@mantine/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { notifications } from '@mantine/notifications';
import { Check, XCircle } from 'lucide-react';
import { API_KEYS, API_URL, usePostForm } from '../../Api/api';

function Signup() {
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  const navigate = useNavigate();
  const { mutateAsync: signup, isPending: isLoadingSignup } = usePostForm({
    queryKey: API_KEYS.signup,
    url: API_URL.signup,
  });
  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().trim().email().required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    cPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });
  const form = useForm({ resolver: yupResolver(validationSchema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const formSubmit = async (bodyData) => {
    try {
      const { cPassword, ...filteredBody } = bodyData;
      const formData = new FormData();

      Object.entries(filteredBody).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await signup({ body: formData });
      const { status, message, data } = res.data;

      if (status) {
        notifications.show({
          id: 'signup',
          withCloseButton: true,
          withBorder: true,
          autoClose: 2000,
          title: <h4 className="font-bold text-lg">Welcome</h4>,
          message: <p className="text-base">{message}</p>,
          color: 'yellow',
          radius: 'lg',
          icon: <Check size={40} className="p-1" key={'login'} />,
          loading: false,
        });
        return navigate('/verify');
      }
    } catch (err) {
      const error = err?.response;

      notifications.show({
        id: 'signup',
        withCloseButton: true,
        withBorder: true,
        autoClose: 1500,
        title: <h4 className="font-bold text-lg">Oops!</h4>,
        message: <p className="text-base">{error?.data?.message}</p>,
        color: 'red',
        icon: <XCircle size={50} key={'login'} />,
        loading: true,
        onClose: () => {
          if (error && error.status === 409) {
            navigate('/signin');
          }
        },
      });
      console.log(err);
    }
  };

  useEffect(() => {
    if (isAuthenticatedRedux) {
      navigate('/');
    }
  }, [isAuthenticatedRedux]);

  return (
    <div className="w-full my-10">
      <div className="w-full pb-10 shadow-md">
        <form
          className="w-[370px] mx-auto flex flex-col items-center"
          onSubmit={handleSubmit(formSubmit)}
          noValidate
        >
          <img className="w-32 " src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Create Account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-sml font-medium" htmlFor="name">
                  Your name
                </label>
                <input
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                  id="name"
                  {...register('name')}
                  placeholder="Enter your name"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2">
                  {errors.name?.message}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="text-sml font-medium" htmlFor="email">
                  E-mail
                </label>
                <input
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                  id="email"
                  {...register('email')}
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
                  {...register('password')}
                  placeholder="Enter your password"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2">
                  {errors.password?.message}
                </p>
              </div>
              <div>
                <label className="flex flex-col gap-2" htmlFor="cpassword">
                  Confirm Password
                </label>{' '}
                <input
                  className="w-full  py-2 border border-zinc-400 px-3 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                  id="cpassword"
                  {...register('cPassword')}
                  placeholder=" Please re-enter your password"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2">
                  {errors.cPassword?.message}
                </p>
              </div>
              <button
                type="submit"
                disabled={false}
                className="w-full py-1.5 flex items-center gap-1 justify-center text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border disabled:opacity-85 disabled:cursor-not-allowed border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                {false ? <Loader color="#ffffff" size={'md'} type="dots" /> : <span>Continue</span>}
              </button>
              <p className="text-sm text-black leadng-4 mt-4">
                By creating an account, you agree with amazon's{' '}
                <span className="text-blue-600">Condition of use</span> and{' '}
                <span className="text-blue-600">Privacy Notice.</span>
              </p>
              <div>
                <p className="text-xs text-black  mt-2">
                  Already have an account?{' '}
                  <Link className="text-blue-600" to="/signin">
                    Sign in.
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
            help
          </p>
        </div>
        <p className="text-xs text-gray-600">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default Signup;
