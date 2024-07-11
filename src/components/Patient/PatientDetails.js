// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import axios from "axios";

// const PatientDetails = () => {
//   const { mrn } = useParams(); // Assuming MRN is passed as a URL parameter
//   const navigate = useNavigate();
//   const [patientData, setPatientData] = useState(null);
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const response = await axios.get(
//           `http://35.178.63.129:8000/patient/${mrn}`
//         );
//         setPatientData(response.data);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//       }
//     };

//     fetchPatientData();
//   }, [mrn]);

//   const handleDownloadReport = () => {
//     if (patientData) {
//       const {
//         patient,
//         results,
//         visits,
//         orders,
//         order_details,
//         diagnosis,
//         specimens,
//         reports,
//       } = patientData;
//       const doc = new jsPDF({
//         orientation: "portrait",
//         unit: "mm",
//         format: "a4",
//       });
//       let yPos = 10;
//       // Get the current date and time
//       const now = new Date();
//       const date = now.toLocaleDateString("en-GB");
//       const time = now.toLocaleTimeString("en-GB", {
//         hour: "2-digit",
//         minute: "2-digit",
//       });

//       const addHeader = () => {
//         doc.setTextColor("black");
//         doc.addImage("../images/testtubelogo.png", "PNG", 10, 10, 30, 10);
//         doc.setTextColor("black");
//         doc.setFontSize(20);
//         doc.text("Lab Report", 105, yPos, { align: "center" });
//         yPos += 20;
//         doc.setFontSize(10);
//         doc.text("Harley Street Lab Services", 200, 10, {
//           align: "right",
//           textColor: "blue",
//         });

//         doc.setFontSize(12);
//         doc.setFont("helvetica", "bold");
//         doc.text("PATIENT", 10, yPos);
//         yPos += 2;
//         doc.line(10, yPos, 200, yPos); // Draw a line under the headers
//         yPos += 8; // Adding a small gap

//         // Adding Patient Details
//         doc.setFontSize(10);
//         const patientName = doc.splitTextToSize(`Patient Name: ${patient.patient_name}`, 60);
//         const address = doc.splitTextToSize(`Address: ${patient.address}`, 60);
//         doc.text(patientName, 10, yPos, true, false);
//         doc.text(address, 70, yPos, true, false);
//         doc.text(
//           `Ethnic Group: ${patient.ethnic_group}`,
//           140,
//           yPos,
//           true,
//           false
//         );
//         yPos += Math.max(patientName.length, address.length) * 6;

//         doc.text(`Date of Birth: ${patient.date_of_birth}`, 10, yPos, true, false);
//         doc.text(`Phone Number: ${patient.phone_number}`, 70, yPos, true, false);
//         doc.text(
//           `Death Indicator: ${patient.death_indicator}`,
//           140,
//           yPos,
//           true,
//           false
//         );
//         yPos += 6;

//         doc.text(`Sex: ${patient.sex}`, 10, yPos, true, false);
//         doc.text(`SSN: ${patient.ssn}`, 70, yPos, true, false);

//         yPos += 8; // Adding a small gap
//         doc.line(10, yPos, 200, yPos); // Draw a line under the headers
//         yPos += 8; // Adding a small gap
//       };

//       const addFooter = () => {
//         const pages = doc.internal.getNumberOfPages();
//         const pageHeight = doc.internal.pageSize.height;
//         for (let i = 1; i <= pages; i++) {
//           doc.setPage(i);
//           doc.setFontSize(10);
//           doc.text(`Date and Time of Report: ${date}, ${time}`, 10, pageHeight - 10, { align: "left" });
//           doc.text(`Page ${i} of ${pages}`, 200, pageHeight - 10, { align: "right" });
//         }
//       };

//       const addPageIfNecessary = () => {
//         if (yPos > 250) {
//           doc.addPage();
//           yPos = 10;
//           addHeader(); // Add header on new page
//         }
//       };

//       addHeader();

//       // Function to add a single column row
//       const addSingleColumnRow = (label, value, unit = "", isHeader = false) => {
//         doc.setFontSize(12);
//         const labelWidth = 60; // Adjust as needed based on your layout
//         const valueWidth = 60; // Adjust as needed based on your layout
//         const unitWidth = 60; // Adjust as needed based on your layout

//         if (label === "Test" || label === "Units" || label === "Reference Range:") {
//           doc.setFillColor(210, 210, 210); // Gray color for background
//           doc.rect(10, yPos - 6, 190, 8, "F"); // Draw background rect behind the header text
//         }

//         if (isHeader) {
//           doc.setTextColor("gray"); // Gray color for headers
//           doc.setFont("helvetica", "bold");
//           doc.text(label, 12, yPos, { align: "left", maxWidth: labelWidth });
//           doc.text(value, 72, yPos, { align: "left", maxWidth: valueWidth });
//           doc.text(unit, 142, yPos, { align: "left", maxWidth: unitWidth });
//         } else {
//           doc.setTextColor("black"); // Black color for values
//           doc.setFont("helvetica", "normal");
//           doc.text(label, 12, yPos, { align: "left", maxWidth: labelWidth });
//           doc.text(value, 72, yPos, { align: "left", maxWidth: valueWidth });
//           doc.text(unit, 142, yPos, { align: "left", maxWidth: unitWidth });
//         }
//         yPos += 8;
//       };

//       // Adding Visits
//       visits.forEach((visit, index) => {
//         addPageIfNecessary();
//         doc.setFontSize(14);
//         doc.text(`Visit ${index + 1}:`, 10, yPos);
//         yPos += 6;
//         addSingleColumnRow("Clinic Name:", visit.clinic_name);
//         addSingleColumnRow("Patient Class:", visit.patient_class);
//         addSingleColumnRow("Assigned Location:", visit.assigned_location);
//         addSingleColumnRow("Attending Doctor:", visit.attending_doctor);
//         addSingleColumnRow("Hospital Service:", visit.hospital_service);
//         addSingleColumnRow("Patient Type:", visit.patient_type);
//         addSingleColumnRow("Admit Date Time:", visit.admit_date_time);
//         addSingleColumnRow("Discharge Date Time:", visit.discharge_date_time);
//         yPos += 6;
//       });

//       // Adding Orders
//       orders.forEach((order, index) => {
//         addPageIfNecessary();
//         doc.setFontSize(14);
//         doc.text(`Order ${index + 1}:`, 10, yPos);
//         yPos += 6;
//         addSingleColumnRow("Clinic Name:", order.clinic_name);
//         addSingleColumnRow("Order Control:", order.order_control);
//         addSingleColumnRow("Placer Order Number:", order.placer_order_number);
//         addSingleColumnRow("Filler Order Number:", order.filler_order_number);
//         addSingleColumnRow("Transaction Date Time:", order.transaction_date_time);
//         addSingleColumnRow("Ordering Provider:", order.ordering_provider);
//         yPos += 6;
//       });

//       // Combine order_details and results arrays
//       const combinedData = order_details.map((detail, index) => ({
//         ...detail,
//         result: results ? results[index] : {}, // Handle undefined results
//       }));

//       // Adding combined Order Details and Results
//       combinedData.forEach((data, index) => {
//         addPageIfNecessary();
//         const correspondingResult = data.result || {};

//         doc.setFontSize(14);
//         doc.text(`Order Detail ${index + 1}:`, 10, yPos);
//         yPos += 8;
//         addSingleColumnRow(correspondingResult.test_name || "", "");
//         addSingleColumnRow("Collection Date Time:", data.collection_date_time);
//         yPos += 2;
//         addSingleColumnRow("Test", "Units", "Reference Range:"); // Header for Reference Range

//         Object.keys(correspondingResult.data || {}).forEach((key) => {
//           const { value, unit, reference_range } = correspondingResult.data[key] || {};
//           addSingleColumnRow(`${key}:`, `${value || ""} ${unit || ""}`, `(${reference_range || ""})`);
//         });
//         yPos += 6;
//       });

//       // Adding Diagnosis
//       diagnosis.forEach((diag, index) => {
//         addPageIfNecessary();
//         doc.setFontSize(14);
//         doc.text(`Diagnosis ${index + 1}:`, 10, yPos);
//         yPos += 6;
//         addSingleColumnRow("Diagnosis Code:", diag.diagnosis_code);
//         addSingleColumnRow("Diagnosis Description:", diag.diagnosis_description);
//         addSingleColumnRow("Diagnosis Date:", diag.diagnosis_date);
//         yPos += 6;
//       });

//       // Adding Specimens
//       specimens.forEach((specimen, index) => {
//         addPageIfNecessary();
//         doc.setFontSize(14);
//         doc.text(`Specimen ${index + 1}:`, 10, yPos);
//         yPos += 6;
//         addSingleColumnRow("Specimen Type:", specimen.specimen_type);
//         addSingleColumnRow("Collection Date Time:", specimen.collection_date_time);
//         yPos += 6;
//       });

//       // Adding Reports
//       reports.forEach((report, index) => {
//         addPageIfNecessary();
//         doc.setFontSize(14);
//         doc.text(`Report ${index + 1}:`, 20, yPos);
//         yPos += 6;
//         addSingleColumnRow("Report Name:", report.report_name);
//         addSingleColumnRow("Report Type:", report.report_type);
//         addSingleColumnRow("Report Date:", report.report_date);
//         yPos += 6;
//       });

//       addFooter(); // Call the footer function to add date and time to the bottom left of each page
//       doc.save(`${patient.patient_name}_Report.pdf`);
//     }
//   };

//   if (!patientData) {
//     return <h4>Patient not found</h4>;
//   }

//   const {
//     patient,
//     results,
//     visits,
//     orders,
//     order_details,
//     diagnosis,
//     specimens,
//     reports,
//   } = patientData;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden my-2">
//       <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-8 relative">
//         <div className="flex items-center mb-6">
//           <IoIosArrowRoundBack
//             size={28}
//             className="cursor-pointer text-gray-500 hover:text-gray-900 mr-2"
//             onClick={() => navigate(-1)}
//             onMouseEnter={() => setShowTooltip(true)}
//             onMouseLeave={() => setShowTooltip(false)}
//           />
//           {showTooltip && (
//             <div className="absolute bg-gray-500 text-white text-xs py-1 px-2 rounded-md mt-8 ml-2">
//               Back to Patient's Table
//             </div>
//           )}
//         </div>
//         <div className="text-xl">
//           <h2 className="text-3xl font-bold mb-6">Patient's Information</h2>
//           <div className="grid grid-cols-3 gap-6 mb-6">
//             <div>
//               <p>
//                 <strong>Patient Name:</strong> {patient.patient_name}
//               </p>
//               <p>
//                 <strong>Date of Birth:</strong> {patient.date_of_birth}
//               </p>
//               <p>
//                 <strong>Sex:</strong> {patient.sex}
//               </p>
//             </div>
//             <div>
//               <p>
//                 <strong>Race:</strong> {patient.race}
//               </p>
//               <p>
//                 <strong>Address:</strong> {patient.address}
//               </p>
//               <p>
//                 <strong>Phone Number:</strong> {patient.phone_number}
//               </p>
//             </div>
//             <div>
//               <p>
//                 <strong>SSN:</strong> {patient.ssn}
//               </p>
//               <p>
//                 <strong>Ethnic Group:</strong> {patient.ethnic_group}
//               </p>
//               <p>
//                 <strong>Death Indicator:</strong> {patient.death_indicator}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {visits.map((visit, index) => (
//               <div key={index}>
//                 <h3 className="text-lg font-bold mb-2">Visit {index + 1}</h3>
//                 <p>
//                   <strong>Clinic Name:</strong> {visit.clinic_name}
//                 </p>
//                 <p>
//                   <strong>Patient Class:</strong> {visit.patient_class}
//                 </p>
//                 <p>
//                   <strong>Assigned Location:</strong> {visit.assigned_location}
//                 </p>
//                 <p>
//                   <strong>Attending Doctor:</strong> {visit.attending_doctor}
//                 </p>
//                 <p>
//                   <strong>Hospital Service:</strong> {visit.hospital_service}
//                 </p>
//                 <p>
//                   <strong>Patient Type:</strong> {visit.patient_type}
//                 </p>
//                 <p>
//                   <strong>Admit Date Time:</strong> {visit.admit_date_time}
//                 </p>
//                 <p>
//                   <strong>Discharge Date Time:</strong>{" "}
//                   {visit.discharge_date_time}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-2">
//             <div className=" mb-6">
//               {orders.map((order, index) => (
//                 <div key={index}>
//                   <h3 className="text-lg font-bold mb-2">Order {index + 1}</h3>
//                   <p>
//                     <strong>Clinic Name:</strong> {order.clinic_name}
//                   </p>
//                   <p>
//                     <strong>Order Control:</strong> {order.order_control}
//                   </p>
//                   <p>
//                     <strong>Placer Order Number:</strong>{" "}
//                     {order.placer_order_number}
//                   </p>
//                   <p>
//                     <strong>Filler Order Number:</strong>{" "}
//                     {order.filler_order_number}
//                   </p>
//                   <p>
//                     <strong>Transaction Date Time:</strong>{" "}
//                     {order.transaction_date_time}
//                   </p>
//                   <p>
//                     <strong>Ordering Provider:</strong>{" "}
//                     {order.ordering_provider}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className=" mb-6">
//               {order_details.map((detail, index) => (
//                 <div key={index}>
//                   <h3 className="text-lg font-bold mb-2">
//                     Order Detail {index + 1}
//                   </h3>
//                   <p>
//                     <strong>Test Name:</strong> {detail.test_name}
//                   </p>
//                   <p>
//                     <strong>Collection Date Time:</strong>{" "}
//                     {detail.collection_date_time}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {results.map((result, index) => (
//               <div key={index}>
//                 <h3 className="text-lg font-bold mb-2">Result {index + 1}</h3>
//                 <p>
//                   <strong>Test Name:</strong> {result.test_name}
//                 </p>
//                 <ul>
//                   {Object.keys(result.data).map((key, dataIndex) => (
//                     <li key={dataIndex}>
//                       <strong>{key}:</strong> {result.data[key].value}{" "}
//                       {result.data[key].unit} (Reference Range:{" "}
//                       {result.data[key].reference_range})
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {diagnosis.map((diag, index) => (
//               <div key={index}>
//                 <h3 className="text-lg font-bold mb-2">
//                   Diagnosis {index + 1}
//                 </h3>
//                 <p>
//                   <strong>Diagnosis Code:</strong> {diag.diagnosis_code}
//                 </p>
//                 <p>
//                   <strong>Diagnosis Description:</strong>{" "}
//                   {diag.diagnosis_description}
//                 </p>
//                 <p>
//                   <strong>Diagnosis Date:</strong> {diag.diagnosis_date}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {specimens.map((specimen, index) => (
//               <div key={index}>
//                 <h3 className="text-lg font-bold mb-2">Specimen {index + 1}</h3>
//                 <p>
//                   <strong>Specimen Type:</strong> {specimen.specimen_type}
//                 </p>
//                 <p>
//                   <strong>Collection Date Time:</strong>{" "}
//                   {specimen.collection_date_time}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-2 gap-6 mb-6">
//             {reports.map((report, index) => (
//               <div key={index}>
//                 <h3 className="text-lg font-bold mb-2">Report {index + 1}</h3>
//                 <p>
//                   <strong>Report Name:</strong> {report.report_name}
//                 </p>
//                 <p>
//                   <strong>Report Type:</strong> {report.report_type}
//                 </p>
//                 <p>
//                   <strong>Report Date:</strong> {report.report_date}
//                 </p>
//               </div>
//             ))}
//           </div>

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

// *******************************************************

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

const PatientDetails = () => {
  const { mrn } = useParams(); // Assuming MRN is passed as a URL parameter
  const navigate = useNavigate();
  const [patientData, setPatientData] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `http://35.178.63.129:8000/patient/${mrn}`
        );
        setPatientData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [mrn]);

  const handleDownloadReport = () => {
    if (patientData) {
      const {
        patient,
        results,
        visits,
        orders,
        order_details,
        diagnosis,
        specimens,
        reports,
      } = patientData;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      let yPos = 10;
      // Get the current date and time
      const now = new Date();
      const date = now.toLocaleDateString("en-GB");
      const time = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const addHeader = () => {
        doc.setTextColor("black");
        doc.addImage("../images/testtubelogo.png", "PNG", 10, 10, 30, 10);
        doc.setTextColor("black");
        doc.setFontSize(20);
        doc.text("Lab Report", 105, yPos, { align: "center" });
        yPos += 20;
        doc.setFontSize(10);
        doc.text("Harley Street Lab Services", 200, 10, {
          align: "right",
          textColor: "blue",
        });

        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("PATIENT", 10, yPos);
        yPos += 2;
        doc.line(10, yPos, 200, yPos); // Draw a line under the headers
        yPos += 8; // Adding a small gap

        // Adding Patient Details
        doc.setFontSize(10);
        const patientName = doc.splitTextToSize(
          `Patient Name: ${patient.patient_name}`,
          60
        );
        const address = doc.splitTextToSize(`Address: ${patient.address}`, 60);
        doc.text(patientName, 10, yPos, true, false);
        doc.text(address, 70, yPos, true, false);
        doc.text(
          `Ethnic Group: ${patient.ethnic_group}`,
          140,
          yPos,
          true,
          false
        );
        yPos += Math.max(patientName.length, address.length) * 6;

        doc.text(
          `Date of Birth: ${patient.date_of_birth}`,
          10,
          yPos,
          true,
          false
        );
        doc.text(
          `Phone Number: ${patient.phone_number}`,
          70,
          yPos,
          true,
          false
        );
        doc.text(
          `Death Indicator: ${patient.death_indicator}`,
          140,
          yPos,
          true,
          false
        );
        yPos += 6;

        doc.text(`Sex: ${patient.sex}`, 10, yPos, true, false);
        doc.text(`SSN: ${patient.ssn}`, 70, yPos, true, false);

        yPos += 8; // Adding a small gap
        doc.line(10, yPos, 200, yPos); // Draw a line under the headers
        yPos += 8; // Adding a small gap
      };

      const addFooter = () => {
        const pages = doc.internal.getNumberOfPages();
        const pageHeight = doc.internal.pageSize.height;
        for (let i = 1; i <= pages; i++) {
          doc.setPage(i);
          doc.setFontSize(10);
          doc.text(
            `Date and Time of Report: ${date}, ${time}`,
            10,
            pageHeight - 10,
            { align: "left" }
          );
          doc.text(`Page ${i} of ${pages}`, 200, pageHeight - 10, {
            align: "right",
          });
        }
      };

      const addPageIfNecessary = () => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 10;
          addHeader(); // Add header on new page
        }
      };

      addHeader();

      // Function to add a single column row
      const addSingleColumnRow = (
        label,
        value,
        unit = "",
        isHeader = false
      ) => {
        const margin = 15; // Margin at the bottom of the page
        const pageHeight = doc.internal.pageSize.height;

        // Check if adding this row would exceed the margin
        if (yPos + margin > pageHeight) {
          doc.addPage(); // Add a new page
          yPos = 10; // Reset yPos for the new page
          addHeader(); // Add header on new page if needed
        }

        doc.setFontSize(12);
        const labelWidth = 60; // Adjust as needed based on your layout
        const valueWidth = 60; // Adjust as needed based on your layout
        const unitWidth = 60; // Adjust as needed based on your layout

        if (
          label === "Test" ||
          label === "Units" ||
          label === "Reference Range:"
        ) {
          doc.setFillColor(210, 210, 210); // Gray color for background
          doc.rect(10, yPos - 6, 190, 8, "F"); // Draw background rect behind the header text
        }

        if (isHeader) {
          doc.setTextColor("gray"); // Gray color for headers
          doc.setFont("helvetica", "bold");
          doc.text(label, 12, yPos, { align: "left", maxWidth: labelWidth });
          doc.text(value, 72, yPos, { align: "left", maxWidth: valueWidth });
          doc.text(unit, 142, yPos, { align: "left", maxWidth: unitWidth });
        } else {
          doc.setTextColor("black"); // Black color for values
          doc.setFont("helvetica", "normal");
          doc.text(label, 12, yPos, { align: "left", maxWidth: labelWidth });
          doc.text(value, 72, yPos, { align: "left", maxWidth: valueWidth });
          doc.text(unit, 142, yPos, { align: "left", maxWidth: unitWidth });
        }
        yPos += 8;
      };

      // Adding Visits
      visits.forEach((visit, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Visit ${index + 1}:`, 10, yPos);
        yPos += 6;
        addSingleColumnRow("Clinic Name:", visit.clinic_name);
        addSingleColumnRow("Patient Class:", visit.patient_class);
        addSingleColumnRow("Assigned Location:", visit.assigned_location);
        addSingleColumnRow("Attending Doctor:", visit.attending_doctor);
        addSingleColumnRow("Hospital Service:", visit.hospital_service);
        addSingleColumnRow("Patient Type:", visit.patient_type);
        addSingleColumnRow("Admit Date Time:", visit.admit_date_time);
        addSingleColumnRow("Discharge Date Time:", visit.discharge_date_time);
        yPos += 6;
      });

      // Adding Orders
      orders.forEach((order, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Order ${index + 1}:`, 10, yPos);
        yPos += 6;
        addSingleColumnRow("Clinic Name:", order.clinic_name);
        addSingleColumnRow("Order Control:", order.order_control);
        addSingleColumnRow("Placer Order Number:", order.placer_order_number);
        addSingleColumnRow("Filler Order Number:", order.filler_order_number);
        addSingleColumnRow(
          "Transaction Date Time:",
          order.transaction_date_time
        );
        addSingleColumnRow("Ordering Provider:", order.ordering_provider);
        yPos += 6;
      });
      // Adding Orders
      order_details.forEach((detail, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Order Detail ${index + 1}:`, 10, yPos);
        yPos += 6;
        doc.setFontSize(14);
        addSingleColumnRow("Test Name:", detail.test_name);
        addSingleColumnRow(
          "Collection Date Time:",
          detail.collection_date_time
        );
        yPos += 6;
      });

      results.forEach((result, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Results ${index + 1}:`, 10, yPos);
        yPos += 8;
        doc.setFontSize(12); // Adjust font size for row content

        // Header row for Test, Units, Reference Range
        addSingleColumnRow("Test", "Units", "Reference Range", true); // Set true for header row

        // Iterate over keys in result.data
        Object.keys(result.data).forEach((key) => {
          const { value, unit, reference_range } = result.data[key] || {};
          addSingleColumnRow(
            `${key}:`,
            `${value || ""}`,
            `${unit || ""} (${reference_range || ""})`
          );
        });

        yPos += 6; // Add spacing between results
      });

      // Adding Diagnosis
      diagnosis.forEach((diag, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Diagnosis ${index + 1}:`, 10, yPos);
        yPos += 6;
        addSingleColumnRow("Diagnosis Code:", diag.diagnosis_code);
        addSingleColumnRow(
          "Diagnosis Description:",
          diag.diagnosis_description
        );
        addSingleColumnRow("Diagnosis Date:", diag.diagnosis_date);
        yPos += 6;
      });

      // Adding Specimens
      specimens.forEach((specimen, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Specimen ${index + 1}:`, 10, yPos);
        yPos += 6;
        addSingleColumnRow("Specimen Type:", specimen.specimen_type);
        addSingleColumnRow(
          "Collection Date Time:",
          specimen.collection_date_time
        );
        yPos += 6;
      });

      // Adding Reports
      reports.forEach((report, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Report ${index + 1}:`, 20, yPos);
        yPos += 6;
        addSingleColumnRow("Report Name:", report.report_name);
        addSingleColumnRow("Report Type:", report.report_type);
        addSingleColumnRow("Report Date:", report.report_date);
        yPos += 6;
      });

      addFooter(); // Call the footer function to add date and time to the bottom left of each page
      doc.save(`${patient.patient_name}_Report.pdf`);
    }
  };

  if (!patientData) {
    return <h4>Patient not found</h4>;
  }

  const {
    patient,
    results,
    visits,
    orders,
    order_details,
    diagnosis,
    specimens,
    reports,
  } = patientData;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden my-2">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-md p-8 relative">
        <div className="flex items-center mb-6">
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

        <div className="text-xl ">
          <h2 className="text-3xl font-bold mb-6 text-center">Lab Report</h2>
          <div  className="mb-6">
          <h2 className=" py-2 text-left font-bold text-gray-900 uppercase tracking-wider">
                      Patient 
                    </h2>
                    <hr className="text-black" />
            <div  className="grid grid-cols-3 gap-2 m-2">
              
                      <p>
                        <strong>Patient Name:</strong> {patient.patient_name}
                      </p>
                      <p>
                        <strong>Date of Birth:</strong> {patient.date_of_birth}
                      </p>
                      <p>
                        <strong>Sex:</strong> {patient.sex}
                      </p>
                      <p>
                        <strong>Race:</strong> {patient.race}
                      </p>
                      <p>
                        <strong>Address:</strong> {patient.address}
                      </p>
                      <p>
                        <strong>Phone Number:</strong> {patient.phone_number}
                      </p>
                      <p>
                        <strong>SSN:</strong> {patient.ssn}
                      </p>
                      <p>
                        <strong>Ethnic Group:</strong> {patient.ethnic_group}
                      </p>
                      <p>
                        <strong>Death Indicator:</strong>{" "}
                        {patient.death_indicator}
                      </p>
            </div>
            <hr />
          </div>

          {/* Additional sections for visits, orders, results, diagnosis, reports */}

          <div className="mb-2">
            <h2 className="text-2xl font-bold ">Visits</h2>
            <div className="grid grid-cols-1 gap-6">
              {visits.map((visit, index) => (
                <div key={index} className="bg-white p-4">
                  <p>
                    <strong>Clinic Name:</strong> {visit.clinic_name}
                  </p>
                  <p>
                    <strong>Patient Class:</strong> {visit.patient_class}
                  </p>
                  <p>
                    <strong>Assigned Location:</strong>{" "}
                    {visit.assigned_location}
                  </p>
                  <p>
                    <strong>Attending Doctor:</strong> {visit.attending_doctor}
                  </p>
                  <p>
                    <strong>Hospital Service:</strong> {visit.hospital_service}
                  </p>
                  <p>
                    <strong>Patient Type:</strong> {visit.patient_type}
                  </p>
                  <p>
                    <strong>Admit Date Time:</strong> {visit.admit_date_time}
                  </p>
                  <p>
                    <strong>Discharge Date Time:</strong>{" "}
                    {visit.discharge_date_time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Repeat similar sections for orders, results, diagnosis, reports as needed */}
          <div className="mb-2">
            <h2 className="text-2xl font-bold ">Orders</h2>
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order, index) => (
                <div key={index} className="bg-white  p-4">
                  <p>
                    <strong>Clinic Name:</strong> {order.clinic_name}
                  </p>
                  <p>
                    <strong>Order Control:</strong> {order.order_control}
                  </p>
                  <p>
                    <strong>Placer Order Number:</strong>{" "}
                    {order.placer_order_number}
                  </p>
                  <p>
                    <strong>Filler Order Number:</strong>{" "}
                    {order.filler_order_number}
                  </p>
                  <p>
                    <strong>Transaction Date Time:</strong>{" "}
                    {order.transaction_date_time}
                  </p>
                  <p>
                    <strong>Ordering Provider:</strong>{" "}
                    {order.ordering_provider}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <h2 className="text-2xl font-bold ">Order Details</h2>
            <div className="grid grid-cols-2 ">
              {order_details.map((orderDetail, index) => (
                <div key={index} className="bg-white p-4">
                  <p>
                    <strong>Test Name:</strong> {orderDetail.test_name}
                  </p>
                  <p>
                    <strong>Collection Date:</strong>{" "}
                    {new Date(
                      orderDetail.collection_date_time
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-2">Results</h2>
            {results.map((result, index) => (
              <div key={index} className="mb-2">
                <p className="mb-2">
                  <strong>Test Name:</strong> {result.test_name}
                </p>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="grid grid-cols-3">
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Test Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Units
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                        Range
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white ">
                    {Object.keys(result.data).map((key, dataIndex) => (
                      <tr key={dataIndex} className=" grid grid-cols-3">
                        <td className="px-6 py-2 text-sm font-bold text-gray-900">
                          {key}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap text-sm  text-gray-900 font-bold">
                          {result.data[key].value} {result.data[key].unit}
                        </td>

                        <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900 font-bold">
                          (Reference Range: {result.data[key].reference_range})
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          {/* Diagnosis */}
          <div className="mb-2">
            <h2 className="text-2xl font-bold">Diagnosis</h2>
            <div className="grid grid-cols-1 gap-6">
              {diagnosis.map((diag, index) => (
                <div key={index} className="bg-white  p-4">
                  <p>
                    <strong>Diagnosis Code:</strong> {diag.diagnosis_code}
                  </p>
                  <p>
                    <strong>Diagnosis Description:</strong>{" "}
                    {diag.diagnosis_description}
                  </p>
                  <p>
                    <strong>Diagnosis Date:</strong> {diag.diagnosis_date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Specimen */}
          <div className="mb-2">
            <h2 className="text-2xl font-bold"> Specimen Details</h2>
            <div className="grid grid-cols-1 gap-6">
              {specimens.map((specimen, index) => (
                <div key={index} className="bg-white  p-2">
                  <p>
                    <strong>Specimen Type:</strong>
                    {specimen.specimen_type}
                  </p>
                  <p>
                    <strong>Collection Date Time:</strong>{" "}
                    {specimen.collection_date_time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reports */}
          <div className="mb-2">
            <h2 className="text-2xl font-bold "> Reports</h2>
            <div className="grid grid-cols-1 gap-6">
              {reports.map((report, index) => (
                <div key={index} className="bg-white  p-2">
                  <p>
                    <strong>Report Name:</strong> {report.report_name}
                  </p>
                  <p>
                    <strong>Report Type:</strong> {report.report_type}
                  </p>
                  <p>
                    <strong>Report Date:</strong> {report.report_date}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
