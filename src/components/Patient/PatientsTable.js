// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { AiOutlineDownload } from "react-icons/ai";
// import { jsPDF } from "jspdf";
// import { useNavigate } from "react-router-dom";

// const rows = [
//   {
//     id: 4215,
//     patientName: "Jon Snow",
//     age: 14,
//     testName: "Blood Test",
//     diagnosis: "Headache",
//     biochemistry: "Blood urea nitrogen: 8–20 mg/dL ",
//     vitals: "Body Temperature",
//     testDate: "17-Apr-2024",
//     reports: "D756",
//   },
//   {
//     id: 4216,
//     patientName: "Cersei Lannister",
//     age: 31,
//     testName: "Covid Test",
//     diagnosis: "Cold",
//     biochemistry: "Ferritin: Female: 24–307 ng/mL; male: 24–336 ng/mL ",
//     vitals: "Pulse rate",
//     testDate: "28-Feb-2024",
//     reports: "D734",
//   },
//   {
//     id: 5278,
//     patientName: "Jaime Lannister",
//     age: 31,
//     testName: "X-Ray",
//     diagnosis: "Leg pain",
//     biochemistry: "Glucose:70–99 mg/dL ",
//     vitals: "Respiration rate",
//     testDate: "13-Jan-2024",
//     reports: "D956",
//   },
//   {
//     id: 1678,
//     patientName: "Arya Stark",
//     age: 11,
//     testName: "Flu Test",
//     diagnosis: "Fever",
//     biochemistry: "Inorganic phosphorous: 3-4.5 mg/dL ",
//     vitals: "Blood pressure",
//     testDate: "11-Mar-2024",
//     reports: "D776",
//   },
//   {
//     id: 2215,
//     patientName: "Daenerys Targaryen",
//     age: 26,
//     testName: "Covid Test",
//     diagnosis: "Covid",
//     biochemistry: "Ionized calcium: 1.12–1.23 mmol/L",
//     vitals: "Pulse rate",
//     testDate: "12-May-2024",
//     reports: "D429",
//   },
//   {
//     id: 2468,
//     patientName: "Arti Melisandre",
//     age: 150,
//     testName: "Liver Function Test",
//     diagnosis: "Liver Cancer",
//     biochemistry: "Glucose:70–99 mg/dL",
//     vitals: "Blood pressure",
//     testDate: "08-Feb-2024",
//     reports: "D753",
//   },
//   {
//     id: 7888,
//     patientName: "Ferrara Clifford",
//     age: 44,
//     testName: "Respiratory Test",
//     diagnosis: "Cough",
//     biochemistry: "Inorganic phosphorous: 3-4.5 mg/dL ",
//     vitals: "Respiration rate ",
//     testDate: "19-Jan-2024",
//     reports: "D962",
//   },
//   {
//     id: 4250,
//     patientName: "Rossini Frances",
//     age: 36,
//     testName: "Blood Test",
//     diagnosis: "Headache",
//     biochemistry: "Glucose:70–99 mg/dL",
//     vitals: "Pulse rate",
//     testDate: "16-Apr-2024",
//     reports: "D471",
//   },
//   {
//     id: 9812,
//     patientName: "Harvey Roxie",
//     age: 65,
//     testName: "Blood Test",
//     diagnosis: "Headache",
//     biochemistry: "Glucose:70–99 mg/dL",
//     vitals: "Body temperature",
//     testDate: "18-Feb-2024",
//     reports: "D850",
//   },
// ];

// const columns = [
//   {
//     field: "id",
//     headerName: "Patient ID",
//     type: "text",
//     width: 120,
//     headerClassName: "font-bold text-lg hover:text-2xl text-start ",
//   },
//   {
//     field: "patientName",
//     headerName: "Patient Name",
//     type: "text",
//     width: 250,
//     headerClassName: "font-bold text-lg hover:text-2xl",
//   },
//   {
//     field: "testName",
//     headerName: "Test Name",
//     type: "text",
//     width: 200,
//     headerClassName: "font-bold text-lg hover:text-2xl",
//   },
//   {
//     field: "diagnosis",
//     headerName: "Diagnosis",
//     width: 200,
//     headerClassName: "font-bold text-lg hover:text-2xl",
//   },
//   {
//     field: "testDate",
//     headerName: "Test Date",
//     width: 150,
//     headerClassName: "font-bold text-lg hover:text-2xl",
//   },
//   {
//     field: "reports",
//     headerName: "Reports",
//     width: 100,
//     headerClassName: "font-bold text-lg hover:text-2xl ",
//     renderCell: (params) => (
//       <div className="flex items-center justify-center text-blue-500 hover:text-blue-700">
//         <span>{params.value}</span>
//         <AiOutlineDownload
//           className=" cursor-pointer text-2xl font-bold ml-2"
//           onClick={() => handleDownloadReport(params.row)}
//         />
//       </div>
//     ),
//   },
// ];

