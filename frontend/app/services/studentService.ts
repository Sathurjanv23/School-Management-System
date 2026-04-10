export async function addStudent(studentData: {
  name: string;
  email: string;
  studentClass: string;
  gender: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add student");
  }

  return data;
}

export async function getAllStudents() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch students");
  }

  return data;
}

export async function deleteStudent(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8080/api/students/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete student");
  }

  return response.text();
}

export async function updateStudent(
  id: string,
  studentData: {
    name: string;
    email: string;
    studentClass: string;
    gender: string;
  }
) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8080/api/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update student");
  }

  return data;
}

export async function sendMailToParent(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8080/api/students/${id}/send-mail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.text();

  if (!response.ok) {
    throw new Error(data || "Failed to send mail to parent");
  }

  return data;
}