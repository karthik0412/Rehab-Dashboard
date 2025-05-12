// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Dashboard from "@/pages/Dashboard";
import PatientDashboard from "@/pages/PatientDashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function App() {
  const { user, role, loading } = useAuth();

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={user && role === "doctor" ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/patient"
        element={user && role === "patient" ? <PatientDashboard /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
