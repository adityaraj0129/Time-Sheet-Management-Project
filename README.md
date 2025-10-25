Timesheet Management Web Application--TickTock

A full-featured timesheet management application built with React, Tailwind CSS, and Axios for backend API integration. This app allows users to log in, add, update, delete, and view timesheet entries,
providing a modern interface for tracking work hours and tasks.

Table of Contents

Features

Tech Stack
Setup & Installation
Usage
Project Structure
API Endpoints


Features

User authentication (Login / Logout)
Add new timesheet entries with project, work type, description, and hours
Update existing entries directly in the table
Delete tasks from the timesheet
Filter and search timesheet entries by date or status
View daily and weekly total hours
Responsive UI with Tailwind CSS

Tech Stack

Frontend: React, React Router DOM, Tailwind CSS, React Hot Toast
HTTP Requests: Axios
Backend: Any RESTful API (Node.js/Express assumed, replace URLs as needed)
State Management: React Hooks (useState, useEffect)

Setup & Installation

Clone the repository

git clone <repository-url>
cd timesheet-app


Install dependencies
npm install


Run the application
npm start


Ensure your backend API is running and accessible at the configured endpoints:

POST /login – User authentication
GET /api/timesheets – Fetch timesheet entries
POST /entry/addentry – Add new entry
PUT /api/timesheet – Update entry

Environment configuration

Create .env if needed and define backend URLs:

REACT_APP_API_URL=http://localhost:5000

Usage

Navigate to /login to log in with valid credentials.
After login, you can:

Add a new entry via the Add Entry form
View and edit timesheet tasks in TimeSheet
View a summarized table in TimeSheet Table
Use filters to search entries by status or date.
Daily and weekly totals are automatically calculated.
Logout to end the session.

Project Structure
src/
│
├─ App.jsx                 # Main App component with routing
├─ index.js                # React entry point
│
├─ Pages/
│   ├─ Login.jsx           # Login page
│   ├─ Navbar.jsx          # Navbar with login/logout
│
├─ Component/
│   ├─ AddEntry.jsx        # Add new timesheet entry form
│   ├─ TimeSheet.jsx       # Weekly timesheet view with add/update/delete
│   └─ TimeSheetTable.jsx  # Table view of all timesheets
│
├─ utils/                  # Optional utility functions
└─ styles/                 # Tailwind CSS & custom styles

API Endpoints
Method	Endpoint	Description
POST	/login	Authenticate user
GET	/api/timesheets	Fetch timesheet entries
POST	/entry/addentry	Add new entry
PUT	/api/timesheet	Update existing timesheet

Note: Update API URLs according to your backend configuration.

Login Page
Add Entry Modal
Timesheet Table
Weekly Timesheet View
