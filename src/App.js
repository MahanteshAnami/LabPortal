// import logo from './logo.svg';
 //import './App.css';
 import './index.css'
//import PatientsTable from './components/PatientsTable.js';
import DisplayPatientsTable from './components/DisplayPatientsTable';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="">
      <StyledEngineProvider injectFirst>
        <div className='bg-cyan-700 flex justify-between p-4'>
          <div className=''>
            <img src="./images/logo.jpg" height={60} width={60} alt="logo" /></div>
          <span className='text-center text-3xl font-semibold text-white align-middle m-2'>Lab Portal</span>
          
          <span className='text-white bg-pink-600 text-3xl rounded-full h-12 w-12 text-center p-1 m-2'>A</span>
        </div>
        <div className=''>
          <DisplayPatientsTable />
        </div>
        
      </StyledEngineProvider>
    </div>
  );
}

export default App;
