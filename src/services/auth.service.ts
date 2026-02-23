import { apiFetch } from "./api";

export type LoginRequest = { email: string; password: string };
export type SignupRequest = { username: string; email: string; password: string };

export type MeResponse = {
  id: number | string;
  username: string;
  email: string;
};

export async function login(req: LoginRequest) {
  // бекенд поставить cookies сам
  return apiFetch<unknown>("/auth/login", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function signup(req: SignupRequest) {
  return apiFetch<unknown>("/auth/register", {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export async function me() {
  return apiFetch<MeResponse>("/user/me");
}

// якщо є ендпоінт для виходу:
export async function logout() {
  return apiFetch<unknown>("/auth/logout", { method: "POST" });
}

export async function refresh() {
  return apiFetch("/auth/refresh", {
    method: "POST",
  });
}
