const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:3000";

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include", // ✅ КЛЮЧОВЕ ДЛЯ COOKIE AUTH
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || data?.detail || "Request failed";
    throw new Error(message);
  }

  return data as T;
}
