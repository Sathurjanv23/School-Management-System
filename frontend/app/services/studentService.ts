export async function addStudent(studentData: {
  name: string;
  email: string;
  studentClass: string;
  gender: string;
}) {
  const response = await fetch("http://localhost:8080/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return response.json();
}

export async function getAllStudents() {
  const response = await fetch("http://localhost:8080/api/students");
  return response.json();
}

export async function deleteStudent(id: string) {
  const response = await fetch(`http://localhost:8080/api/students/${id}`, {
    method: "DELETE",
  });

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
  const response = await fetch(`http://localhost:8080/api/students/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(studentData),
  });

  return response.json();
}