import React, { Suspense } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Suspense fallback={"Loading..."}>
        <Header />
        <div
          className="bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url('/images/bg-1.jpg')` }}
        >
          <Outlet />
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default Layout;
