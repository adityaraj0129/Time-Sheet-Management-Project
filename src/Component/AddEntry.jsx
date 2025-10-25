import React, { useState } from 'react'
import Navbar from '../Pages/Navbar';
import axios from 'axios';

const AddEntry = () => {
  const [project, setProject] = useState(""); 
  const [workType, setWorkType] = useState("Bug fixes");
   const [description, setDescription] = useState(""); 
   const [hours, setHours] = useState(12);

   //Sending new Entry to backend API
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Unauthorized! Please log in first.");
      return;
    }

    const token = user.token;

    // Combine all state values into one object
    const newTask = {
      project,
      workType,
      description,
      hours,
    };

    // Send to backend
    await axios.post("http://localhost:3000/entry/addentry", newTask, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Task added successfully");
    fetchTasks(); // refresh table after adding

    // Optional: reset form fields
    setProject("");
    setWorkType("Bug fixes");
    setDescription("");
    setHours(12);
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message || "Failed to add task. Please try again."
    );
  }
};
   

if (!open) return null;

return ( <form action="" onSubmit={handleSubmit}>
  
<div className=" fixed inset-0 z-50 flex items-center mt-18 justify-center"> {/* dark overlay */} 

  <div className="absolute inset-0 bg-black/40" onClick={onclose} aria-hidden/>

<div className="relative z-10 w-[880px] max-w-[95%] max-h-[75vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
    {/* header */}
    <div className="flex items-start justify-between">
      <h3 className="text-2xl font-semibold text-gray-800">Add New Entry</h3>
      <button
        onClick={onclose}
        className="-mr-2 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        aria-label="Close dialog"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>

    <div className="mt-6 space-y-6">
      {/* Select Project */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
          Select Project <span className="text-red-500">*</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 8.75c0-.414.336-.75.75-.75h.5c.414 0 .75.336.75.75v4.5a.75.75 0 11-1.5 0v-3.75H9V8.75z" />
          </svg>
        </label>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none"
        >
          <option value="">Project Name</option>
          <option value="campusbuddy">Front=End</option>
          <option value="skilltrack">Backend</option>
          <option value="localkart">Full-Stack</option>
        </select>
      </div>

      {/* Type of Work */}
      <div>
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
          Type of Work <span className="text-red-500">*</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.5a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9 8.75c0-.414.336-.75.75-.75h.5c.414 0 .75.336.75.75v4.5a.75.75 0 11-1.5 0v-3.75H9V8.75z" />
          </svg>
        </label>
        <select
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm focus:border-blue-400 focus:outline-none"
        >
          <option>Bug fixes</option>
          <option>Feature work</option>
          <option>Code review</option>
          <option>Research</option>
        </select>
      </div>

      {/* Task description */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">Task description <span className="text-red-500">*</span></label>
        <textarea
          placeholder="Write text here ..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={7}
          className="w-full rounded-lg border border-gray-200 bg-white p-4 text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
        />
        <p className="mt-2 text-sm text-gray-400">A note for extra info</p>
      </div>

      {/* Hours input */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Hours <span className="text-red-500">*</span></label>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setHours((h) => Math.max(0, h - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-700 hover:bg-gray-50"
            aria-label="Decrease hours"
          >
            −
          </button>

          <div className="flex h-10 min-w-[64px] items-center justify-center rounded-lg border border-gray-200 px-4 text-lg font-medium text-gray-800">
            {hours}
          </div>

          <button
            onClick={() => setHours((h) => Math.min(24, h + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-lg text-gray-700 hover:bg-gray-50"
            aria-label="Increase hours"
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* footer buttons */}
    <div className="mt-8 flex items-center gap-4">
      <button
        onClick={() => {
          // In real app you'd validate & submit
          const payload = { project, workType, description, hours };
          console.log("submit", payload);
          onclose;
        }}
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700"
      >
        Add entry
      </button>

      <button
        onClick={onclose}
        className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
    </div>
  </div>
</div>
</form>

); }


export default AddEntry