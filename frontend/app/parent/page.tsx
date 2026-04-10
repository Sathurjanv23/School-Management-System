"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllAttendance } from "../services/attendanceService";
import { getAllMarks } from "../services/marksService";
import { getAllAnnouncements } from "../services/announcementService";

export default function ParentPage() {
  const router = useRouter();

  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [marksList, setMarksList] = useState<any[]>([]);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState("dashboard");

  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const announcementsRef = useRef<HTMLDivElement | null>(null);
  const attendanceRef = useRef<HTMLDivElement | null>(null);
  const marksRef = useRef<HTMLDivElement | null>(null);
  const settingsRef = useRef<HTMLDivElement | null>(null);

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

        console.log("USER =", user);
        console.log("ATTENDANCE =", attendanceData);
        console.log("MARKS =", marksData);

        const filteredAttendance = (attendanceData || []).filter((item: any) =>
          item.studentName?.trim().toLowerCase() ===
          user.name?.trim().toLowerCase()
        );

        const filteredMarks = (marksData || []).filter((item: any) =>
          item.studentName?.trim().toLowerCase() ===
          user.name?.trim().toLowerCase()
        );

        setAttendanceList(filteredAttendance);
        setMarksList(filteredMarks);
        setAnnouncements(announcementData || []);
      } catch (error) {
        console.error("Error fetching parent data:", error);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const scrollToSection = (
    section: string,
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    setActiveSection(section);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const menuClass = (section: string) =>
    activeSection === section
      ? "rounded-2xl bg-indigo-500/20 border border-indigo-400/30 px-4 py-3 text-sm text-indigo-200 w-full text-left transition"
      : "rounded-2xl hover:bg-white/5 px-4 py-3 text-sm text-slate-300 w-full text-left transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-72 flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl sticky top-0 h-screen">
          <div className="px-6 py-8 border-b border-white/10">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Parent Panel
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              Child progress monitoring system
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-3">
            <button
              onClick={() => scrollToSection("dashboard", dashboardRef)}
              className={menuClass("dashboard")}
            >
              Dashboard
            </button>

            <button
              onClick={() => scrollToSection("announcements", announcementsRef)}
              className={menuClass("announcements")}
            >
              Announcements
            </button>

            <button
              onClick={() => scrollToSection("attendance", attendanceRef)}
              className={menuClass("attendance")}
            >
              Attendance
            </button>

            <button
              onClick={() => scrollToSection("marks", marksRef)}
              className={menuClass("marks")}
            >
              Marks
            </button>

            <button
              onClick={() => scrollToSection("settings", settingsRef)}
              className={menuClass("settings")}
            >
              Settings
            </button>
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

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
          {/* Dashboard */}
          <div ref={dashboardRef}>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                  Welcome back
                </p>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold">
                  Parent Dashboard
                </h2>
                <p className="mt-2 text-slate-300">
                  Track your child&apos;s attendance, marks, and school updates.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="lg:hidden w-fit rounded-xl bg-red-500 px-5 py-2.5 font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
                <p className="text-sm text-slate-300">Announcements</p>
                <h3 className="mt-3 text-4xl font-bold text-emerald-300">
                  {announcements.length}
                </h3>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
                <p className="text-sm text-slate-300">Attendance Records</p>
                <h3 className="mt-3 text-4xl font-bold text-cyan-300">
                  {attendanceList.length}
                </h3>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
                <p className="text-sm text-slate-300">Marks Entries</p>
                <h3 className="mt-3 text-4xl font-bold text-pink-300">
                  {marksList.length}
                </h3>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl">
                <p className="text-sm text-slate-300">Status</p>
                <h3 className="mt-3 text-2xl font-bold text-violet-300">
                  Active
                </h3>
              </div>
            </div>
          </div>

          {/* Announcements */}
          <div
            ref={announcementsRef}
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl"
          >
            <div className="mb-5">
              <h3 className="text-2xl font-bold">Announcements</h3>
              <p className="mt-1 text-sm text-slate-300">
                Latest school notices and messages
              </p>
            </div>

            <div className="grid gap-4">
              {announcements.length > 0 ? (
                announcements.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
                  >
                    <h4 className="text-lg font-semibold text-emerald-300">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-slate-300 leading-7">
                      {item.message}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No announcements available</p>
              )}
            </div>
          </div>

          {/* Attendance */}
          <div
            ref={attendanceRef}
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="mb-5">
              <h3 className="text-2xl font-bold">Child Attendance</h3>
              <p className="mt-1 text-sm text-slate-300">
                View your child&apos;s attendance records
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-slate-300">
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.length > 0 ? (
                    attendanceList.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="bg-white/5 hover:bg-white/10 transition"
                      >
                        <td className="rounded-l-2xl px-4 py-4 font-medium">
                          {item.studentName}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {item.date}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-sm border ${
                              item.status === "Present"
                                ? "bg-green-500/20 text-green-300 border-green-400/20"
                                : "bg-red-500/20 text-red-300 border-red-400/20"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-slate-400"
                      >
                        No attendance records
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Marks */}
          <div
            ref={marksRef}
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="mb-5">
              <h3 className="text-2xl font-bold">Child Marks</h3>
              <p className="mt-1 text-sm text-slate-300">
                View subject-wise marks
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-slate-300">
                    <th className="px-4 py-3">Student</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {marksList.length > 0 ? (
                    marksList.map((item, index) => (
                      <tr
                        key={item.id || index}
                        className="bg-white/5 hover:bg-white/10 transition"
                      >
                        <td className="rounded-l-2xl px-4 py-4 font-medium">
                          {item.studentName}
                        </td>
                        <td className="px-4 py-4 text-slate-300">
                          {item.subject}
                        </td>
                        <td className="rounded-r-2xl px-4 py-4">
                          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-200 border border-indigo-400/20">
                            {item.marks}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-6 text-center text-slate-400"
                      >
                        No marks available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Settings */}
          <div
            ref={settingsRef}
            className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl"
          >
            <div className="mb-5">
              <h3 className="text-2xl font-bold">Settings</h3>
              <p className="mt-1 text-sm text-slate-300">
                Account and dashboard options
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-slate-300">
                Parent settings page ready. Later you can add profile edit,
                password change, and notifications here.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}