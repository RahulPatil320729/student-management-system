const pool = require("../config/db");
const fs = require("fs");
const path = require("path");

// Helper function to generate unique admission number
const generateAdmissionNo = () => {
  return `ADM${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

// @desc Fetch all students
// @route GET /students
exports.getAllStudents = async (req, res) => {
  try {
    const { search } = req.query;
    let query = "SELECT * FROM students";
    let params = [];

    if (search) {
      query += " WHERE name ILIKE $1 OR admission_no ILIKE $1 OR course ILIKE $1";
      params.push(`%${search}%`);
    }

    query += " ORDER BY created_at DESC";
    
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error in getAllStudents:", err.message);
    res.status(500).json({ error: "Server error fetching students" });
  }
};

// @desc Fetch single student
// @route GET /students/:id
exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error in getStudentById:", err.message);
    res.status(500).json({ error: "Server error fetching student" });
  }
};

// @desc Add student
// @route POST /students
exports.createStudent = async (req, res) => {
  try {
    const { name, course, year, dob, email, mobile, gender, address } = req.body;
    const photo_url = req.file ? req.file.filename : null;
    const admission_no = generateAdmissionNo();

    // Basic validation
    if (!name || !course || !email || !mobile) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const query = `
      INSERT INTO students (admission_no, name, course, year, dob, email, mobile, gender, address, photo_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;
    const values = [admission_no, name, course, year, dob, email, mobile, gender, address, photo_url];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error in createStudent:", err.message);
    res.status(500).json({ error: "Server error creating student" });
  }
};

// @desc Update student
// @route PUT /students/:id
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, course, year, dob, email, mobile, gender, address } = req.body;
    
    // Check if student exists
    const studentCheck = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    if (studentCheck.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    let photo_url = studentCheck.rows[0].photo_url;
    
    // If new photo uploaded, delete old photo and update filename
    if (req.file) {
      if (photo_url) {
        const oldPath = path.join(__dirname, "../uploads", photo_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      photo_url = req.file.filename;
    }

    const query = `
      UPDATE students 
      SET name = $1, course = $2, year = $3, dob = $4, email = $5, mobile = $6, gender = $7, address = $8, photo_url = $9
      WHERE id = $10
      RETURNING *
    `;
    const values = [name, course, year, dob, email, mobile, gender, address, photo_url, id];

    const result = await pool.query(query, values);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error in updateStudent:", err.message);
    res.status(500).json({ error: "Server error updating student" });
  }
};

// @desc Delete student
// @route DELETE /students/:id
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Get student to delete photo file
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student = result.rows[0];
    if (student.photo_url) {
      const filePath = path.join(__dirname, "../uploads", student.photo_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await pool.query("DELETE FROM students WHERE id = $1", [id]);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    console.error("Error in deleteStudent:", err.message);
    res.status(500).json({ error: "Server error deleting student" });
  }
};
