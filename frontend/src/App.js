import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

function App() {
  return (
    <Router>
      <div className="min-vh-100 bg-light">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<StudentList />} />
            <Route path="/add" element={<StudentForm />} />
            <Route path="/edit/:id" element={<StudentForm />} />
          </Routes>
        </main>
        <footer className="py-4 text-center text-muted border-top bg-white mt-auto">
          <small>&copy; 2026 Student Management System. All rights reserved.</small>
        </footer>
      </div>
    </Router>
  );
}

export default App;