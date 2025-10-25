// App.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeSheet=()=> {
  const [week, setWeek] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeek();
  }, []);

  //Fetching the entry through the backend API.
  async function fetchWeek() {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:4000/api/timesheet");
      setWeek(resp.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

 //Updating the entry through the backend API.
  async function updateCell(dayIndex, taskIndex, value) {
    const newWeek = JSON.parse(JSON.stringify(week));
    newWeek[dayIndex].tasks[taskIndex].hours = Number(value) || 0;
    setWeek(newWeek);
    // sync to server
    try {
      await axios.put("http://localhost:4000/api/timesheet", newWeek);
    } catch (err) {
      console.error(err);
    }
  }

  //Adding the entry through the backend API.
  async function addEntry(dayIndex) {
    const newWeek = JSON.parse(JSON.stringify(week));
    newWeek[dayIndex].tasks.push({
      id: Date.now(),
      name: "Homepage Development",
      hours: 0,
      project: "Project Name",
    });
    setWeek(newWeek);
    try {
      await axios.put("http://localhost:4000/api/timesheet", newWeek);
    } catch (err) {
      console.error(err);
    }
  }

  //Deleting the entry through the backend API.
  async function deleteEntry(dayIndex, taskIndex) {
    const newWeek = JSON.parse(JSON.stringify(week));
    newWeek[dayIndex].tasks.splice(taskIndex, 1);
    setWeek(newWeek);
    try {
      await axios.put("http://localhost:4000/api/timesheet", newWeek);
    } catch (err) {
      console.error(err);
    }
  }

  function dayTotal(day) {
    return day.tasks.reduce((s, t) => s + Number(t.hours || 0), 0);
  }

  function weekTotal() {
    return week.reduce((s, d) => s + dayTotal(d), 0);
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow p-6">
        <h1 className="text-xl font-semibold text-gray-800">This week's timesheet</h1>
        <p className="text-sm text-gray-500 mb-4">{week[0]?.range || ''}</p>

        <div className="overflow-x-auto">
          <div className="flex gap-4 items-start">
            {week.map((day, dayIndex) => (
              <div key={day.date} className="w-64 bg-white border rounded-lg p-3">
                <div className="text-xs text-gray-400">{day.label}</div>
                <div className="font-medium mb-2">{day.date}</div>

                <div className="space-y-2">
                  {day.tasks.map((entry, entryIndex) => (
                    <div key={entry.id} className="flex items-center justify-between border rounded p-2">
                      <div className="flex-1 text-sm">
                        <div className="truncate">{entry.name}</div>
                        <div className="text-xs text-gray-400">{entry.project}</div>
                      </div>
                      <div className="ml-3 flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={entry.hours}
                          onChange={(e) => updateCell(dayIndex, entryIndex, e.target.value)}
                          className="w-16 text-right border rounded px-2 py-1 text-sm"
                        />
                        <button
                          onClick={() => deleteEntry(dayIndex, entryIndex)}
                          className="text-xs text-red-500"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => addEntry(dayIndex)}
                    className="w-full text-blue-600 text-sm text-left"
                  >
                    + Add new task
                  </button>
                </div>

                <div className="mt-4 text-sm flex items-center justify-between">
                  <div className="text-xs text-gray-400">Daily total</div>
                  <div className="font-medium">{dayTotal(day)} hrs</div>
                </div>
              </div>
            ))}

            <div className="w-48 flex flex-col items-center justify-center border rounded-lg p-4">
              <div className="text-xs text-gray-400">Week total</div>
              <div className="text-2xl font-semibold mt-2">{weekTotal()} hrs</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TimeSheet;
