export async function addAnnouncement(announcementData: {
  title: string;
  message: string;
}) {
  const response = await fetch("http://localhost:8080/api/announcements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(announcementData),
  });

  return response.json();
}

export async function getAllAnnouncements() {
  const response = await fetch("http://localhost:8080/api/announcements");
  return response.json();
}