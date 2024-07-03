// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { jsPDF } from "jspdf";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import axios from "axios";

// const PatientDetails = () => {
//   const { mrn } = useParams(); // Assuming MRN is passed as a URL parameter
//   const navigate = useNavigate();
//   const [patient, setPatient] = useState(null);
//   const [showTooltip, setShowTooltip] = useState(false);

//   useEffect(() => {
//     const fetchPatientData = async () => {
//       try {
//         const clinicName = "Harley Streets";
//         const response = await axios.get(
//           `http://35.178.63.129:8000/patients/${clinicName}`
//         );
//         const patients = response.data;
//         const foundPatient = patients.find((p) => p.mrn === mrn);
//         setPatient(foundPatient);
//       } catch (error) {
//         console.error("Error fetching patient data:", error);
//       }
//     };

//     fetchPatientData();
//   }, [mrn]);

//   const handleDownloadReport = () => {
//     if (patient) {
//       const doc = new jsPDF();
//       doc.setFontSize(20);
//       doc.text("Lab Report", 105, 15, { align: "center" });
//       doc.setFontSize(10);
//       doc.text("Harley Street Lab Services", 200, 10, {
//         align: "right",
//         textColor: "blue",
//       });
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
//       doc.text(`Test Name: ${patient.test_name}`, 20, 120);
//       doc.text(`Test Date: ${patient.test_date}`, 20, 130);

//       doc.save(`${patient.patient_name}_Report.pdf`);
//     }
//   };

//   if (!patient) {
//     return <h4>Patient not found</h4>;
//   }

//   return (
//     <div className="flex items-center justify-center h-[90vh]">
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
//             <div className="absolute bg-gray-500 text-white text-xs py-1 px-2 rounded-md mt-8 ml-2">
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





