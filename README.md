# 🎓 Student Management System - Enterprise Edition

A production-ready Student Management System built with a robust Node.js/PostgreSQL backend and a modern React frontend.

## 🚀 Key Features

- **Full CRUD Operations**: Add, view, edit, and delete student records.
- **Image Management**: Seamless profile photo uploads using Multer with disk storage.
- **Search & Filter**: Real-time searching by name, course, or admission number.
- **Auto-Generated IDs**: Unique Admission Numbers (ADM-timestamp format).
- **Premium UI**: Modern aesthetics with Inter font, glassmorphism-inspired elements, and responsive Bootstrap layout.
- **Data Integrity**: PostgreSQL with proper indexing and unique constraints.

---

## 🛠️ Tech Stack

**Frontend:**
- React 18+ (Functional Components & Hooks)
- Axios (Centralized API Service)
- React Router DOM 6+ (Client-side Routing)
- Bootstrap 5.3 (Styling & Responsiveness)

**Backend:**
- Node.js & Express.js
- PostgreSQL (pg driver)
- Multer (File Upload Handling)
- Dotenv (Environment Management)
- CORS (Cross-Origin Resource Sharing)

---

## 📂 Folder Structure

```text
student-management-system/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── routes/          # API endpoints
│   ├── uploads/         # Student profile photos
│   ├── db/              # SQL migration scripts
│   ├── server.js        # Entry point
│   └── .env             # Environment variables
└── frontend/
    ├── public/          # Static assets
    ├── src/
    │   ├── components/  # UI Components
    │   ├── services/    # API integration
    │   └── App.js       # Main application component
```

---

## ⚙️ Setup Instructions

### 1. Database Setup
1. Create a PostgreSQL database named `student_db`.
2. Execute the migration script located at `backend/db/init.sql`.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Correct the `.env` file with your credentials:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=student_db
   DB_PASSWORD=your_password
   DB_PORT=5432
   ```
3. Run the server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Start the development server:
   ```bash
   npm start
   ```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/students` | Get all students (Search supported via `?search=`) |
| `GET` | `/api/students/:id` | Get single student details |
| `POST` | `/api/students` | Register new student (with photo) |
| `PUT` | `/api/students/:id` | Update student profile |
| `DELETE` | `/api/students/:id` | Remove student record |

---

## 🛡️ Security & Best Practices
- **Input Validation**: Server-side validation for email, mobile, and required fields.
- **Clean Architecture**: Clear separation between routes, controllers, and data logic.
- **Error Handling**: Centralized middleware for catching and logging errors.
- **Resource Management**: automatic deletion of old profile photos when updated or when a student is deleted.
