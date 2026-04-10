"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllAttendance } from "../services/attendanceService";
import { getAllMarks } from "../services/marksService";
import { getAllAnnouncements } from "../services/announcementService";

export default function StudentPage() {
  const router = useRouter();

  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [marksList, setMarksList] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const attendanceData = await getAllAttendance();
        const marksData = await getAllMarks();
        const announcementData = await getAllAnnouncements();

        const filteredAttendance = (attendanceData || []).filter(
          (item: any) => item.studentName === user.name
        );

        const filteredMarks = (marksData || []).filter(
          (item: any) => item.studentName === user.name
        );

        setAttendanceList(filteredAttendance);
        setMarksList(filteredMarks);
        setAnnouncements(announcementData || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="px-6 py-8 border-b border-white/10">
            <h1 className="text-2xl font-bold">Student Panel</h1>
            <p className="text-sm text-slate-300 mt-2">My Academic Info</p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-3">
            <div className="bg-indigo-500/20 border border-indigo-400/30 px-4 py-3 rounded-2xl text-indigo-200">
              Dashboard
            </div>
            <div className="px-4 py-3 text-slate-300">Announcements</div>
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
              Welcome
            </p>
            <h1 className="text-4xl font-bold mt-2">Student Dashboard</h1>
            <p className="text-slate-300 mt-2">
              View your attendance, marks, and announcements
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">Announcements</p>
              <h3 className="text-4xl font-bold text-emerald-300 mt-2">
                {announcements.length}
              </h3>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">Attendance</p>
              <h3 className="text-4xl font-bold text-cyan-300 mt-2">
                {attendanceList.length}
              </h3>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <p className="text-sm text-slate-300">Marks</p>
              <h3 className="text-4xl font-bold text-pink-300 mt-2">
                {marksList.length}
              </h3>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Announcements</h2>

            <div className="space-y-4">
              {announcements.length > 0 ? (
                announcements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl"
                  >
                    <h3 className="text-lg font-semibold text-emerald-300">
                      {item.title}
                    </h3>
                    <p className="text-slate-300 mt-1">{item.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No announcements</p>
              )}
            </div>
          </div>

          {/* Attendance */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">My Attendance</h2>

            <table className="w-full">
              <thead className="text-slate-300">
                <tr>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceList.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="p-2">{item.date}</td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          item.status === "Present"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Marks */}
          <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">My Marks</h2>

            <table className="w-full">
              <thead className="text-slate-300">
                <tr>
                  <th className="p-2 text-left">Subject</th>
                  <th className="p-2 text-left">Marks</th>
                </tr>
              </thead>
              <tbody>
                {marksList.map((item) => (
                  <tr key={item.id} className="border-t border-white/10">
                    <td className="p-2">{item.subject}</td>
                    <td className="p-2">
                      <span className="bg-indigo-500/20 px-3 py-1 rounded-full text-indigo-200">
                        {item.marks}
                      </span>
                    </td>
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