// *****************************************************





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
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [mrn]);

  const handleDownloadReport = () => {
    if (patientData) {
      const { patient, results, visits, orders, order_details, diagnosis, specimens, reports } = patientData;
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      let yPos = 10;

      const addHeader = () => {
        doc.setFontSize(20);
        doc.text("Lab Report", 105, yPos, { align: "center" });
        yPos += 20;
        doc.setFontSize(10);
        doc.text("Harley Street Lab Services", 200, 10, {
          align: "right",
          textColor: "blue",
        });
      };

      const addPageIfNecessary = () => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 10;
          addHeader(); // Add header on new page
        }
      };

      doc.setFontSize(20);
      doc.text("Lab Report", 105, yPos, { align: "center" });
      yPos += 20;
      doc.setFontSize(10);
      doc.text("Harley Street Lab Services", 200, 10, {
        align: "right",
        textColor: "blue",
      });

      doc.setFontSize(12);
      doc.text(`Patient Name: ${patient.patient_name}`, 20, yPos);
      yPos += 8;
      doc.text(`Date of Birth: ${patient.date_of_birth}`, 20, yPos);
      yPos += 8;
      doc.text(`Sex: ${patient.sex}`, 20, yPos);
      yPos += 8;
      doc.text(`Race: ${patient.race}`, 20, yPos);
      yPos += 8;
      doc.text(`Address: ${patient.address}`, 20, yPos);
      yPos += 8;
      doc.text(`Phone Number: ${patient.phone_number}`, 20, yPos);
      yPos += 8;
      doc.text(`SSN: ${patient.ssn}`, 20, yPos);
      yPos += 8;
      doc.text(`Ethnic Group: ${patient.ethnic_group}`, 20, yPos);
      yPos += 8;
      doc.text(`Death Indicator: ${patient.death_indicator}`, 20, yPos);
      yPos += 12;

      visits.forEach((visit, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Visit ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Clinic Name: ${visit.clinic_name}`, 30, yPos);
        yPos += 8;
        doc.text(`Patient Class: ${visit.patient_class}`, 30, yPos);
        yPos += 8;
        doc.text(`Assigned Location: ${visit.assigned_location}`, 30, yPos);
        yPos += 8;
        doc.text(`Attending Doctor: ${visit.attending_doctor}`, 30, yPos);
        yPos += 8;
        doc.text(`Hospital Service: ${visit.hospital_service}`, 30, yPos);
        yPos += 8;
        doc.text(`Patient Type: ${visit.patient_type}`, 30, yPos);
        yPos += 8;
        doc.text(`Admit Date Time: ${visit.admit_date_time}`, 30, yPos);
        yPos += 8;
        doc.text(`Discharge Date Time: ${visit.discharge_date_time}`, 30, yPos);
        yPos += 12;
      });

      orders.forEach((order, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Order ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Clinic Name: ${order.clinic_name}`, 30, yPos);
        yPos += 8;
        doc.text(`Order Control: ${order.order_control}`, 30, yPos);
        yPos += 8;
        doc.text(`Placer Order Number: ${order.placer_order_number}`, 30, yPos);
        yPos += 8;
        doc.text(`Filler Order Number: ${order.filler_order_number}`, 30, yPos);
        yPos += 8;
        doc.text(`Transaction Date Time: ${order.transaction_date_time}`, 30, yPos);
        yPos += 8;
        doc.text(`Ordering Provider: ${order.ordering_provider}`, 30, yPos);
        yPos += 12;
      });

      order_details.forEach((detail, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Order Detail ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Test Name: ${detail.test_name}`, 30, yPos);
        yPos += 8;
        doc.text(`Collection Date Time: ${detail.collection_date_time}`, 30, yPos);
        yPos += 12;
      });

      results.forEach((result, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Result ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Test Name: ${result.test_name}`, 30, yPos);
        yPos += 8;
        Object.keys(result.data).forEach((key, dataIndex) => {
          const { value, unit, reference_range } = result.data[key];
          doc.text(
            `${key}: ${value} ${unit} (Reference Range: ${reference_range})`,
            40,
            yPos
          );
          yPos += 8;
        });
        yPos += 8;
      });

      diagnosis.forEach((diag, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Diagnosis ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Diagnosis Code: ${diag.diagnosis_code}`, 30, yPos);
        yPos += 8;
        doc.text(`Diagnosis Description: ${diag.diagnosis_description}`, 30, yPos);
        yPos += 8;
        doc.text(`Diagnosis Date: ${diag.diagnosis_date}`, 30, yPos);
        yPos += 12;
      });

      specimens.forEach((specimen, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Specimen ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Specimen Type: ${specimen.specimen_type}`, 30, yPos);
        yPos += 8;
        doc.text(`Collection Date Time: ${specimen.collection_date_time}`, 30, yPos);
        yPos += 12;
      });

      reports.forEach((report, index) => {
        addPageIfNecessary();
        doc.setFontSize(14);
        doc.text(`Report ${index + 1}:`, 20, yPos);
        yPos += 8;
        doc.setFontSize(12);
        doc.text(`Report Name: ${report.report_name}`, 30, yPos);
        yPos += 8;
        doc.text(`Report Type: ${report.report_type}`, 30, yPos);
        yPos += 8;
        doc.text(`Report Date: ${report.report_date}`, 30, yPos);
        yPos += 12;
      });

      doc.save(`${patient.patient_name}_Report.pdf`);
    }
  };



  if (!patientData) {
    return <h4>Patient not found</h4>;
  }

  const { patient, results, visits, orders, order_details, diagnosis, specimens, reports } = patientData;

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
        <div className="text-xl">
          <h2 className="text-3xl font-bold mb-6">Patient's Information</h2>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p>
                <strong>Patient Name:</strong> {patient.patient_name}
              </p>
              <p>
                <strong>Date of Birth:</strong> {patient.date_of_birth}
              </p>
              <p>
                <strong>Sex:</strong> {patient.sex}
              </p>
            </div>
            <div>
              <p>
                <strong>Race:</strong> {patient.race}
              </p>
              <p>
                <strong>Address:</strong> {patient.address}
              </p>
              <p>
                <strong>Phone Number:</strong> {patient.phone_number}
              </p>
            </div>
            <div>
              <p>
                <strong>SSN:</strong> {patient.ssn}
              </p>
              <p>
                <strong>Ethnic Group:</strong> {patient.ethnic_group}
              </p>
              <p>
                <strong>Death Indicator:</strong> {patient.death_indicator}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {visits.map((visit, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Visit {index + 1}</h3>
                <p><strong>Clinic Name:</strong> {visit.clinic_name}</p>
                <p><strong>Patient Class:</strong> {visit.patient_class}</p>
                <p><strong>Assigned Location:</strong> {visit.assigned_location}</p>
                <p><strong>Attending Doctor:</strong> {visit.attending_doctor}</p>
                <p><strong>Hospital Service:</strong> {visit.hospital_service}</p>
                <p><strong>Patient Type:</strong> {visit.patient_type}</p>
                <p><strong>Admit Date Time:</strong> {visit.admit_date_time}</p>
                <p><strong>Discharge Date Time:</strong> {visit.discharge_date_time}</p>
              </div>
            ))}
          </div>
          
           <div className="grid grid-cols-2">
          <div className=" mb-6">
            {orders.map((order, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Order {index + 1}</h3>
                <p><strong>Clinic Name:</strong> {order.clinic_name}</p>
                <p><strong>Order Control:</strong> {order.order_control}</p>
                <p><strong>Placer Order Number:</strong> {order.placer_order_number}</p>
                <p><strong>Filler Order Number:</strong> {order.filler_order_number}</p>
                <p><strong>Transaction Date Time:</strong> {order.transaction_date_time}</p>
                <p><strong>Ordering Provider:</strong> {order.ordering_provider}</p>
              </div>
            ))}
          </div>

          <div className=" mb-6">
            {order_details.map((detail, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Order Detail {index + 1}</h3>
                <p><strong>Test Name:</strong> {detail.test_name}</p>
                <p><strong>Collection Date Time:</strong> {detail.collection_date_time}</p>
              </div>
            ))}
          </div>
          </div>
          

          <div className="grid grid-cols-2 gap-6 mb-6">
            {results.map((result, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Result {index + 1}</h3>
                <p><strong>Test Name:</strong> {result.test_name}</p>
                <ul>
                  {Object.keys(result.data).map((key, dataIndex) => (
                    <li key={dataIndex}>
                      <strong>{key}:</strong> {result.data[key].value} {result.data[key].unit}
                      {" "}
                      (Reference Range: {result.data[key].reference_range})
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {diagnosis.map((diag, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Diagnosis {index + 1}</h3>
                <p><strong>Diagnosis Code:</strong> {diag.diagnosis_code}</p>
                <p><strong>Diagnosis Description:</strong> {diag.diagnosis_description}</p>
                <p><strong>Diagnosis Date:</strong> {diag.diagnosis_date}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {specimens.map((specimen, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Specimen {index + 1}</h3>
                <p><strong>Specimen Type:</strong> {specimen.specimen_type}</p>
                <p><strong>Collection Date Time:</strong> {specimen.collection_date_time}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {reports.map((report, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-2">Report {index + 1}</h3>
                <p><strong>Report Name:</strong> {report.report_name}</p>
                <p><strong>Report Type:</strong> {report.report_type}</p>
                <p><strong>Report Date:</strong> {report.report_date}</p>
              </div>
            ))}
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
