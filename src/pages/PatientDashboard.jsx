import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PatientDashboard() {
  const [patientId, setPatientId] = useState("38291");
  const [latestReport, setLatestReport] = useState(null);

  useEffect(() => {
    const reportRef = ref(db, `Reports/${patientId}`);
    onValue(reportRef, (snapshot) => {
      const reports = snapshot.val();
      if (reports) {
        const entries = Object.values(reports);
        const latest = entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
        setLatestReport(latest);
      }
    });
  }, [patientId]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm text-gray-500">Flexion Progress</h2>
              <p className="text-2xl font-semibold text-blue-600">
                {latestReport ? `${((latestReport.totalFlexion / 10500) * 100).toFixed(1)}%` : "--"}
              </p>
              <p className="text-xs text-gray-400">Based on last report</p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm text-gray-500">Stress Level</h2>
              <p className="text-lg font-semibold text-amber-600">
                {latestReport ? (latestReport.acceleration > 1.5 ? "High" : "Moderate") : "--"}
              </p>
              <p className="text-xs text-gray-400">Sensor based reading</p>
            </div>
            <div className="bg-white rounded shadow p-4">
              <h2 className="text-sm text-gray-500">Current Condition</h2>
              <p className="text-sm text-gray-700">
                {latestReport?.condition || "Awaiting doctor input."}
              </p>
            </div>
          </div>

          <div className="bg-white rounded shadow p-4 mb-6">
            <h2 className="text-lg font-semibold mb-2">Doctor Messages</h2>
            <ul className="space-y-2">
              {latestReport?.doctorMessage ? (
                <li className="border-b pb-2">
                  <p className="text-sm font-medium text-blue-700">{latestReport.doctorMessage.from}</p>
                  <p className="text-sm text-gray-700">{latestReport.doctorMessage.greeting}</p>
                  <p className="text-sm text-gray-700">{latestReport.doctorMessage.text}</p>
                  <p className="text-xs text-gray-400">{latestReport.doctorMessage.date}</p>
                </li>
              ) : (
                <li className="text-sm text-gray-500">No recent doctor message available.</li>
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}