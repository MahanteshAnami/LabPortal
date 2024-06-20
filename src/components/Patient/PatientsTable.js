import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDownload } from "react-icons/ai";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

const rows = [
  {
    id: 4215,
    patientName: "Jon Snow",
    age: 14,
    testName: "Blood Test",
    diagnosis: "Headache",
    biochemistry: "Blood urea nitrogen: 8–20 mg/dL ",
    vitals: "Body Temperature",
    testDate: "17-Apr-2024",
    reports: "D756",
  },
  {
    id: 4216,
    patientName: "Cersei Lannister",
    age: 31,
    testName: "Covid Test",
    diagnosis: "Cold",
    biochemistry: "Ferritin: Female: 24–307 ng/mL; male: 24–336 ng/mL ",
    vitals: "Pulse rate",
    testDate: "28-Feb-2024",
    reports: "D734",
  },
  {
    id: 5278,
    patientName: "Jaime Lannister",
    age: 31,
    testName: "X-Ray",
    diagnosis: "Leg pain",
    biochemistry: "Glucose:70–99 mg/dL ",
    vitals: "Respiration rate",
    testDate: "13-Jan-2024",
    reports: "D956",
  },
  {
    id: 1678,
    patientName: "Arya Stark",
    age: 11,
    testName: "Flu Test",
    diagnosis: "Fever",
    biochemistry: "Inorganic phosphorous: 3-4.5 mg/dL ",
    vitals: "Blood pressure",
    testDate: "11-Mar-2024",
    reports: "D776",
  },
  {
    id: 2215,
    patientName: "Daenerys Targaryen",
    age: 26,
    testName: "Covid Test",
    diagnosis: "Covid",
    biochemistry: "Ionized calcium: 1.12–1.23 mmol/L",
    vitals: "Pulse rate",
    testDate: "12-May-2024",
    reports: "D429",
  },
  {
    id: 2468,
    patientName: "Arti Melisandre",
    age: 150,
    testName: "Liver Function Test",
    diagnosis: "Liver Cancer",
    biochemistry: "Glucose:70–99 mg/dL",
    vitals: "Blood pressure",
    testDate: "08-Feb-2024",
    reports: "D753",
  },
  {
    id: 7888,
    patientName: "Ferrara Clifford",
    age: 44,
    testName: "Respiratory Test",
    diagnosis: "Cough",
    biochemistry: "Inorganic phosphorous: 3-4.5 mg/dL ",
    vitals: "Respiration rate ",
    testDate: "19-Jan-2024",
    reports: "D962",
  },
  {
    id: 4250,
    patientName: "Rossini Frances",
    age: 36,
    testName: "Blood Test",
    diagnosis: "Headache",
    biochemistry: "Glucose:70–99 mg/dL",
    vitals: "Pulse rate",
    testDate: "16-Apr-2024",
    reports: "D471",
  },
  {
    id: 9812,
    patientName: "Harvey Roxie",
    age: 65,
    testName: "Blood Test",
    diagnosis: "Headache",
    biochemistry: "Glucose:70–99 mg/dL",
    vitals: "Body temperature",
    testDate: "18-Feb-2024",
    reports: "D850",
  },
];

const columns = [
  {
    field: "id",
    headerName: "Patient ID",
    type: "text",
    width: 120,
    headerClassName: "font-bold text-lg hover:text-2xl text-start ",
  },
  {
    field: "patientName",
    headerName: "Patient Name",
    type: "text",
    width: 250,
    headerClassName: "font-bold text-lg hover:text-2xl",
  },
  {
    field: "testName",
    headerName: "Test Name",
    type: "text",
    width: 200,
    headerClassName: "font-bold text-lg hover:text-2xl",
  },
  {
    field: "diagnosis",
    headerName: "Diagnosis",
    width: 200,
    headerClassName: "font-bold text-lg hover:text-2xl",
  },
  {
    field: "testDate",
    headerName: "Test Date",
    width: 150,
    headerClassName: "font-bold text-lg hover:text-2xl",
  },
  {
    field: "reports",
    headerName: "Reports",
    width: 100,
    headerClassName: "font-bold text-lg hover:text-2xl ",
    renderCell: (params) => (
      <div className="flex items-center justify-center text-blue-500 hover:text-blue-700">
        <span>{params.value}</span>
        <AiOutlineDownload
          className=" cursor-pointer text-2xl font-bold ml-2"
          onClick={() => handleDownloadReport(params.row)}
        />
      </div>
    ),
  },
];

