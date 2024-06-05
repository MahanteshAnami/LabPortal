import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'dob', headerName: 'Date of Birth', width: 120 },
  { field: 'age', headerName: 'Age', type: 'number', width: 120 },
  { field: 'daignosis', headerName: 'Diagnosis', width: 150 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'details', headerName: 'Details', width: 150 },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, dob: '17-April-1970', daignosis: 'Headache', date: '17-April-2024', details: "D756" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, dob: '17-April-1971', daignosis: 'Cold', date: '28-Feb-2024', details: "D734" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, dob: '17-April-1972', daignosis: 'Leg pain', date: '13-Jan-2024', details: "D956" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, dob: '17-April-1973', daignosis: 'Fever', date: '11-Mar-2024', details: "D776" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 26, dob: '17-April-1974', daignosis: 'Covid', date: '12-May-2024', details: "D429" },
  { id: 6, lastName: 'Melisandre', firstName: 'Arti', age: 150, dob: '17-April-1978', daignosis: 'Liver Cancer', date: '08-Feb-2024', details: "D753" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, dob: '17-April-1965', daignosis: 'Cough', date: '19-Jan-2024', details: "D962" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, dob: '17-April-1985', daignosis: 'Headache', date: '16-April-2024', details: "D471" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, dob: '17-April-1986', daignosis: 'Headache', date: '18-Feb-2024', details: "D850" },
];

export default function DisplayPatientsTable() {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleRowSelection = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className='text-center'>
    <Box sx={{ height: 600, width: '100%', }}
    className="py-2 ">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 15,
            },
          },
        }}
        pageSizeOptions={[15]}
        onRowSelectionModelChange={(newRowSelectionModel) => handleRowSelection(newRowSelectionModel)}
        rowSelectionModel={rowSelectionModel}
        onRowClick={handleRowClick}
        className='px-auto bg-gray-50 text-md mx-32  py-1 shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100' 
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: '10px',
          boxShadow: 24,
          p: 4
        }}>
          {selectedRow && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedRow.firstName} {selectedRow.lastName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Date of Birth:</strong> {selectedRow.dob}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Age:</strong> {selectedRow.age}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Diagnosis:</strong> {selectedRow.daignosis}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Date:</strong> {selectedRow.date}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <strong>Details:</strong> {selectedRow.details}
              </Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
    </div>
  );
}