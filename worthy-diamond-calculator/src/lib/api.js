const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

async function handleJson(res) {
    if (!res.ok) {
        const msg = (await res.json().catch(() => null))?.error || "Server error";
        throw new Error(msg);
    }
    return res.json();
}

export async function estimatePrice(payload) {
    const res = await fetch(`${API_BASE_URL}/api/pricing/estimate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return handleJson(res);
}

export async function fetchSimilar(payload) {
    const res = await fetch(`${API_BASE_URL}/api/diamonds/similar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    return handleJson(res);
}

export async function fetchMeta() {
  const res = await fetch(`${API_BASE_URL}/api/diamonds/meta`);
  if (!res.ok) throw new Error("Failed to load diamond metadata");
  return res.json();
}