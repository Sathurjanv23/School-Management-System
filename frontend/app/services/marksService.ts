export async function addMarks(marksData: {
  studentName: string;
  subject: string;
  marks: number;
}) {
  const response = await fetch("http://localhost:8080/api/marks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(marksData),
  });

  return response.json();
}

export async function getAllMarks() {
  const response = await fetch("http://localhost:8080/api/marks");
  return response.json();
}