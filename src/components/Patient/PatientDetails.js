// import * as React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import { IoIosArrowRoundBack } from "react-icons/io";

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

// export default function PatientDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const patient = rows.find((row) => row.id.toString() === id);
//   const [showTooltip, setShowTooltip] = React.useState(false);

//   if (!patient) {
//     return <h4>Patient not found</h4>;
//   }

//   return (
//     <div className="flex items-center justify-center h-[85vh]">
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 relative ">
//         <div className="flex items-center mb-4">
//           <IoIosArrowRoundBack
//             size={28}
//             className="cursor-pointer text-gray-500 hover:text-gray-900 mr-2"
//             onClick={() => navigate(-1)}
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           />
//            {showTooltip && (
//             <div className="absolute bg-gray-500 text-white text-xs py-1 px-2 rounded-md mt-10">
//              Back to Patient's Table
//             </div>
//           )}
//         </div>
//         <div className="text-xl">
//         <h2 className="text-3xl font-bold mb-6">Patient's Information</h2>
//           <p className="mb-4">
//             <strong>Patient Name:</strong> {patient.patientName}
//           </p>
//           <p className="mb-4">
//             <strong>Age:</strong> {patient.age}
//           </p>
//           <p className="mb-4">
//             <strong>Test Name:</strong> {patient.testName}
//           </p>
//           <p className="mb-4">
//             <strong>Diagnosis:</strong> {patient.diagnosis}
//           </p>
//           <p className="mb-4">
//             <strong>Bio-chemistry:</strong> {patient.biochemistry}
//           </p>
//           <p className="mb-4">
//             <strong>Vitals:</strong> {patient.vitals}
//           </p>
//           <p className="mb-4">
//             <strong>Test Date:</strong> {patient.testDate}
//           </p>
//           <p className="mb-6">
//             <strong>Report Code:</strong> {patient.reports}
//           </p>
//           <button
//             className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 text-lg"
//             onClick={() => handleDownloadReport(patient)}
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }















// 77777777777777777777777777777777777777777777777









// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import axios from "axios";
// import { IoIosArrowRoundBack } from "react-icons/io";

// const PatientDetails = () => {
//   const { mrn } = useParams(); // Assuming MRN is passed as a URL parameter
//   const navigate = useNavigate();
//   const [patient, setPatient] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     const fetchPatient = async () => {
//       try {
//         const response = await axios.get(`/patient/${mrn}`); // Replace with your actual API endpoint
//         setPatient(response.data); // Assuming response.data matches the structure you provided
//         setLoading(false);
//       } catch (error) {
//         setError("Patient not found"); // Handle error appropriately
//         setLoading(false);
//       }
//     };

//     fetchPatient();
//   }, [mrn]);

//   const handleDownloadReport = () => {
//     const doc = new jsPDF();
//     doc.setFontSize(20);
//     doc.text("Lab Report", 105, 15, { align: "center" });
//     doc.setFontSize(10);
//     doc.text("Harley Street Lab Services", 200, 10, {
//       align: "right",
//       text: "blue",
//     });
//     if (patient) {
//       doc.setFontSize(12);
//       doc.text(`Patient Name: ${patient.patient_name}`, 20, 30);
//       doc.text(`Date of Birth: ${patient.date_of_birth}`, 20, 40);
//       doc.text(`Sex: ${patient.sex}`, 20, 50);
//       doc.text(`Race: ${patient.race}`, 20, 60);
//       doc.text(`Address: ${patient.address}`, 20, 70);
//       doc.text(`Phone Number: ${patient.phone_number}`, 20, 80);
//       doc.text(`SSN: ${patient.ssn}`, 20, 90);
//       doc.text(`Ethnic Group: ${patient.ethnic_group}`, 20, 100);
//       doc.text(`Death Indicator: ${patient.death_indicator}`, 20, 110);
//       doc.text(`Test Name: ${patient.test_name}`, 20, 120); // Assuming test_name is available directly
//       doc.text(`Test Date: ${patient.test_date}`, 20, 130); // Assuming test_date is available directly
//     }

//     doc.save(`${patient.patient_name}_Report.pdf`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <h4>{error}</h4>;
//   }

