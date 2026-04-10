"use client";

import { useEffect, useState } from "react";
import {
  addActivity,
  deleteActivity,
  getAllActivities,
  updateActivity,
} from "../../services/activityService";

export default function AdminActivitiesPage() {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityName, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");
  const [remarks, setRemarks] = useState("");

  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const data = await getAllActivities();
      setActivities(data || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const resetForm = () => {
    setStudentId("");
    setStudentName("");
    setActivityType("");
    setActivityName("");
    setDescription("");
    setDate("");
    setResult("");
    setRemarks("");
    setEditingId(null);
  };

  const handleSaveActivity = async () => {
    if (!studentName || !activityType || !activityName || !date) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      studentId,
      studentName,
      activityType,
      activityName,
      description,
      date,
      result,
      remarks,
    };

    try {
      if (editingId) {
        await updateActivity(editingId, payload);
        alert("Activity updated successfully");
      } else {
        await addActivity(payload);
        alert("Activity added successfully");
      }

      resetForm();
      fetchActivities();
    } catch (error) {
      console.error("Error saving activity:", error);
      alert("Failed to save activity");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setStudentId(item.studentId || "");
    setStudentName(item.studentName || "");
    setActivityType(item.activityType || "");
    setActivityName(item.activityName || "");
    setDescription(item.description || "");
    setDate(item.date || "");
    setResult(item.result || "");
    setRemarks(item.remarks || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this activity?");
    if (!confirmDelete) return;

    try {
      await deleteActivity(id);
      alert("Activity deleted successfully");
      fetchActivities();
    } catch (error) {
      console.error("Error deleting activity:", error);
      alert("Failed to delete activity");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
          Activity Management
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
          Admin Activities
        </h1>
        <p className="mt-2 text-slate-300">
          Add, edit, and delete student activity records.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl mb-8">
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Activity" : "Add Activity"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
          />

          <input
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
          />

          <input
            placeholder="Activity Type"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
          />

          <input
            placeholder="Activity Name"
            value={activityName}
            onChange={(e) => setActivityName(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
          />

          <input
            placeholder="Result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
          />
        </div>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[100px] mt-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
        />

        <textarea
          placeholder="Remarks"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full min-h-[100px] mt-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white outline-none"
        />

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSaveActivity}
            className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
          >
            {editingId ? "Update Activity" : "Add Activity"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="rounded-2xl bg-slate-600 px-5 py-3 font-semibold hover:bg-slate-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
        <h2 className="text-2xl font-bold mb-5">Activities List</h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-slate-300">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Activity</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Result</th>
                <th className="px-4 py-3">Remarks</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="bg-white/5 hover:bg-white/10 transition"
                  >
                    <td className="rounded-l-2xl px-4 py-4 font-medium">
                      {item.studentName}
                    </td>
                    <td className="px-4 py-4 text-slate-300">
                      {item.activityType}
                    </td>
                    <td className="px-4 py-4 text-slate-300">
                      {item.activityName}
                    </td>
                    <td className="px-4 py-4 text-slate-300">{item.date}</td>
                    <td className="px-4 py-4 text-slate-300">{item.result}</td>
                    <td className="px-4 py-4 text-slate-300">{item.remarks}</td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-yellow-400 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold hover:bg-red-400 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-6 text-center text-slate-400"
                  >
                    No activities found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}