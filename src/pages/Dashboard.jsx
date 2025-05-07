//doctor dashboard
import { useEffect, useState } from "react";
import { useFirebaseData } from "@/hooks/useFirebaseData";
import {
  MetricCard,
  FlexionChart,
  AccelerationChart,
  GyroscopeData,
  Header,
  Footer,
  RangeAnalysis,
  SessionInfo,
  RecentReports,
} from "@/components";
import ForceChart from "@/components/ForceChart";
import LoadingOverlay from "@/components/LoadingOverlay";
import { db } from "@/lib/firebase";
import { ref, push } from "firebase/database";

const Dashboard = () => {
  const { flexion, force, mpu, loading, error } = useFirebaseData();

  const [selectedPatient, setSelectedPatient] = useState("38291");
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState("");

  const safeFlexion = flexion || {
    thumb: 0,
    index: 0,
    middle: 0,
    ring: 0,
    pinky: 0,
  };

  const safeForce = typeof force === "number" ? force : 0;
  const safeMpu = mpu || {
    accelX: 0,
    accelY: 0,
    accelZ: 0,
    gyroX: 0,
    gyroY: 0,
    gyroZ: 0,
  };

  const totalFlexion = Object.values(safeFlexion).reduce(
    (sum, val) => sum + Number(val || 0),
    0
  );

  const acceleration = Math.hypot(
    Number(safeMpu.accelX || 0),
    Number(safeMpu.accelY || 0),
    Number(safeMpu.accelZ || 0)
  );

  const [forceHistory, setForceHistory] = useState([]);
  const [accelHistory, setAccelHistory] = useState([]);
  const timestamp = Date.now();

  useEffect(() => {
    if (!loading && typeof safeForce === "number") {
      setForceHistory((prev) => [
        ...prev.slice(-49),
        { force: safeForce, timestamp },
      ]);
    }
  }, [safeForce, loading, timestamp]);

  useEffect(() => {
    if (!loading && safeMpu) {
      setAccelHistory((prev) => [
        ...prev.slice(-49),
        {
          x: safeMpu.accelX,
          y: safeMpu.accelY,
          z: safeMpu.accelZ,
          timestamp,
        },
      ]);
    }
  }, [safeMpu, loading, timestamp]);

  const dummySession = {
    duration: "14:32",
    dataPoints: 432,
    signalQuality: "Good",
    status: "Active",
  };

  const dummyRanges = {
    thumb: { value: Math.min(safeFlexion.thumb, 338), category: "Mid" },
    index: { value: Math.min(safeFlexion.index, 338), category: "Mid" },
    middle: { value: Math.min(safeFlexion.middle, 338), category: "Mid" },
    ring: { value: Math.min(safeFlexion.ring, 338), category: "Mid" },
    pinky: { value: Math.min(safeFlexion.pinky, 338), category: "Mid" },
  };

  const dummyReports = [
    { id: 1, name: "Session Report - 01 May", createdAt: new Date(), status: "Completed" },
    { id: 2, name: "Grip Strength Review", createdAt: new Date(), status: "In Progress" },
  ];

  const handleReportSubmit = async () => {
    const report = {
      totalFlexion,
      force: safeForce,
      acceleration,
      gyroscope: {
        x: safeMpu.gyroX,
        y: safeMpu.gyroY,
        z: safeMpu.gyroZ,
      },
      notes,
      createdAt: new Date().toISOString(),
    };

    try {
      const patientRef = ref(db, `Reports/${selectedPatient}`);
      await push(patientRef, report);
      alert("Report sent to patient #" + selectedPatient);
    } catch (err) {
      console.error("Error saving report:", err);
      alert("Failed to send report");
    }

    setShowForm(false);
    setNotes("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Hand Mobility Dashboard</h1>
            <div className="flex items-center space-x-3">
              <select
                className="text-sm border border-gray-300 rounded px-2 py-1"
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
              >
                <option value="38291">Patient #38291</option>
                <option value="38292">Patient #38292</option>
                <option value="38293">Patient #38293</option>
              </select>
              <button
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setShowForm(true)}
              >
                New Report
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white border rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Prescription Form for Patient #{selectedPatient}</h2>
              <p><strong>Total Flexion:</strong> {totalFlexion.toFixed(1)}°</p>
              <p><strong>Force:</strong> {safeForce.toFixed(2)} N</p>
              <p><strong>Acceleration:</strong> {acceleration.toFixed(2)} g</p>
              <p><strong>Gyroscope:</strong> X: {safeMpu.gyroX}, Y: {safeMpu.gyroY}, Z: {safeMpu.gyroZ}</p>
              <textarea
                placeholder="Enter prescription notes..."
                className="w-full mt-4 border rounded p-2 text-sm"
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={handleReportSubmit}
                >
                  Submit Report
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard
              title="AROM"
              value={totalFlexion}
              unit="°"
              icon="track_changes"
              iconBgColor="bg-indigo-100"
              iconColor="text-indigo-600"
            />
            <MetricCard
              title="GRASP"
              value={safeForce}
              unit="N"
              icon="pan_tool"
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
            <MetricCard
              title="FINE MOTOR"
              value={acceleration}
              unit="g"
              icon="psychology"
              iconBgColor="bg-green-100"
              iconColor="text-green-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <MetricCard
              title="Total Flexion"
              value={totalFlexion.toFixed(1)}
              unit="°"
              icon="accessibility"
              iconBgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <MetricCard
              title="Force Sensor"
              value={safeForce.toFixed(2)}
              unit="N"
              icon="fitness_center"
              iconBgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
            <MetricCard
              title="Acceleration"
              value={acceleration.toFixed(2)}
              unit="g"
              icon="speed"
              iconBgColor="bg-blue-100"
              iconColor="text-blue-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <FlexionChart data={safeFlexion} loading={loading} />
            <AccelerationChart data={accelHistory} loading={loading} />
            <GyroscopeData
              data={[
                {
                  x: safeMpu.gyroX,
                  y: safeMpu.gyroY,
                  z: safeMpu.gyroZ,
                  timestamp,
                },
              ]}
              loading={loading}
            />
            <ForceChart data={forceHistory} loading={loading} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RangeAnalysis ranges={dummyRanges} loading={loading} />
            <SessionInfo sessionData={dummySession} loading={loading} onEndSession={() => {}} />
          </div>

          <RecentReports reports={dummyReports} loading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;