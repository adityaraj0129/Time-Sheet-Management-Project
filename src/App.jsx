import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'

import AddEntry from './Component/AddEntry'
import Navbar from './Pages/Navbar'
import TimeSheet from './Component/TimeSheet'
import TimeSheetTable from './Component/TimeSheetTable'

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<AddEntry/>}/>
        <Route path='/timesheettable' element={<TimeSheetTable />} />
        <Route path='/timesheet' element={<TimeSheet />} />
        
      </Routes>
    </Router>
  )
}

export default App
