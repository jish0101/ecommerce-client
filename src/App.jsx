import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SuspenseWrapper from './Components/Layout/SuspenseWrapper';
import Layout from './Components/Layout/Layout';
import { ACCOUNT_TYPES } from './Lib/Constants';

const Home = lazy(() => import('./Pages/home/Home'));
const NotFound = lazy(() => import('./Components/Layout/NotFound'));
const UnAuthorized = lazy(() => import('./Components/Layout/UnAuthorized'));
const PrivateRoute = lazy(() => import('./Store/reducers/Auth/PrivateRoute'));
const Signup = lazy(() => import('./Components/Signup/Signup'));
const SignIn = lazy(() => import('./Components/Login/SignIn'));
const Cart = lazy(() => import('./Components/Cart/Cart'));
const Orders = lazy(() => import('./Components/Orders/Orders'));
const Account = lazy(() => import('./Components/Account/Account'));
const AccountProfile = lazy(() => import('./Components/Account/AccountProfile'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout component has suspense in it, so use suspense wrapper with lazy loading */}
        {/* Pass roles array to this PrivateRoute component with account type that is allowed. */}
        {/* Not passing roles will allow every logged in user to that route */}

        <Route element={<PrivateRoute roles={[ACCOUNT_TYPES.admin, ACCOUNT_TYPES.member]} />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/user-account" element={<Account />} />
          <Route path="/user-profile" element={<AccountProfile />} />
        </Route>
      </Route>

      <Route element={<SuspenseWrapper />}>
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
