// import { Outlet } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import useRefreshToken from './useRefreshToken';
// import { useSelector } from 'react-redux';
// import { selectToken } from '../Store/reducers/Auth/authSelector';
// import { authKey } from '../Store/reducers/Auth/authSlice';
// import LoaderComponent from '../Components/Layout/Loader';

// const PersistLogin = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const refresh = useRefreshToken();
//   const token = useSelector(selectToken);
//   const persist = JSON.parse(localStorage.getItem(authKey));

//   useEffect(() => {
//     let isMounted = true;

//     const verifyRefreshToken = async () => {
//       try {
//         setIsLoading(true);
//         await refresh();
//       } catch (err) {
//         console.error(err);
//       } finally {
//         isMounted && setIsLoading(false);
//       }
//     };

//     !token && persist ? verifyRefreshToken() : setIsLoading(false);

//     return () => (isMounted = false);
//   }, []);

//   return (
//     <>
//       {!persist ? (
//         <Outlet />
//       ) : isLoading ? (
//         <div className="flex flex-col gap-2 justify-center items-center h-screen">
//           <LoaderComponent type="dots" size={'xl'} color="yellow" />
//         </div>
//       ) : (
//         <Outlet />
//       )}
//     </>
//   );
// };

// export default PersistLogin;
