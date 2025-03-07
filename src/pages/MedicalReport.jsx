import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaTrash, FaPlusCircle, FaEdit, FaUser, FaFlask,
  FaCalendarDay, FaEnvelope, FaNotesMedical, FaUserMd,
  FaStethoscope, FaPhone, FaIdCard, FaClipboardList
} from "react-icons/fa";

const MedicalReport = () => {
  const [patientId, setPatientId] = useState("");
  const [insulinLevel, setInsulinLevel] = useState("");
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [date, setDate] = useState("");
  const [diabetes, setDiabetes] = useState("No");
  const [email, setEmail] = useState("");
  const [dietRecommendation, setDietRecommendation] = useState("");
  const [doctorInfo, setDoctorInfo] = useState({ 
    name: "", 
    specialization: "", 
    contact: "", 
    phone: "" 
  });
  const [reports, setReports] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "medical_reports"));
      setReports(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      toast.error("Error fetching reports");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reportData = { 
        patientId, 
        insulinLevel, 
        glucoseLevel, 
        date, 
        diabetes, 
        email, 
        dietRecommendation, 
        doctorInfo 
      };

      if (editId) {
        await updateDoc(doc(db, "medical_reports", editId), reportData);
        toast.success("Report updated successfully!");
      } else {
        await addDoc(collection(db, "medical_reports"), reportData);
        toast.success("Report added successfully!");
      }

      resetForm();
      fetchReports();
    } catch (error) {
      toast.error("Error saving report");
    }
  };

  const handleEdit = (report) => {
    setEditId(report.id);
    setPatientId(report.patientId);
    setInsulinLevel(report.insulinLevel);
    setGlucoseLevel(report.glucoseLevel);
    setDate(report.date);
    setDiabetes(report.diabetes);
    setEmail(report.email);
    setDietRecommendation(report.dietRecommendation);
    setDoctorInfo(report.doctorInfo);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "medical_reports", id));
      toast.success("Report deleted successfully!");
      fetchReports();
    } catch (error) {
      toast.error("Error deleting report");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setPatientId("");
    setInsulinLevel("");
    setGlucoseLevel("");
    setDate("");
    setDiabetes("No");
    setEmail("");
    setDietRecommendation("");
    setDoctorInfo({ name: "", specialization: "", contact: "", phone: "" });
  };

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
          Patient Medical Report
        </h1>

        {/* Form Section */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-xl mb-8 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaUser className="text-blue-500" /> Patient ID
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaFlask className="text-blue-500" /> Insulin Level (mg/dL)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={insulinLevel}
                  onChange={(e) => setInsulinLevel(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaFlask className="text-blue-500" /> Glucose Level (mg/dL)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={glucoseLevel}
                  onChange={(e) => setGlucoseLevel(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaCalendarDay className="text-blue-500" /> Diagnosis Date
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaNotesMedical className="text-blue-500" /> Diabetes Diagnosis
                </label>
                <select
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={diabetes}
                  onChange={(e) => setDiabetes(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" /> Email
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaNotesMedical className="text-blue-500" /> Diet Recommendation
                </label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  rows="4"
                  value={dietRecommendation}
                  onChange={(e) => setDietRecommendation(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Doctor Information Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-5 flex items-center gap-2">
              <FaUserMd className="text-blue-500" /> Doctor Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaIdCard className="text-blue-500" /> Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={doctorInfo.name}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaStethoscope className="text-blue-500" /> Specialization
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={doctorInfo.specialization}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, specialization: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaEnvelope className="text-blue-500" /> Contact
                </label>
                <input
                  type="email"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={doctorInfo.contact}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, contact: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <FaPhone className="text-blue-500" /> Phone
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                  value={doctorInfo.phone}
                  onChange={(e) => setDoctorInfo({ ...doctorInfo, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            {editId ? <FaEdit /> : <FaPlusCircle />}
            {editId ? "Update Report" : "Create New Report"}
          </button>
        </motion.form>

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
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(report)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(report.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <FaFlask className="text-blue-500" />
                    <span>Insulin: {report.insulinLevel} mg/dL</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaFlask className="text-blue-500" />
                    <span>Glucose: {report.glucoseLevel} mg/dL</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FaEnvelope className="text-blue-500" />
                    <span>{report.email}</span>
                  </p>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="font-medium text-gray-700 flex items-center gap-2">
                      <FaUserMd className="text-blue-500" />
                      {report.doctorInfo.name}
                    </p>
                    <p className="text-sm">{report.doctorInfo.specialization}</p>
                    <p className="text-sm">{report.doctorInfo.contact}</p>
                    <p className="text-sm flex items-center gap-2">
                      <FaPhone className="text-blue-500" />
                      {report.doctorInfo.phone}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default MedicalReport;