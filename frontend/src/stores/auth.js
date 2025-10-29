import api from "@/services/api";

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
}

export async function register(name, email, password) {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data;
}

export async function me() {
  const { data } = await api.get("/auth/me");
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
