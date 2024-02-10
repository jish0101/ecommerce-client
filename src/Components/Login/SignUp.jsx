import React, { useEffect } from 'react';
import { logoDark } from '../../Assets/index';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../Store/reducers/Auth/authSlice';
import { selectIsAuth } from '../../Store/reducers/Auth/authSelector';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// import { Button } from '@mantine/core';

const SignUp = () => {
  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    cPassword: yup
      .string()
      .required('Confirm Password is required')
      .oneOf([yup.ref('password')], 'Passwords must match')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const form = useForm(formOptions);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = form;
  // const [userData, setUserData] = useState({});
  const isAuthenticatedRedux = useSelector(selectIsAuth);
  console.log(form);
  const formSubmit = (data) => {
    console.log('form submit', data);
  };
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const handleLogin = () => {
  //   dispatch(
  //     login({
  //       name: 'ridhi',
  //       email: userData?.email,
  //       password: userData?.password,
  //       role: 'admin'
  //     })
  //   );
  // };

  useEffect(() => {
    if (isAuthenticatedRedux) {
      navigate('/');
    }
  }, [isAuthenticatedRedux]);

  return (
    <div className="w-full ">
      <div className="w-full  pb-10 ">
        <form
          className="w-[370px] mx-auto flex flex-col items-center"
          action="#"
          onSubmit={handleSubmit(formSubmit)}
          noValidate>
          <img className="w-32 " src={logoDark} alt="logoDark" />
          <div className="w-full border border-zinc-200 p-6 mt-4">
            <h2 className="font-titleFont text-3xl font-normal mb-4">Create Account</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sml font-medium" htmlFor="name">
                  Your name
                </label>
                <input
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                  id="name"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'Please enter the name'
                    }
                  })}
                  placeholder="Enter your name"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  {errors.name?.message}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sml font-medium" htmlFor="email">
                  E-mail{' '}
                </label>{' '}
                <input
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                  id="email"
                  {...register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'please fill the the email with correct cridentials'
                    },
                    required: {
                      value: true,
                      message: 'Please enter the correct email'
                    }
                  })}
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
                  {...register('password', {
                    minLength: 6,
                    required: {
                      value: true,
                      message: 'please enter the 6 digit password'
                    }
                  })}
                  placeholder="Enter your password"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
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
                  {...register('cPassword', {
                    minLength: 6,
                    required: true
                  })}
                  placeholder=" Please re-enter your password"
                />
                <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                  {errors.cPassword?.message}
                </p>
              </div>
              <button className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
                continue
              </button>
              <div className="flex justify-center">
                <Loader color="gray" />
              </div>

              {/* <Button variant="filled" color="yellow" radius="md">
                Button
              </Button> */}
              <p className="text-sm text-black leadng-4 mt-4">
                By creating an account, you agree with amazon's{' '}
                <span className="text-blue-600">Condition of use</span> and{' '}
                <span className="text-blue-600">Privacy Notice.</span>
              </p>
              <div>
                <Link to="/signin">
                  <p className="text-xs text-black  mt-2">
                    Already have an account? <span className="text-blue-600">sign in</span>{' '}
                  </p>
                </Link>
                <p className="text-xs text-black leadng-4 mt-1">
                  Buying for work?{' '}
                  <span className="text-blue-600">Create a free business account</span>{' '}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full bg-gradient-to-t from-white via-white to-zinc-300 flex flex-col gap-4 justify-center items-center py-4">
        <div className="flex items-center gap-6 justify-center">
          <p className="text-xs text-blue-600 hover:text-orange-600 hover:underline underline-offset-1 cursor-pointer duration-100 ">
            Conditions of Use{' '}
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

      <DevTool control={control} />
    </div>
  );
};

export default SignUp;

{
  /* <div>
            <h2>your name</h2>
            <input
              type="text"
              value={userData?.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </div>{' '} 
          <div>
            <h2>enter email</h2>
            <input
              type="text"
              value={userData?.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
          <div>
            <h2>enter password</h2>
            <input
              type="text"
              value={userData?.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </div>
  <button onClick={handleLogin}>Login</button>*/
}
