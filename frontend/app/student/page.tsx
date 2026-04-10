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
      const attendanceData = await getAllAttendance();
      const marksData = await getAllMarks();
      const announcementData = await getAllAnnouncements();

      const filteredAttendance = attendanceData.filter(
        (item: any) => item.studentName === user.name
      );

      const filteredMarks = marksData.filter(
        (item: any) => item.studentName === user.name
      );

      setAttendanceList(filteredAttendance);
      setMarksList(filteredMarks);
      setAnnouncements(announcementData);
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-yellow-700">Student Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Announcements</h2>
        {announcements.map((item) => (
          <div key={item.id} className="border p-3 mb-3 rounded">
            <h3 className="font-bold">{item.title}</h3>
            <p>{item.message}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Attendance</h2>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-yellow-100">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.studentName}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">My Marks</h2>

        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-yellow-100">
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Subject</th>
              <th className="border p-2">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marksList.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.studentName}</td>
                <td className="border p-2">{item.subject}</td>
                <td className="border p-2">{item.marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}