const BASE_URL = "http://localhost:8080/muzstore/ws/public";

async function request<T>(path: string, method: string = "GET", body?: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  if (method === "DELETE" && res.status === 204) return undefined as T;
  return res.json();
}

export default request;