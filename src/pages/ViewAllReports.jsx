import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser, FaFlask, FaCalendarDay, FaEnvelope,
  FaNotesMedical, FaUserMd, FaStethoscope,
  FaPhone, FaIdCard, FaClipboardList
} from "react-icons/fa";

const ViewAllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "medical_reports"));
      setReports(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching reports");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-3">
          <FaClipboardList className="text-blue-600" />
          All Medical Reports
        </h1>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-blue-500" /> {report.patientId}
                  </h3>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarDay className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium">Date:</span>
                    {new Date(report.date).toLocaleDateString()}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaFlask className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium">Insulin:</span>
                    {report.insulinLevel} mg/dL
                  </div>

                  <div className="flex items-center gap-2">
                    <FaFlask className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium">Glucose:</span>
                    {report.glucoseLevel} mg/dL
                  </div>

                  <div className="flex items-center gap-2">
                    <FaNotesMedical className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium">Diabetes:</span>
                    {report.diabetes}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium">Email:</span>
                    <a href={`mailto:${report.email}`} className="text-blue-600 hover:underline">
                      {report.email}
                    </a>
                  </div>

                  {report.dietRecommendation && (
                    <div className="pt-2">
                      <p className="font-medium flex items-center gap-2">
                        <FaNotesMedical className="text-blue-500" />
                        Diet Recommendation:
                      </p>
                      <p className="text-gray-600 text-sm">{report.dietRecommendation}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-700 flex items-center gap-2 mb-2">
                      <FaUserMd className="text-blue-500" />
                      Doctor Information
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaIdCard className="text-blue-500 flex-shrink-0" />
                        <span className="font-medium">Name:</span>
                        {report.doctorInfo.name}
                      </div>

                      <div className="flex items-center gap-2">
                        <FaStethoscope className="text-blue-500 flex-shrink-0" />
                        <span className="font-medium">Specialization:</span>
                        {report.doctorInfo.specialization}
                      </div>

                      <div className="flex items-center gap-2">
                        <FaEnvelope className="text-blue-500 flex-shrink-0" />
                        <span className="font-medium">Contact:</span>
                        
                        <a href={`mailto:${report.doctorInfo.contact}`} className="text-blue-600 hover:underline">
                      {report.doctorInfo.contact}
                    </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <FaPhone className="text-blue-500 flex-shrink-0" />
                        <span className="font-medium">Phone:</span>
                        <a href={`tel:${report.doctorInfo.phone}`} className="text-blue-600 hover:underline">
                          {report.doctorInfo.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No medical reports found in the database.
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ViewAllReports;