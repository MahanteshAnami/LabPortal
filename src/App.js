import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import LayoutWithAnotherHeader from "./Layout/LayoutWithAnotherHeader.js";
// import SuspenseWrapper from "./Layout/SuspenseWrapper";
// import PrivateRoute from "./Store/reducers/Auth/PrivateRoute.jsx";

const PatientsTable = lazy(() =>
  import("./components/Patient/PatientsTable.js")
);
const PatientDetails = lazy(() =>
  import("./components/Patient/PatientDetails.js")
);
const AboutUs = lazy(() => import("./components/AboutUs/AboutUs.js"));
const ContactUs = lazy(() => import("./components/ContactUs/ContactUs.js"));
// const Header = lazy(() => import("./components/Header/Header"));
const Signup = lazy(() => import("./components/Signup"));
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
          {/* <Route
            path="/display-patients-table"
            element={<DisplayPatientsTable />}
          /> */}
          <Route path="/patientstable" element={<PatientsTable />} />
          <Route path="/patientdetails/:mrn" element={<PatientDetails />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Route>

        <Route element={<LayoutWithAnotherHeader />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
