const BASE_URL = "http://localhost:8080/muzstore/ws/public";

async function request<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
  return res.json();
}

export default request;