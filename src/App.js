import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import LayoutWithoutFooter from "./Layout/LayoutWithoutFooter.js";
// import SuspenseWrapper from "./Layout/SuspenseWrapper";
// import PrivateRoute from "./Store/reducers/Auth/PrivateRoute.jsx";

const DisplayPatientsTable = lazy(() =>
  import("./components/DisplayPatientsTable")
);
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs.js"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs.js"));
// const Header = lazy(() => import("./components/Header/Header"));
// const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));

const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<Login />}>
    //     {/* <Route element={<PrivateRoute roles={[100]} />}
    //         path="/display-patients-table"
    //         element={<DisplayPatientsTable />}
    //       />

    //     </Route> */}
    //     <Route  path="/display-patients-table"  element={<DisplayPatientsTable/>}/>
    //   </Route>
    // </Routes>

    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/display-patients-table"
            element={<DisplayPatientsTable />}
          />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Route>

        <Route element={<LayoutWithoutFooter />}>
          <Route path="/" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;

