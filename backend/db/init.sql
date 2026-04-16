-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    admission_no VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    course VARCHAR(255) NOT NULL,
    year INTEGER,
    dob DATE,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    gender VARCHAR(20),
    address TEXT,
    photo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for faster search
CREATE INDEX IF NOT EXISTS idx_student_name ON students(name);
CREATE INDEX IF NOT EXISTS idx_student_admission ON students(admission_no);
