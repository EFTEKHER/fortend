import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import { 
  FaFileMedical, 
  FaUserInjured, 
  FaSyringe, 
  FaDna, 
  FaCalendarDay,
  FaDiagnoses,
  FaAppleAlt,
  FaUserMd,
  FaPrint
} from "react-icons/fa";
import "animate.css";

const Report = () => {
  const [user] = useAuthState(auth);
  const [reports, setReports] = useState([]);
  const componentRef = useRef();

  useEffect(() => {
    if (user) fetchReports();
  }, [user]);

  const fetchReports = async () => {
    try {
      const reportsRef = collection(db, "medical_reports");
      const q = query(reportsRef, where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      const fetchedReports = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReports(fetchedReports);
    } catch (error) {
      toast.error("Error fetching reports");
      console.error("Error fetching reports: ", error);
    }
  };

  const handlePrint = () => {
    toast.info("Preparing document...");
    try {
      const printContent = componentRef.current.innerHTML;
      const printWindow = window.open('', '_blank');
      
      if (!printWindow) {
        toast.error("Pop-up blocked! Please allow pop-ups for this site.");
        return;
      }

      const originalStyles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(el => el.outerHTML)
        .join('');

      printWindow.document.write(`
        <html>
          <head>
            <title>Medical Report - ${new Date().toLocaleDateString()}</title>
            ${originalStyles}
            <style>
              @media print {
                @page { margin: 15mm 10mm; size: auto; }
                .no-print { display: none !important; }
                .report-card { 
                  page-break-inside: avoid; 
                  break-inside: avoid;
                  margin: 15px 0 !important;
                }
                body { 
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                  padding: 20px !important; 
                  background: white !important; 
                }
              }
            </style>
          </head>
          <body class="bg-gray-50 p-4">
            ${printContent}
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.onload = () => {
        toast.success("Document ready to print!");
        printWindow.focus();
        printWindow.print();
      };
    } catch (error) {
      toast.error("Failed to generate document");
      console.error("Print error:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 no-print">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-blue-600 animate__animated animate__fadeInDown">
            <FaFileMedical className="text-4xl" />
            My Medical Reports
          </h1>
          {reports.length > 0 && (
            <button
              onClick={handlePrint}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 animate__animated animate__fadeInRight"
            >
              <FaPrint className="text-lg" />
              Generate PDF/Print
            </button>
          )}
        </div>

        <div ref={componentRef}>
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-xl">No reports found</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {reports.map((report, index) => (
                <ReportCard key={report.id} report={report} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReportCard = ({ report, index }) => {
  return (
    <div 
      className="animate__animated animate__fadeInUp bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 report-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600">
          <FaUserInjured />
          Patient ID: {report.patientId}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-lg">
            <FaSyringe className="text-blue-500 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Insulin Level</p>
              <p className="font-semibold">{report.insulinLevel} mg/dL</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
            <FaDna className="text-green-500 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Glucose Level</p>
              <p className="font-semibold">{report.glucoseLevel} mg/dL</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-purple-50 p-3 rounded-lg">
            <FaCalendarDay className="text-purple-500 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Diagnosis Date</p>
              <p className="font-semibold">{report.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
            <FaDiagnoses className="text-red-500 text-xl" />
            <div>
              <p className="text-sm text-gray-600">Diabetes Diagnosis</p>
              <p className="font-semibold capitalize">{report.diabetes}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-600">
            <FaAppleAlt />
            Diet Recommendation
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap border border-gray-200">
            {report.dietRecommendation}
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-600">
            <FaUserMd />
            Doctor Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-semibold">{report.doctorInfo.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Specialization</p>
              <p className="font-semibold">{report.doctorInfo.specialization}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Contact</p>
              <p className="font-semibold">{report.doctorInfo.contact}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">{report.doctorInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;