// const handleDownloadReport = (row) => {
//   const doc = new jsPDF();
//   doc.setFontSize(20);
//   doc.text("Lab Report", 105, 15, { align: "center" });
//   doc.setFontSize(10);
//   doc.text("Harley Street Lab Services", 200, 10, {
//     align: "right",
//     text: "blue",
//   });
//   doc.setFontSize(12);
//   doc.text(`Patient Name: ${row.patientName}`, 20, 30);
//   doc.text(`Age: ${row.age}`, 20, 40);
//   doc.text(`Test Name: ${row.testName}`, 20, 50);
//   doc.text(`Diagnosis: ${row.diagnosis}`, 20, 60);
//   doc.text(`Bio-chemistry: ${row.biochemistry}`, 20, 70);
//   doc.text(`Vitals: ${row.vitals}`, 20, 80);
//   doc.text(`Test Date: ${row.testDate}`, 20, 90);
//   doc.text(`Report Code: ${row.reports}`, 20, 100);

//   doc.save(`${row.patientName}_Report.pdf`);
// };

// export default function PatientsTable() {
//   const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
//   const [searchTerm, setSearchTerm] = React.useState({});
//   const [filteredRows, setFilteredRows] = React.useState(rows);
//   const navigate = useNavigate();

//   const handleRowSelection = (newRowSelectionModel) => {
//     setRowSelectionModel(newRowSelectionModel);
//   };

//   const handleRowClick = (params) => {
//     navigate(`/patientdetails/${params.row.id}`);
//   };

//   const handleSearchTermChange = (event) => {
//     const { name, value } = event.target;
//     setSearchTerm({ ...searchTerm, [name]: value.toLowerCase() });
//   };

//   const handleSearch = () => {
//     const filteredData = rows.filter((row) => {
//       const testDateMatches = searchTerm.testDate
//         ? new Date(row.testDate).toLocaleDateString("en-CA") ===
//           searchTerm.testDate
//         : true;
//       return (
//         row.id
//           .toString()
//           .toLowerCase()
//           .includes(searchTerm.id || "") &&
//         row.patientName.toLowerCase().includes(searchTerm.patientName || "") &&
//         testDateMatches
//       );
//     });

//     setFilteredRows(filteredData);
//   };

//   const handleReset = () => {
//     setSearchTerm({});
//     setFilteredRows(rows);
//   };

//   return (
//     <div className="py-2 px-4 grid grid-cols-12 gap-4">
//       <div className="mx-auto w-full col-span-4 bg-gray-100 p-4 rounded-lg shadow-md mt-4">
//         <h2 className="font-bold text-xl mb-4">Results Search</h2>
//         <div className="space-y-4">
//           <div className="flex flex-col">
//             <label htmlFor="patientId" className="font-medium text-lg">
//               Patient ID
//             </label>
//             <input
//               type="text"
//               name="id"
//               placeholder="Patient ID"
//               value={searchTerm.id || ""}
//               onChange={handleSearchTermChange}
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="patientName" className="font-medium text-lg">
//               Patient Name
//             </label>
//             <input
//               type="text"
//               name="patientName"
//               placeholder="Patient Name"
//               value={searchTerm.patientName || ""}
//               onChange={handleSearchTermChange}
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="testDate" className="font-medium text-lg">
//               Test Date
//             </label>
//             <input
//               type="date"
//               name="testDate"
//               value={searchTerm.testDate || ""}
//               onChange={handleSearchTermChange}
//               className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
//             />
//           </div>
//           <div className="flex space-x-2">
//             <button
//               onClick={handleSearch}
//               className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
//             >
//               Search
//             </button>
//             <button
//               onClick={handleReset}
//               className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
//             >
//               Reset
//             </button>
//           </div>
//           {filteredRows.length === 0 && (
//             <div className="mt-2 text-red-800 font-bold text-2xl">
//               No matching records found
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="col-span-8 mt-4">
//         <DataGrid
//           rows={filteredRows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 pageSize: 15,
//               },
//             },
//           }}
//           pageSizeOptions={[15]}
//           onRowSelectionModelChange={handleRowSelection}
//           rowSelectionModel={rowSelectionModel}
//           onRowClick={handleRowClick}
//           className="bg-gray-50 text-md py-1 pl-2"
//           getRowClassName={(params) => "hover:bg-gray-100"}
//         />
//       </div>
//     </div>
//   );
// }

































// 77777777777777777777777777777777777777777777777






