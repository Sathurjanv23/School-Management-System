"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addStudent, getAllStudents } from "../services/studentService";
import {
  addAnnouncement,
  getAllAnnouncements,
} from "../services/announcementService";

export default function AdminPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [gender, setGender] = useState("");

  const [students, setStudents] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
    fetchAnnouncements();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const data = await getAllAnnouncements();
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleAddStudent = async () => {
    if (!name || !email || !studentClass || !gender) {
      alert("Please fill all student fields");
      return;
    }

    try {
      await addStudent({ name, email, studentClass, gender });

      setName("");
      setEmail("");
      setStudentClass("");
      setGender("");

      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleAddAnnouncement = async () => {
    if (!title || !message) {
      alert("Enter title and message");
      return;
    }

    try {
      await addAnnouncement({ title, message });

      setTitle("");
      setMessage("");

      fetchAnnouncements();
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-6 py-8 border-b border-white/10">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Admin Panel
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              Student management system
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-3">
            <div className="rounded-2xl bg-indigo-500/20 border border-indigo-400/30 px-4 py-3">
              <p className="text-sm text-indigo-200">Dashboard</p>
            </div>
            <div className="rounded-2xl hover:bg-white/5 px-4 py-3 transition">
              <p className="text-sm text-slate-300">Students</p>
            </div>
            <div className="rounded-2xl hover:bg-white/5 px-4 py-3 transition">
              <p className="text-sm text-slate-300">Announcements</p>
            </div>
            <div className="rounded-2xl hover:bg-white/5 px-4 py-3 transition">
              <p className="text-sm text-slate-300">Reports</p>
            </div>
            <div className="rounded-2xl hover:bg-white/5 px-4 py-3 transition">
              <p className="text-sm text-slate-300">Settings</p>
            </div>
          </nav>

          <div className="p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full rounded-2xl bg-red-500 hover:bg-red-600 px-4 py-3 text-sm font-semibold transition"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Top Header */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                Welcome back
              </p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">
                Admin Dashboard
              </h2>
              <p className="mt-2 text-slate-300">
                Manage students, announcements, and monitor system updates.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="lg:hidden w-fit rounded-xl bg-red-500 px-5 py-2.5 font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">Total Students</p>
              <h3 className="mt-3 text-4xl font-bold text-cyan-300">
                {students.length}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">Announcements</p>
              <h3 className="mt-3 text-4xl font-bold text-emerald-300">
                {announcements.length}
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">System Status</p>
              <h3 className="mt-3 text-2xl font-bold text-violet-300">
                Active
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">Today Activity</p>
              <h3 className="mt-3 text-2xl font-bold text-pink-300">
                Running
              </h3>
            </div>
          </div>

          {/* Forms */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            {/* Add Student */}
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Add Student</h3>
                <p className="mt-2 text-slate-300 text-sm">
                  Fill student details and save to the system.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="Student Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />

                <input
                  placeholder="Student Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />

                <input
                  placeholder="Class"
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                />

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
                >
                  <option value="" className="text-black">
                    Select Gender
                  </option>
                  <option value="Male" className="text-black">
                    Male
                  </option>
                  <option value="Female" className="text-black">
                    Female
                  </option>
                </select>

                <button
                  onClick={handleAddStudent}
                  className="w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
                >
                  Add Student
                </button>
              </div>
            </div>

            {/* Add Announcement */}
            <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 md:p-8 shadow-2xl">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Add Announcement</h3>
                <p className="mt-2 text-slate-300 text-sm">
                  Create a new announcement for all students.
                </p>
              </div>

              <div className="space-y-4">
                <input
                  placeholder="Announcement Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                />

                <textarea
                  placeholder="Announcement Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                />

                <button
                  onClick={handleAddAnnouncement}
                  className="w-full rounded-2xl bg-emerald-500 py-3 font-semibold text-slate-950 hover:bg-emerald-400 transition"
                >
                  Post Announcement
                </button>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="mb-8 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Student List</h3>
                <p className="mt-1 text-sm text-slate-300">
                  View all registered students
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-slate-300">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3">Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {students.length > 0 ? (
                    students.map((s) => (
                      <tr
                        key={s.id}
                        className="bg-white/5 hover:bg-white/10 transition"
                      >
                        <td className="rounded-l-2xl px-4 py-4 font-medium">
                          {s.name}
                        </td>
                        <td className="px-4 py-4 text-slate-300">{s.email}</td>
                        <td className="px-4 py-4 text-slate-300">
                          {s.studentClass}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4">
                          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-200 border border-indigo-400/20">
                            {s.gender}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-6 text-center text-slate-400"
                      >
                        No students found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Announcements */}
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
            <div className="mb-5">
              <h3 className="text-2xl font-bold">Announcements</h3>
              <p className="mt-1 text-sm text-slate-300">
                Latest announcements posted by admin
              </p>
            </div>

            <div className="grid gap-4">
              {announcements.length > 0 ? (
                announcements.map((a) => (
                  <div
                    key={a.id}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                  >
                    <h4 className="text-lg font-semibold text-emerald-300">
                      {a.title}
                    </h4>
                    <p className="mt-2 text-slate-300 leading-7">{a.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No announcements available</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}