// LOGIN
export async function loginUser(loginData: {
  email: string;
  password: string;
}) {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginData.email.toLowerCase().trim(),
      password: loginData.password.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

// SIGNUP ✅ (ADD THIS)
export async function signupUser(signupData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const response = await fetch("http://localhost:8080/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: signupData.name.trim(),
      email: signupData.email.toLowerCase().trim(),
      password: signupData.password.trim(),
      role: signupData.role.toUpperCase().trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}