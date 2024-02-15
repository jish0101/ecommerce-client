{
  /* <form
  action="#"
  onSubmit={handleSubmit(formSubmit)}
  className="w-[370px] mx-auto flex flex-col items-center"
  noValidate>
  <div>
    <label className="text-sm font-medium" htmlFor="name">
      Name
    </label>
[#f7dfa5]
border border-zinc-400 
    <input
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
    <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center  -mt-1.5">
      {' '}
      {errors.name?.message}
    </p>
  </div>
  <div>
    <label htmlFor="email">E-mail</label> <br />
    <input
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
    <p>{errors.email?.message}</p>
  </div>
  <div>
    <label htmlFor="password">Password</label>

    <input
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
    <p>please enter 6 digit password</p>
    <p>{errors.password?.message}</p>
  </div>
  <div>
    <label htmlFor="cPassword">re-enter password</label> <br />
    <input
      type="password"
      id="cPassword"
      {...register('cPassword')}
      placeholder="re-enter your password"
    />
  </div>
  <button>Submit</button>
</form>; */
}
