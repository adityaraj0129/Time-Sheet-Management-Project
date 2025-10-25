import axios from "axios";
import React, { useEffect, useState } from "react";

const TimeSheetTable = () => {
 const [timesheets, setTimesheets] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
  });
  // const timesheets = [
  //   { week: 1, date: "1 - 5 January, 2024", status: "COMPLETED" },
  //   { week: 2, date: "8 - 12 January, 2024", status: "COMPLETED" },
  //   { week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE" },
  //   { week: 4, date: "22 - 26 January, 2024", status: "COMPLETED" },
  //   { week: 5, date: "28 January - 1 February, 2024", status: "MISSING" },
  // ];


    //  Fetch from backend API
  const fetchTimesheets = async () => {
    try {
      const { search, status } = filters;
      const res = await axios.get("http://localhost:5000/api/timesheets", {
        params: { search, status },
      });
      setTimesheets(res.data);
    } catch (error) {
      console.error("Error fetching timesheets:", error);
    }
  };

  useEffect(() => {
    fetchTimesheets();
  }, [filters]);

  //
  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 border-green-300";
      case "INCOMPLETE":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "MISSING":
        return "bg-pink-100 text-pink-700 border-pink-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
   <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Timesheets</h2>

        {/*  Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <input
            type="text"
            name="search"
            placeholder="Search by date..."
            value={filters.search}
            onChange={handleFilterChange}
            className="p-2 border rounded w-1/3"
          />

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="p-2 border rounded w-1/4"
          >
            <option value="All">All Status</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="INCOMPLETE">INCOMPLETE</option>
            <option value="MISSING">MISSING</option>
          </select>
        </div>

        {/*  Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="py-3 px-4 text-left">WEEK #</th>
                <th className="py-3 px-4 text-left">DATE</th>
                <th className="py-3 px-4 text-left">STATUS</th>
                <th className="py-3 px-4 text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.length > 0 ? (
                timesheets.map((t) => (
                  <tr key={t._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">{t.week}</td>
                    <td className="py-3 px-4">{t.date}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 text-sm font-medium border rounded-full ${getStatusColor(
                          t.status
                        )}`}
                      >
                        {t.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-3">
                      <button className="text-blue-600 hover:underline">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )};

export default TimeSheetTable;