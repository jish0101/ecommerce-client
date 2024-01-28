import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SuspenseWrapper from './Components/Layout/SuspenseWrapper.jsx';
import Layout from './Components/Layout/Layout.jsx';
import { ACCOUNT_TYPES } from './Lib/Constants.js';
// import {
//   Button,
//   Group,
//   Loader,
//   Paper,
//   Text,
//   useMantineColorScheme,
// } from "@mantine/core";

const Home = lazy(() => import('./Pages/home/Home.jsx'));
const NotFound = lazy(() => import('./Components/Layout/NotFound.jsx'));
const UnAuthorized = lazy(() => import('./Components/Layout/UnAuthorized.jsx'));
const PrivateRoute = lazy(() => import('./Store/reducers/Auth/PrivateRoute.jsx'));
const Login = lazy(() => import('./Components/Login/Login.jsx'));

function App() {
  // const { setColorScheme, clearColorScheme } = useMantineColorScheme({
  //   keepTransitions: true,
  // });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Layout component has suspense in it, so use suspense wrapper for components with lazy loading */}
        {/* Pass roles array to this PrivateRoute component with account type that is allowed to that route, */}
        {/* Not passing roles will allow every logged in user to that route */}

        <Route element={<PrivateRoute roles={[ACCOUNT_TYPES.admin, ACCOUNT_TYPES.member]} />}>
          <Route index element={<Home />} />
        </Route>
      </Route>

      <Route element={<SuspenseWrapper />}>
        <Route path="/unauthorized" element={<UnAuthorized />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
