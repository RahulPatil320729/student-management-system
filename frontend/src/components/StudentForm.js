import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createStudent, getStudent, updateStudent, BASE_URL } from '../services/api';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    course: '',
    year: '',
    dob: '',
    email: '',
    mobile: '',
    gender: 'Male',
    address: '',
  });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await getStudent(id);
      const student = res.data;
      // Format date for input field
      if (student.dob) {
        student.dob = new Date(student.dob).toISOString().split('T')[0];
      }
      setFormData(student);
      if (student.photo_url) {
        setPhotoPreview(`${BASE_URL}/uploads/${student.photo_url}`);
      }
    } catch (err) {
      setError('Failed to fetch student details.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (photo) {
      data.append('photo', photo);
    }

    try {
      if (isEditMode) {
        await updateStudent(id, data);
      } else {
        await createStudent(data);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save student.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-primary text-white p-4">
              <h3 className="mb-0 fw-bold">{isEditMode ? 'Edit Student Details' : 'Register New Student'}</h3>
              <p className="mb-0 opacity-75">Please fill in the information below.</p>
            </div>
            <div className="card-body p-4">
              {error && <div className="alert alert-danger mb-4">{error}</div>}
              
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="row g-3">
                  {/* Photo Upload Section */}
                  <div className="col-12 text-center mb-4">
                    <div className="d-inline-block position-relative">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="rounded-circle shadow"
                          style={{ width: '120px', height: '120px', objectFit: 'cover', border: '4px solid #f8f9fa' }}
                        />
                      ) : (
                        <div
                          className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm"
                          style={{ width: '120px', height: '120px', border: '2px dashed #dee2e6' }}
                        >
                          <i className="bi bi-person text-muted" style={{ fontSize: '3rem' }}>👤</i>
                        </div>
                      )}
                      <label 
                        htmlFor="photo-upload" 
                        className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle"
                        style={{ width: '32px', height: '32px', padding: '0' }}
                      >
                        <span style={{ fontSize: '18px' }}>+</span>
                        <input
                          id="photo-upload"
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    <div className="mt-2 text-muted small">Upload Profile Photo</div>
                  </div>

                  {/* Form Fields */}
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Course *</label>
                    <input
                      type="text"
                      name="course"
                      className="form-control"
                      value={formData.course}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Year</label>
                    <input
                      type="number"
                      name="year"
                      className="form-control"
                      value={formData.year}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Date of Birth</label>
                    <input
                      type="date"
                      name="dob"
                      className="form-control"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Gender</label>
                    <select name="gender" className="form-select" value={formData.gender} onChange={handleChange}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Mobile Number *</label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-3 fw-bold"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving...
                        </>
                      ) : (
                        isEditMode ? 'Update Student' : 'Register Student'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-link w-100 mt-2 text-decoration-none text-muted"
                      onClick={() => navigate('/')}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