//   if (!patient) {
//     return <h4>Patient not found</h4>;
//   }

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 relative">
//         <div className="flex items-center mb-4">
//           <IoIosArrowRoundBack
//             size={28}
//             className="cursor-pointer text-gray-500 hover:text-gray-900 mr-2"
//             onClick={() => navigate(-1)}
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           />
//           {showTooltip && (
//             <div className="absolute bg-gray-700 text-white text-xs py-1 px-2 rounded-md mt-8 ml-2">
//               Back to Patient's Table
//             </div>
//           )}
//         </div>
//         <div className="text-xl">
//           <h2 className="text-3xl font-bold mb-6">Patient's Information</h2>
//           <p className="mb-2">
//             <strong>Patient Name:</strong> {patient.patient_name}
//           </p>
//           <p className="mb-2">
//             <strong>Date of Birth:</strong> {patient.date_of_birth}
//           </p>
//           <p className="mb-2">
//             <strong>Sex:</strong> {patient.sex}
//           </p>
//           <p className="mb-2">
//             <strong>Race:</strong> {patient.race}
//           </p>
//           <p className="mb-2">
//             <strong>Address:</strong> {patient.address}
//           </p>
//           <p className="mb-2">
//             <strong>Phone Number:</strong> {patient.phone_number}
//           </p>
//           <p className="mb-2">
//             <strong>SSN:</strong> {patient.ssn}
//           </p>
//           <p className="mb-2">
//             <strong>Ethnic Group:</strong> {patient.ethnic_group}
//           </p>
//           <p className="mb-2">
//             <strong>Death Indicator:</strong> {patient.death_indicator}
//           </p>
//           <p className="mb-2">
//             <strong>Test Name:</strong> {patient.test_name}
//           </p>
//           <p className="mb-2">
//             <strong>Test Date:</strong> {patient.test_date}
//           </p>
//           <button
//             className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 text-lg"
//             onClick={handleDownloadReport}
//           >
//             Download PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientDetails;


// **************************************







import React,{useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { IoIosArrowRoundBack } from "react-icons/io";

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
    test_date: "2023-06-01 "
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
    test_date: "2023-06-10 "
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
    test_date: "2023-06-15 "
  }
];

const PatientDetails = () => {
  const {mrn} = useParams(); // Assuming MRN is passed as a URL parameter
  const navigate = useNavigate();
  const patient = patientData.find(patient => patient.mrn === mrn);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleDownloadReport = () => {
    if (patient) {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Lab Report", 105, 15, { align: "center" });
      doc.setFontSize(10);
      doc.text("Harley Street Lab Services", 200, 10, {
        align: "right",
        text: "blue",
      });
      doc.setFontSize(12);
      doc.text(`Patient Name: ${patient.patient_name}`, 20, 30);
      doc.text(`Date of Birth: ${patient.date_of_birth}`, 20, 40);
      doc.text(`Sex: ${patient.sex}`, 20, 50);
      doc.text(`Race: ${patient.race}`, 20, 60);
      doc.text(`Address: ${patient.address}`, 20, 70);
      doc.text(`Phone Number: ${patient.phone_number}`, 20, 80);
      doc.text(`SSN: ${patient.ssn}`, 20, 90);
      doc.text(`Ethnic Group: ${patient.ethnic_group}`, 20, 100);
      doc.text(`Death Indicator: ${patient.death_indicator}`, 20, 110);
      doc.text(`Test Name: ${patient.test_name}`, 20, 120);
      doc.text(`Test Date: ${patient.test_date}`, 20, 130);

      doc.save(`${patient.patient_name}_Report.pdf`);
    }
  };

  if (!patient) {
    return <h4>Patient not found</h4>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex items-center mb-4">
          <IoIosArrowRoundBack
            size={28}
            className="cursor-pointer text-gray-500 hover:text-gray-900 mr-2"
            onClick={() => navigate(-1)}
            onMouseEnter={() => setShowTooltip(true)}
             onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
           <div className="absolute bg-gray-500 text-white text-xs py-1 px-2 rounded-md mt-8 ml-2">
             Back to Patient's Table
           </div>
         )}
        </div>
        <div className="text-xl">
          <h2 className="text-3xl font-bold mb-6">Patient's Information</h2>
          <p className="mb-2">
            <strong>Patient Name:</strong> {patient.patient_name}
          </p>
          <p className="mb-2">
            <strong>Date of Birth:</strong> {patient.date_of_birth}
          </p>
          <p className="mb-2">
            <strong>Sex:</strong> {patient.sex}
          </p>
          <p className="mb-2">
            <strong>Race:</strong> {patient.race}
          </p>
          <p className="mb-2">
            <strong>Address:</strong> {patient.address}
          </p>
          <p className="mb-2">
            <strong>Phone Number:</strong> {patient.phone_number}
          </p>
          <p className="mb-2">
            <strong>SSN:</strong> {patient.ssn}
          </p>
          <p className="mb-2">
            <strong>Ethnic Group:</strong> {patient.ethnic_group}
          </p>
          <p className="mb-2">
            <strong>Death Indicator:</strong> {patient.death_indicator}
          </p>
          <p className="mb-2">
            <strong>Test Name:</strong> {patient.test_name}
          </p>
          <p className="mb-2">
            <strong>Test Date:</strong> {patient.test_date}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 text-lg"
            onClick={handleDownloadReport}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;