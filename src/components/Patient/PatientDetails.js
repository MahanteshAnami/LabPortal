import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { IoIosArrowRoundBack } from "react-icons/io";
import axios from "axios";

const PatientDetails = () => {
  const { mrn } = useParams(); // Assuming MRN is passed as a URL parameter
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const clinicName = "Harley Streets";
        const response = await axios.get(
          `http://35.178.63.129:8000/patients/${clinicName}`
        );
        const patients = response.data;
        const foundPatient = patients.find((p) => p.mrn === mrn);
        setPatient(foundPatient);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [mrn]);

  const handleDownloadReport = () => {
    if (patient) {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Lab Report", 105, 15, { align: "center" });
      doc.setFontSize(10);
      doc.text("Harley Street Lab Services", 200, 10, {
        align: "right",
        textColor: "blue",
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
    <div className="flex items-center justify-center h-[90vh]">
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
