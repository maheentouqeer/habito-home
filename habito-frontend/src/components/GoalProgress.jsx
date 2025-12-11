import { useEffect, useState } from "react";

export default function GoalProgress({ goalId }) {
  const [progressData, setProgressData] = useState([]);
  const [percentage, setPercentage] = useState(0);

  // Fetch data from backend
  useEffect(() => {
    fetch(`http://localhost:5000/goalprogress/${goalId}`)
      .then((res) => res.json())
      .then((data) => {
        setProgressData(data);

        // calculate average %
        if (data.length > 0) {
          const avg =
            data.reduce((acc, item) => acc + item.percentage_done, 0) /
            data.length;
          setPercentage(Math.round(avg));
        }
      })
      .catch((err) => console.log(err));
  }, [goalId]);

  return (
    <div className="space-y-6">

      {/* ---------- Completion Rate ---------- */}
      <div className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Completion Rate</h2>
          <p className="text-gray-500 text-sm">Last 30 days</p>
          <p className="text-4xl font-bold mt-2">{percentage}%</p>
        </div>

        {/* Circular Progress */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#22c55e"
              strokeWidth="10"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={
                2 * Math.PI * 40 - (percentage / 100) * (2 * Math.PI * 40)
              }
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* ---------- Weekly Progress Graph ---------- */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Weekly Progress</h2>
          <span className="text-gray-500 text-sm">Weekly</span>
        </div>

        <div className="grid grid-cols-7 gap-4 mt-6">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div
                className="w-4 rounded-full bg-green-500"
                style={{
                  height: `${30 + Math.random() * 50}px`,
                  opacity: idx === 4 ? 0.2 : 1, // example dim graph
                }}
              ></div>
              <p className="text-xs mt-1">{day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Habit Performance / Progress List ---------- */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Goal Progress</h2>

        {progressData.length === 0 ? (
          <p className="text-gray-500 text-sm">No progress entries yet.</p>
        ) : (
          progressData.map((item) => (
            <div
              key={item.progress_id}
              className="bg-white p-4 rounded-xl shadow-sm mb-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{item.progress_note}</p>
                <p className="text-gray-500 text-sm">
                  {item.progress_date}
                </p>
              </div>

              <span className="text-green-600 font-semibold">
                {item.percentage_done}% Done
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
