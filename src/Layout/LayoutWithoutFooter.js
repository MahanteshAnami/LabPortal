import React, { Suspense } from "react";
import HeaderForLogin from "../components/Header/HeaderForLogin";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <HeaderForLogin />
        <div
          className="bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url('/images/bg-1.jpg')` }}
        >
          <Outlet />
        </div>
      </Suspense>
    </>
  );
}

export default Layout;
