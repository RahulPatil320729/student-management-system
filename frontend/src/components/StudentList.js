import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent, BASE_URL } from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async (search = '') => {
    try {
      setLoading(true);
      const res = await getStudents(search);
      setStudents(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch students. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents(searchTerm);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        setStudents(students.filter((s) => s.id !== id));
      } catch (err) {
        alert('Failed to delete student.');
      }
    }
  };

  if (loading && students.length === 0) return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-secondary">Students Directory</h2>
        <form onSubmit={handleSearch} className="d-flex w-50">
          <input
            type="text"
            className="form-control me-2 shadow-sm"
            placeholder="Search by name, course or admission no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary px-4">Search</button>
        </form>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Photo</th>
                <th>Admission No</th>
                <th>Name</th>
                <th>Course</th>
                <th>Year</th>
                <th>Email</th>
                <th>Mobile</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      {student.photo_url ? (
                        <img
                          src={`${BASE_URL}/uploads/${student.photo_url}`}
                          alt={student.name}
                          className="rounded-circle shadow-sm"
                          style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '45px', height: '45px' }}>
                          <span className="text-muted small">N/A</span>
                        </div>
                      )}
                    </td>
                    <td><span className="badge bg-light text-dark border">{student.admission_no}</span></td>
                    <td className="fw-semibold">{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.year}</td>
                    <td><small>{student.email}</small></td>
                    <td><small>{student.mobile}</small></td>
                    <td className="text-end">
                      <Link to={`/edit/${student.id}`} className="btn btn-sm btn-outline-info me-2">Edit</Link>
                      <button onClick={() => handleDelete(student.id)} className="btn btn-sm btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    No students found. Start by adding one!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
