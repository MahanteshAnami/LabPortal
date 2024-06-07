import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoCloseCircleSharp } from "react-icons/io5";
import { jsPDF } from "jspdf";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "firstName",
    headerName: "First name",
    type: "text",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "lastName",
    headerName: "Last name",
    type: "text",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "dob",
    headerName: "Date of Birth",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 100,
    headerClassName: "font-semibold text-lg hover:font-bold",
    flexGrow: 1,
  },
  {
    field: "diagnosis",
    headerName: "Diagnosis",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "date",
    headerName: "Date",
    type: "dob",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "details",
    headerName: "Details",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
];

const rows = [
  {
    id: 1,
    lastName: "Snow",
    firstName: "Jon",
    age: 14,
    dob: "17-April-1970",
    diagnosis: "Headache",
    date: "17-April-2024",
    details: "D756",
  },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    age: 31,
    dob: "17-April-1971",
    diagnosis: "Cold",
    date: "28-Feb-2024",
    details: "D734",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    age: 31,
    dob: "17-April-1972",
    diagnosis: "Leg pain",
    date: "13-Jan-2024",
    details: "D956",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    age: 11,
    dob: "17-April-1973",
    diagnosis: "Fever",
    date: "11-Mar-2024",
    details: "D776",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    age: 26,
    dob: "17-April-1974",
    diagnosis: "Covid",
    date: "12-May-2024",
    details: "D429",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Arti",
    age: 150,
    dob: "17-April-1978",
    diagnosis: "Liver Cancer",
    date: "08-Feb-2024",
    details: "D753",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    age: 44,
    dob: "17-April-1965",
    diagnosis: "Cough",
    date: "19-Jan-2024",
    details: "D962",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    age: 36,
    dob: "17-April-1985",
    diagnosis: "Headache",
    date: "16-April-2024",
    details: "D471",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    age: 65,
    dob: "17-April-1986",
    diagnosis: "Headache",
    date: "18-Feb-2024",
    details: "D850",
  },
];

export default function DisplayPatientsTable() {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredRows, setFilteredRows] = React.useState(rows);

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

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filteredData = rows.filter((row) => {
      return (
        row.firstName.toLowerCase().includes(searchValue) ||
        row.lastName.toLowerCase().includes(searchValue) ||
        row.dob.toLowerCase().includes(searchValue) ||
        row.diagnosis.toLowerCase().includes(searchValue) ||
        row.date.toLowerCase().includes(searchValue) ||
        row.details.toLowerCase().includes(searchValue)
      );
    });
    setFilteredRows(filteredData);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Patient's Information", 20, 10);
    doc.text(`First Name: ${selectedRow.firstName}`, 20, 20);
    doc.text(`Last Name: ${selectedRow.lastName}`, 20, 30);
    doc.text(`Date of Birth: ${selectedRow.dob}`, 20, 40);
    doc.text(`Age: ${selectedRow.age}`, 20, 50);
    doc.text(`Diagnosis: ${selectedRow.daignosis}`, 20, 60);
    doc.text(`Date: ${selectedRow.date}`, 20, 70);
    doc.text(`Details: ${selectedRow.details}`, 20, 80);
    doc.save(
      `${selectedRow.firstName}_${selectedRow.lastName}_Information.pdf`
    );
  };

  return (
    <div className="text-center">
      <Box sx={{ height: 600, width: "100%" }} className="py-2 px-4">
        <div className="mb-4 mx-auto w-3/6">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            className="my-2 border border-gray-300 rounded-full focus:ring focus:ring-blue-300 "
          />
          {filteredRows.length === 0 && (
            <Typography
              variant="h6"
              component="p"
              className="mt-2 text-red-500"
            >
              No matching records found
            </Typography>
          )}
        </div>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 15,
              },
            },
          }}
          pageSizeOptions={[15]}
          onRowSelectionModelChange={(newRowSelectionModel) =>
            handleRowSelection(newRowSelectionModel)
          }
          rowSelectionModel={rowSelectionModel}
          onRowClick={handleRowClick}
          className="bg-gray-50 text-md py-1 shadow-md shadow-blue-300 hover:shadow-xl hover:shadow-blue-100"
          getRowClassName={(params) => "hover:bg-gray-100"}
          classes={{
            columnHeader: "hover:font-bold font-semibold hover:text-xl",
            columnHeaderTitle: "font-semibold  hover:font-bold",
          }}
        />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              bgcolor: "background.paper",
              border: "2px solid #000",
              borderRadius: "10px",
              boxShadow: 24,
              p: 4,
              textAlign: "left",
            }}
          >
            <div className="flex justify-between">
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="font-bold my-2 text-3xl hover:text-4xl"
              >
                Patient's Information
              </Typography>
              <span
                onClick={handleClose}
                className="cursor-pointer text-gray-500 hover:text-gray-900 absolute top-4 right-5"
              >
                <IoCloseCircleSharp size={28} />
              </span>
            </div>
            {selectedRow && (
              <div className="text-lg">
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>First Name:</strong> {selectedRow.firstName}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Last Name:</strong> {selectedRow.lastName}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Date of Birth:</strong> {selectedRow.dob}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Age:</strong> {selectedRow.age}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Diagnosis:</strong> {selectedRow.daignosis}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Date:</strong> {selectedRow.date}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Details:</strong> {selectedRow.details}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownloadPDF}
                  sx={{ mt: 2 }}
                  className="hover:bg-blue-700 hover:text-lg"
                >
                  Download PDF
                </Button>
              </div>
            )}
          </Box>
        </Modal>
      </Box>
    </div>
  );
}
