import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import TimesheetTable from '../Component/TimeSheetTable';
import TimeSheet from '../Component/TimeSheet';
import TimeSheetTable from '../Component/TimeSheetTable';

const Navbar = () => {
    const navigate=useNavigate();
    const[user,setUser]=useState(null);

     // Check login status on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

    const handleLogout=()=>{
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");

    }
  return (
     <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Timesheet Management</h1>
      <div>
        <Link className="px-4" to="/"> And new Entry</Link>
        <Link className='px-4' to={'/timesheettable'}>Time Sheet Table</Link>
         <Link className='px-4' to={'/timesheet'}>TimeSheets</Link>
        
      {user ? (
        <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded" >
          Logout </button>) : (<Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"> Login</Link>)}
      </div>
    </nav>
  )
}

export default Navbar