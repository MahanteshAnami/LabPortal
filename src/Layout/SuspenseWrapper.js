import React, { Suspense } from 'react';
// import Loader from './Loader';
import { Outlet } from 'react-router-dom';

// function LoadingScreen() {
//   return <Loader />;
// }

const SuspenseWrapper = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Outlet />
    </Suspense>
  );
};

export default SuspenseWrapper;