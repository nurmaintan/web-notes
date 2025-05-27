export const BASE_URL = "https://be-auth-intan-663618957788.us-central1.run.app";

// Helper untuk header Authorization
export function authHeader(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}