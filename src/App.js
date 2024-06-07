// import logo from './logo.svg';
 //import './App.css';
 import './index.css'
//import PatientsTable from './components/PatientsTable.js';
import DisplayPatientsTable from './components/DisplayPatientsTable';
import { StyledEngineProvider } from '@mui/material/styles';

import Header from './components/Header';

function App() {
  return (
    <div className="">
      <StyledEngineProvider injectFirst>
        <Header/>
        <div className=''>
          <DisplayPatientsTable />
        </div>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
