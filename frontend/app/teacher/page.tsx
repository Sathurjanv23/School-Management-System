"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { markAttendance, getAllAttendance } from "../services/attendanceService";
import { addMarks, getAllMarks } from "../services/marksService";
import { getAllStudents } from "../services/studentService";

export default function TeacherPage() {
  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [attendanceList, setAttendanceList] = useState<any[]>([]);

  const [markStudentName, setMarkStudentName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [marksList, setMarksList] = useState<any[]>([]);

  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    setAttendanceList(await getAllAttendance());
    setMarksList(await getAllMarks());
    setStudents(await getAllStudents());
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleAttendance = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentName || !date || !status) {
      alert("Fill all fields");
      return;
    }

    await markAttendance({ studentName, date, status });
    setStudentName("");
    setDate("");
    setStatus("");
    fetchData();
  };

  const handleMarks = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!markStudentName || !subject || !marks) {
      alert("Fill all fields");
      return;
    }

    await addMarks({
      studentName: markStudentName,
      subject,
      marks: Number(marks),
    });

    setMarkStudentName("");
    setSubject("");
    setMarks("");
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="flex min-h-screen">
        
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-6 py-8 border-b border-white/10">
            <h1 className="text-2xl font-bold">Teacher Panel</h1>
            <p className="text-sm text-slate-300 mt-2">Manage students</p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-3">
            <div className="bg-indigo-500/20 border border-indigo-400/30 px-4 py-3 rounded-2xl text-indigo-200">
              Dashboard
            </div>
            <div className="px-4 py-3 text-slate-300">Attendance</div>
            <div className="px-4 py-3 text-slate-300">Marks</div>
            <div className="px-4 py-3 text-slate-300">Settings</div>
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 py-3 rounded-xl hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 md:p-8 space-y-8">

          {/* Header */}
          <div>
            <p className="text-indigo-300 uppercase text-sm tracking-widest">
              Welcome Back
            </p>
            <h1 className="text-4xl font-bold mt-2">Teacher Dashboard</h1>
          </div>

          {/* Forms */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

            {/* Attendance */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Mark Attendance</h2>

              <form onSubmit={handleAttendance} className="space-y-4">

                <select
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.name} className="text-black">
                      {s.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
                />

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
                >
                  <option value="">Select status</option>
                  <option value="Present" className="text-black">Present</option>
                  <option value="Absent" className="text-black">Absent</option>
                </select>

                <button className="w-full bg-emerald-500 py-3 rounded-xl hover:bg-emerald-400">
                  Mark Attendance
                </button>
              </form>
            </div>

            {/* Marks */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Add Marks</h2>

              <form onSubmit={handleMarks} className="space-y-4">

                <select
                  value={markStudentName}
                  onChange={(e) => setMarkStudentName(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
                >
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.name} className="text-black">
                      {s.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Marks"
                  value={marks}
                  onChange={(e) => setMarks(e.target.value)}
                  className="w-full bg-white/10 border border-white/10 px-4 py-3 rounded-xl"
                />

                <button className="w-full bg-cyan-500 py-3 rounded-xl hover:bg-cyan-400">
                  Add Marks
                </button>
              </form>
            </div>
          </div>

          {/* Tables */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Attendance List</h2>

            <table className="w-full">
              <thead className="text-slate-300">
                <tr>
                  <th className="p-2 text-left">Student</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="p-2">{item.studentName}</td>
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Marks List</h2>

            <table className="w-full">
              <thead className="text-slate-300">
                <tr>
                  <th className="p-2 text-left">Student</th>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-left">Marks</th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="p-2">{item.studentName}</td>
                    <td className="p-2">{item.subject}</td>
                    <td className="p-2">{item.marks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}