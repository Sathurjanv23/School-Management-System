# 🎓 School Management System

A full-stack **School Management System** with role-based access for Admin, Teacher, Student, and Parent.

Built using **Next.js, Spring Boot, MongoDB, and JWT Authentication**.

---

## 🚀 Features

### 🔐 Authentication
- Login & Signup
- JWT Token Authentication
- Role-based redirection
- Protected routes
- Logout functionality
- Forgot & Reset Password

---

### 👨‍💼 Admin Dashboard
- Add Students
- View Student List
- Post Announcements

---

### 👩‍🏫 Teacher Dashboard
- Mark Attendance
- Add Student Marks
- View Attendance & Marks

---

### 🎓 Student Dashboard
- View Own Attendance
- View Own Marks
- View Announcements

---

### 👨‍👩‍👧 Parent Dashboard
- View Child Attendance
- View Child Marks
- View Announcements

---

## 🛠 Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Spring Boot
- Spring Security
- JWT

### Database
- MongoDB

---

## 🔄 System Flow

1. User logs in with email & password  
2. Backend validates and generates JWT token  
3. Token stored in localStorage  
4. User redirected based on role:

- ADMIN → `/admin`
- TEACHER → `/teacher`
- STUDENT → `/student`
- PARENT → `/parent`

---

## 🗄 Database Collections

- users  
- students  
- attendance  
- marks  
- announcements  

---

## 🔒 Security

- JWT Authentication  
- Role-based Access Control  
- Protected APIs  
- CORS Enabled  

---

## 📂 Project Structure
School-Management/
├── backend/ # Spring Boot API
├── frontend/ # Next.js UI
└── README.md

---

## ⚙️ How to Run

### Backend
cd backend
mvn spring-boot:run

cd frontend
npm install
npm run dev


---

## 📌 Status

✅ Authentication System  
✅ Role-based Dashboards  
✅ Student Management  
✅ Attendance & Marks  
✅ Announcements  
✅ JWT Security  
✅ Forgot Password  

---

## 🚀 Future Improvements

- Parent-child relation mapping  
- Edit/Delete Marks  
- Attendance percentage  
- Profile page  
- Timetable system  
- Fee management  

---

## 💡 Conclusion

This project demonstrates a **real-world full-stack application** with secure authentication, role-based access, and complete academic workflow management.

---

⭐ If you like this project, feel free to star the repository!
