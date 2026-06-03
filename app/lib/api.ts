// lib/api.ts

const BASE_URL = "http://72.60.99.249:8000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
};

export async function api(path: string, options: RequestOptions = {}) {
  const { method = "GET", body } = options;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }

  return res.json();
}