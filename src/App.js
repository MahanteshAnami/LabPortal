import React,{lazy} from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import SuspenseWrapper from "./Layout/SuspenseWrapper";
import PrivateRoute from "./Store/reducers/Auth/PrivateRoute.jsx"


const DisplayPatientsTable = lazy(() => import('./components/DisplayPatientsTable'));
const AboutUs = lazy(() => import('./components/AboutUs/AboutUs.js'));
 const ContactUs = lazy(() => import('./components/ContactUs/ContactUs.js'));
const Header=lazy(()=>import('./components/Header/Header'))
 const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));

const App = () => {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route
        element={
          <PrivateRoute
            roles={[100]}
          /> }>
        
        <Route path="/display-patients-table" element={<DisplayPatientsTable/>} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs/>} />
      </Route>
    </Route>
    <Route element={<SuspenseWrapper />}>
    <Route path="/header" element={<Header />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Route>
  </Routes>
  );
};

export default App;





// import DisplayPatientsTable from './components/DisplayPatientsTable';
// import { StyledEngineProvider } from '@mui/material/styles';

// function App() {
//   return (
//     <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url('/images/bg-1.jpg')` }}>
//       <StyledEngineProvider injectFirst>
//        
// <Login/>
//         <div className="flex justify-center items-center bg-opacity-25">
//           <DisplayPatientsTable />
//         </div>
//       
//       </StyledEngineProvider>
//     </div>
//   );
// }

// export default App;