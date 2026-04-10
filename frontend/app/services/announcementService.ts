export async function addAnnouncement(announcementData: {
  title: string;
  message: string;
}) {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/announcements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(announcementData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to add announcement");
  }

  return data;
}

export async function getAllAnnouncements() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:8080/api/announcements", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch announcements");
  }

  return data;
}

export async function deleteAnnouncement(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8080/api/announcements/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete announcement");
  }

  return response.text();
}