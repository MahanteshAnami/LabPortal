import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { IoIosArrowRoundBack } from "react-icons/io";

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

export default function PatientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = rows.find((row) => row.id.toString() === id);
  const [showTooltip, setShowTooltip] = React.useState(false);

  if (!patient) {
    return <h4>Patient not found</h4>;
  }

  return (
    <div className="flex items-center justify-center h-[85vh]">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-md p-6 relative ">
        <div className="flex items-center mb-4">
          <IoIosArrowRoundBack
            size={28}
            className="cursor-pointer text-gray-500 hover:text-gray-900 mr-2"
            onClick={() => navigate(-1)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
           {showTooltip && (
            <div className="absolute bg-gray-500 text-white text-xs py-1 px-2 rounded-md mt-10">
              Patient's Table
            </div>
          )}
        </div>
        <div className="text-xl">
        <h2 className="text-3xl font-bold mb-6">Patient's Information</h2>
          <p className="mb-4">
            <strong>Patient Name:</strong> {patient.patientName}
          </p>
          <p className="mb-4">
            <strong>Age:</strong> {patient.age}
          </p>
          <p className="mb-4">
            <strong>Test Name:</strong> {patient.testName}
          </p>
          <p className="mb-4">
            <strong>Diagnosis:</strong> {patient.diagnosis}
          </p>
          <p className="mb-4">
            <strong>Bio-chemistry:</strong> {patient.biochemistry}
          </p>
          <p className="mb-4">
            <strong>Vitals:</strong> {patient.vitals}
          </p>
          <p className="mb-4">
            <strong>Test Date:</strong> {patient.testDate}
          </p>
          <p className="mb-6">
            <strong>Report Code:</strong> {patient.reports}
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-700 text-lg"
            onClick={() => handleDownloadReport(patient)}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