import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDownload } from "react-icons/ai";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Sample patient data
const patientData = [
  {
    mrn: "MRN001",
    patient_identifier_list: "ID001",
    patient_name: "John Doe",
    date_of_birth: "1980-05-20",
    sex: "M",
    race: "White",
    address: "123 Main St",
    phone_number: "555-1234",
    ssn: "123-45-6789",
    ethnic_group: "Non-Hispanic",
    death_indicator: "N",
    test_name: "Blood Test",
    test_date: "2023-06-01",
  },
  {
    mrn: "MRN002",
    patient_identifier_list: "ID002",
    patient_name: "Jane Smith",
    date_of_birth: "1990-07-15",
    sex: "F",
    race: "Asian",
    address: "456 Oak St",
    phone_number: "555-5678",
    ssn: "987-65-4321",
    ethnic_group: "Non-Hispanic",
    death_indicator: "N",
    test_name: "ECG",
    test_date: "2023-06-10",
  },
  {
    mrn: "MRN003",
    patient_identifier_list: "ID003",
    patient_name: "Alice Johnson",
    date_of_birth: "1975-03-30",
    sex: "F",
    race: "Black",
    address: "789 Pine St",
    phone_number: "555-9012",
    ssn: "234-56-7890",
    ethnic_group: "Hispanic",
    death_indicator: "N",
    test_name: "X-Ray",
    test_date: "2023-06-15",
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
  doc.text(`Patient Name: ${row.patient_name}`, 20, 30);
  doc.text(`Date of Birth: ${row.date_of_birth}`, 20, 40);
  doc.text(`Sex: ${row.sex}`, 20, 50);
  doc.text(`Race: ${row.race}`, 20, 60);
  doc.text(`Address: ${row.address}`, 20, 70);
  doc.text(`Phone Number: ${row.phone_number}`, 20, 80);
  doc.text(`SSN: ${row.ssn}`, 20, 90);
  doc.text(`Ethnic Group: ${row.ethnic_group}`, 20, 100);
  doc.text(`Death Indicator: ${row.death_indicator}`, 20, 110);
  doc.text(`Test Name: ${row.test_name}`, 20, 120);
  doc.text(`Test Date: ${row.test_date}`, 20, 130);

  doc.save(`${row.patient_name}_Report.pdf`);
};

export default function PatientsTable() {
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState({});
  const [rows, setRows] = React.useState([]);
  const [filteredRows, setFilteredRows] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // set your loading state true

        const response = await new Promise((res, rej) => res(patientData));
        console.log("response", response);
        setRows(response);
        setFilteredRows(response);
      } catch (error) {
        console.log(error);
      } finally {
        // set your loading state false
      }
    };
    getData();
  }, []);

  const handleRowSelection = (newRowSelectionModel) => {
    setRowSelectionModel(newRowSelectionModel);
  };

  const handleRowClick = (params) => {
    navigate(`/patientdetails/${params.row.mrn}`);
  };

  const handleSearchTermChange = (event) => {
    const { name, value } = event.target;
    setSearchTerm({ ...searchTerm, [name]: value });
  };

  const handleSearch = () => {
    const filteredData = rows.filter((row) => {
      const testDateMatches = searchTerm.test_date
        ? row.test_date === searchTerm.test_date
        : true;
      return (
        row.mrn.toLowerCase().includes((searchTerm.mrn || "").toLowerCase()) &&
        row.patient_name.toLowerCase().includes((searchTerm.patient_name || "").toLowerCase()) &&
        testDateMatches
      );
    });

    setFilteredRows(filteredData);
  };

  const handleReset = () => {
    setSearchTerm({});
    setFilteredRows(rows);
  };

  const columns = [
    { field: 'mrn', headerName: 'Patient ID', width: 200, headerClassName: "font-bold text-lg hover:text-2xl" },
    { field: 'patient_name', headerName: 'Patient Name', width: 250, headerClassName: "font-bold text-lg hover:text-2xl" },
    { field: 'test_name', headerName: 'Test Name', width: 200, headerClassName: "font-bold text-lg hover:text-2xl" },
    { field: 'test_date', headerName: 'Test Date', width: 200, headerClassName: "font-bold text-lg hover:text-2xl" },
    {
      field: 'patient_identifier_list', headerName: 'Details', width: 150, headerClassName: "font-bold text-lg hover:text-2xl", renderCell: (params) => (
        <div className="flex items-center text-blue-500 hover:text-blue-700 text-left">
          <span className="text-left">{params.value}</span>
          <AiOutlineDownload
            className="cursor-pointer text-2xl font-bold ml-2"
            onClick={() => handleDownloadReport(params.row)}
          />
        </div>
      )
    }
  ];

  return (
    <div className="py-2 px-4 grid grid-cols-12 gap-4">
      <div className="mx-auto w-full col-span-4 bg-gray-100 p-4 rounded-lg shadow-md mt-4">
        <h2 className="font-bold text-xl mb-4">Results Search</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="mrn" className="font-medium text-lg">MRN</label>
            <input
              type="text"
              name="mrn"
              placeholder="MRN"
              value={searchTerm.mrn || ""}
              onChange={handleSearchTermChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="patient_name" className="font-medium text-lg">Patient Name</label>
            <input
              type="text"
              name="patient_name"
              placeholder="Patient Name"
              value={searchTerm.patient_name || ""}
              onChange={handleSearchTermChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="test_date" className="font-medium text-lg">Test Date</label>
            <input
              type="date"
              name="test_date"
              placeholder=""
              value={searchTerm.test_date || ""}
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
          getRowId={(row) => row.mrn}
        />
      </div>
    </div>
  );
}