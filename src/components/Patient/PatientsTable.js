
import React, { useState,useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineDownload } from "react-icons/ai";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [searchTerm, setSearchTerm] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] =useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // Set your loading state true if needed

        // Replace 'clinic_name' with the actual clinic name you want to use
        const clinicName = 'Harley Streets';
        const response = await axios.get(`http://35.178.63.129:8000/patients/${clinicName}`);
        console.log("response", response.data);
        setRows(response.data);
        setFilteredRows(response.data);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Server responded with an error:", error.response.data);
          console.error("Status code:", error.response.status);
          console.error("Headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error in setting up the request:", error.message);
        }
        console.error("Config:", error.config);
      } finally {
        // Set your loading state false if needed
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
  const handleDateChange = (date) => {
    setSearchTerm({
      ...searchTerm,
      test_date: date,
    });
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
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200 w-full"
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
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200 w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="test_date" className="font-medium text-lg">Test Date</label>
            {/* <input
              type="date"
              name="test_date"
                placeholder="yyyy-mm-dd"
              // value={searchTerm.test_date || ""}
              onChange={handleSearchTermChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200"
            /> */}
             <DatePicker
            selected={searchTerm.test_date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="yyyy-mm-dd"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-gray-200 w-full"
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