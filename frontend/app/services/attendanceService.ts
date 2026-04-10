export async function markAttendance(attendanceData: {
  studentName: string;
  date: string;
  status: string;
}) {
  const response = await fetch("http://localhost:8080/api/attendance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attendanceData),
  });

  return response.json();
}

export async function getAllAttendance() {
  const response = await fetch("http://localhost:8080/api/attendance");
  return response.json();
}