import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IoCloseCircleSharp } from "react-icons/io5";
import { AiOutlineDownload } from "react-icons/ai";
import { jsPDF } from "jspdf";

const columns = [
  {
    field: "id",
    headerName: "Patient ID",
    width: 100,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "patientName",
    headerName: "Patient Name",
    type: "text",
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
    field: "testName",
    headerName: "Test Name",
    type: "text",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "diagnosis",
    headerName: "Diagnosis",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "biochemistry",
    headerName: "Bio-chemistry",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "vitals",
    headerName: "Vitals",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "testDate",
    headerName: "Test Date",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
  },
  {
    field: "reports",
    headerName: "Reports",
    width: 150,
    headerClassName: "font-semibold text-lg hover:font-bold",
    renderCell: (params) => (
      <Button
        variant="contained"
        startIcon={<AiOutlineDownload />}
        onClick={() => handleDownloadReport(params.row)}
      >
        Download
      </Button>
    ),
  },
];

const rows = [
  {
    id: 1,
    patientName: "Jon Snow",
    age: 14,
    testName: "Blood Test",
    diagnosis: "Headache",
    biochemistry: "Normal",
    vitals: "Stable",
    testDate: "17-April-2024",
    reports: "D756",
  },
  {
    id: 2,
    patientName: "Cersei Lannister",
    age: 31,
    testName: "Covid Test",
    diagnosis: "Cold",
    biochemistry: "High",
    vitals: "Normal",
    testDate: "28-Feb-2024",
    reports: "D734",
  },
  {
    id: 3,
    patientName: "Jaime Lannister",
    age: 31,
    testName: "X-Ray",
    diagnosis: "Leg pain",
    biochemistry: "Normal",
    vitals: "Stable",
    testDate: "13-Jan-2024",
    reports: "D956",
  },
  {
    id: 4,
    patientName: "Arya Stark",
    age: 11,
    testName: "Flu Test",
    diagnosis: "Fever",
    biochemistry: "Normal",
    vitals: "Critical",
    testDate: "11-Mar-2024",
    reports: "D776",
  },
  {
    id: 5,
    patientName: "Daenerys Targaryen",
    age: 26,
    testName: "Covid Test",
    diagnosis: "Covid",
    biochemistry: "High",
    vitals: "Critical",
    testDate: "12-May-2024",
    reports: "D429",
  },
  {
    id: 6,
    patientName: "Arti Melisandre",
    age: 150,
    testName: "Liver Function Test",
    diagnosis: "Liver Cancer",
    biochemistry: "Abnormal",
    vitals: "Critical",
    testDate: "08-Feb-2024",
    reports: "D753",
  },
  {
    id: 7,
    patientName: "Ferrara Clifford",
    age: 44,
    testName: "Respiratory Test",
    diagnosis: "Cough",
    biochemistry: "Normal",
    vitals: "Normal",
    testDate: "19-Jan-2024",
    reports: "D962",
  },
  {
    id: 8,
    patientName: "Rossini Frances",
    age: 36,
    testName: "Blood Test",
    diagnosis: "Headache",
    biochemistry: "Normal",
    vitals: "Stable",
    testDate: "16-April-2024",
    reports: "D471",
  },
  {
    id: 9,
    patientName: "Harvey Roxie",
    age: 65,
    testName: "Blood Test",
    diagnosis: "Headache",
    biochemistry: "Normal",
    vitals: "Stable",
    testDate: "18-Feb-2024",
    reports: "D850",
  },
];

const handleDownloadReport = (row) => {
  const doc = new jsPDF();
  doc.text("Patient's Report", 20, 10);
  doc.text(`Patient Name: ${row.patientName}`, 20, 20);
  doc.text(`Age: ${row.age}`, 20, 30);
  doc.text(`Test Name: ${row.testName}`, 20, 40);
  doc.text(`Diagnosis: ${row.diagnosis}`, 20, 50);
  doc.text(`Bio-chemistry: ${row.biochemistry}`, 20, 60);
  doc.text(`Vitals: ${row.vitals}`, 20, 70);
  doc.text(`Test Date: ${row.testDate}`, 20, 80);
  doc.text(`Report Code: ${row.reports}`, 20, 90);
  doc.save(`${row.patientName}_Report.pdf`);
};

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
        row.patientName.toLowerCase().includes(searchValue) ||
        row.testName.toLowerCase().includes(searchValue) ||
        row.diagnosis.toLowerCase().includes(searchValue) ||
        row.biochemistry.toLowerCase().includes(searchValue) ||
        row.vitals.toLowerCase().includes(searchValue) ||
        row.testDate.toLowerCase().includes(searchValue) ||
        row.reports.toLowerCase().includes(searchValue)
      );
    });
    setFilteredRows(filteredData);
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
            className="my-2 border border-gray-300 rounded-full focus:ring focus:ring-black"
          />
          {filteredRows.length === 0 && (
            <Typography
              variant="h6"
              component="p"
              className="mt-2 text-red-800 font-bold text-2xl"
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
                  <strong>Patient Name:</strong> {selectedRow.patientName}
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
                  <strong>Test Name:</strong> {selectedRow.testName}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Diagnosis:</strong> {selectedRow.diagnosis}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Bio-chemistry:</strong> {selectedRow.biochemistry}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Vitals:</strong> {selectedRow.vitals}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Test Date:</strong> {selectedRow.testDate}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                  className="hover:font-bold hover:text-xl"
                >
                  <strong>Report Code:</strong> {selectedRow.reports}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleDownloadReport(selectedRow)}
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