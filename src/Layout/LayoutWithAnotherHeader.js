import React, { Suspense } from "react";
import HeaderForLogin from "../components/Header/HeaderForLogin";
import Footer from "../components/Footer/Footer";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <HeaderForLogin />
        <div
          className="bg-cover bg-center  flex flex-col h-[calc(100vh-85px)]"
          style={{ backgroundImage: `url('./images/bg-1.jpg')` }}
        >
          <Outlet />
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default Layout;
