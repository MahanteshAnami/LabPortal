import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    // editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    width: 120,
    
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 120,
  },
  {
    field: 'daignosis',
    headerName: 'Daignosis',
    width: 150,
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
  },
  {
    field: 'details',
    headerName: 'Details',
    width: 150,
  },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14, dob: '17-April-1970', daignosis: 'Headache', date: '17-April-2024', details: "D756" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31, dob: '17-April-1971', daignosis: 'Cold', date: '28-Feb-2024', details: "D734" },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31, dob: '17-April-1972', daignosis: 'Leg pain', date: '13-Jan-2024', details: "D956" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11, dob: '17-April-1973', daignosis: 'Fever', date: '11-Mar-2024', details: "D776" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 26, dob: '17-April-1974', daignosis: 'Covid', date: '12-May-2024', details: "D429" },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, dob: '17-April-1978', daignosis: 'Liver Cancer', date: '08-Feb-2024', details: "D753" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, dob: '17-April-1965', daignosis: 'Cough', date: '19-Jan-2024', details: "D962" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, dob: '17-April-1985', daignosis: 'Headache', date: '16-April-2024', details: "D471" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, dob: '17-April-1986', daignosis: 'Headache', date: '18-Feb-2024', details: "D850" },
];

export default function DisplayPatientsTable() {

const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

const handleRowSelection =(newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
}

  return (
    <Box sx={{ height: 600, width: '100%' }}>
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
        // onRowSelectionModelChange={(newRowSelectionModel) => {
        //     setRowSelectionModel(newRowSelectionModel);
        //   }}
          onRowSelectionModelChange={(newRowSelectionModel) => handleRowSelection(newRowSelectionModel)}
          rowSelectionModel={rowSelectionModel}
        
      />
    </Box>
  );
}