const handleDownloadReport = (row) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text("Lab Report", 105, 15, { align: "center" });
  doc.setFontSize(10);
  doc.text("Harley Street Lab Services", 200, 10, {
    align: "right",
    text: "blue",
  });
  doc.setFontSize(12);
  doc.text(`Patient Name: ${row.patientName}`, 20, 30);
  doc.text(`Age: ${row.age}`, 20, 40);
  doc.text(`Test Name: ${row.testName}`, 20, 50);
  doc.text(`Diagnosis: ${row.diagnosis}`, 20, 60);
  doc.text(`Bio-chemistry: ${row.biochemistry}`, 20, 70);
  doc.text(`Vitals: ${row.vitals}`, 20, 80);
  doc.text(`Test Date: ${row.testDate}`, 20, 90);
  doc.text(`Report Code: ${row.reports}`, 20, 100);

  doc.save(`${row.patientName}_Report.pdf`);
};

export default function PatientsTable() {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState({});
  const [filteredRows, setFilteredRows] = React.useState(rows);
  const navigate = useNavigate();

  const handleRowSelection = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleRowClick = (params) => {
    navigate(`/patientdetails/${params.row.id}`);
  };

  const handleSearchTermChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({ ...searchTerm, [name]: value.toLowerCase() });
  };

  const handleSearch = () => {
    const filteredData = rows.filter((row) => {
      const testDateMatches = searchTerm.testDate
        ? new Date(row.testDate).toLocaleDateString("en-CA") ===
          searchTerm.testDate
        : true;
      return (
        row.id
          .toString()
          .toLowerCase()
          .includes(searchTerm.id || "") &&
        row.patientName.toLowerCase().includes(searchTerm.patientName || "") &&
        testDateMatches
      );
    });

    setFilteredRows(filteredData);
  };

  const handleReset = () => {
    setSearchTerm({});
    setFilteredRows(rows);
  };

  return (
    <div className="py-2 px-4 grid grid-cols-12 gap-4">
      <div className="mx-auto w-full col-span-4 bg-gray-100 p-4 rounded-lg shadow-md mt-4">
        <h2 className="font-bold text-xl mb-4">Results Search</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="patientId" className="font-medium text-lg">
              Patient ID
            </label>
            <input
              type="text"
              name="id"
              placeholder="Patient ID"
              value={searchTerm.id || ""}
              onChange={handleSearchTermChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="patientName" className="font-medium text-lg">
              Patient Name
            </label>
            <input
              type="text"
              name="patientName"
              placeholder="Patient Name"
              value={searchTerm.patientName || ""}
              onChange={handleSearchTermChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="testDate" className="font-medium text-lg">
              Test Date
            </label>
            <input
              type="date"
              name="testDate"
              value={searchTerm.testDate || ""}
              onChange={handleSearchTermChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
            >
              Reset
            </button>
          </div>
          {filteredRows.length === 0 && (
            <div className="mt-2 text-red-800 font-bold text-2xl">
              No matching records found
            </div>
          )}
        </div>
      </div>
      <div className="col-span-8 mt-4">
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
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={rowSelectionModel}
          onRowClick={handleRowClick}
          className="bg-gray-50 text-md py-1 pl-2"
          getRowClassName={(params) => "hover:bg-gray-100"}
        />
      </div>
    </div>
  );
}