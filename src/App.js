import logo from './logo.svg';
import './App.css';
//import PatientsTable from './components/PatientsTable.js';
import DisplayPatientsTable from './components/DisplayPatientsTable';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <div className='header'>
          <label className='headerName'>Lab Portal</label>
        </div>
        <div className='patientTable'>
          <DisplayPatientsTable />
        </div>
        
      </StyledEngineProvider>
    </div>
  );
}

export default App;
