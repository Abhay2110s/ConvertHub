// Talks to the ConvertHub backend (see ../../../backend).
// VITE_API_BASE_URL is set in .env - defaults to the local dev server.

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3000").replace(/\/+$/, "");

// Builds a query string from an object, dropping any empty values.
function toQueryString(params) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") search.set(key, value);
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

// GET <BASE_URL>/api/<path>?<params>, returns parsed JSON.
// Throws an Error with a user-friendly message on any failure -
// network error, timeout, or an { error: { message } } response.
export async function apiGet(path, params = {}) {
  const url = `${BASE_URL}/api/${path}${toQueryString(params)}`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error("Couldn't reach the ConvertHub API. Check your connection and try again.");
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new Error("The ConvertHub API returned an unexpected response.");
  }

  if (!response.ok) {
    throw new Error(body?.error?.message || "The ConvertHub API returned an error.");
  }

  return body;
}
