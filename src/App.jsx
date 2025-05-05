import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import Dashboard from "@/pages/Dashboard";
import PatientDashboard from "@/pages/PatientDashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/not-found";

function App() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const role = localStorage.getItem("userRole");
      setUserRole(role);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={userRole === "doctor" ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/patient"
        element={userRole === "patient" ? <PatientDashboard /> : <Navigate to="/" />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;