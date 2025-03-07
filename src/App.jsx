import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Prediction from "./pages/Predict.jsx";
import Recommendation from "./pages/Recommendation.jsx";
import Workflow from "./pages/Workflow";
import Visualization from "./pages/Visualization";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./pages/Chatbot.jsx";
import Dataset from "./pages/Dataset.jsx";
import MedicalReport from "./pages/MedicalReport.jsx";
import ViewAllReports from "./pages/ViewAllReports.jsx";
import Report from "./pages/Report.jsx";  // Patient's Report page
import PatientHome from "./pages/PatientHome.jsx";

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/predict"
              element={
                <ProtectedRoute>
                  <Prediction />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recommendation"
              element={
                <ProtectedRoute>
                  <Recommendation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/workflow"
              element={
                <ProtectedRoute>
                  <Workflow />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dataset"
              element={
                <ProtectedRoute>
                  <Dataset />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/medical_report"
              element={
                <ProtectedRoute>
                  <MedicalReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view_all_reports"
              element={
                <ProtectedRoute>
                  <ViewAllReports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/visualization"
              element={
                <ProtectedRoute>
                  <Visualization />
                </ProtectedRoute>
              }
            />
            {/* Patient Report route */}
            <Route
              path="/report"
              element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient"
              element={
                <ProtectedRoute>
                  <PatientHome />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
