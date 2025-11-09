// src/utils/api.js

/**
 * Custom fetch function for authenticated API calls.
 * Automatically adds the JWT token from localStorage/AuthContext.
 * @param {string} url - The API endpoint URL.
 * @param {object} options - Fetch options (method, headers, body, etc.).
 * @param {string} token - The JWT token from useAuth.
 * @returns {Promise<Response>} The fetch Response object.
 */
export async function authFetch(url, options = {}, token) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add Authorization header if token is available
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const combinedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const res = await fetch(url, combinedOptions);

  if (res.status === 401 || res.status === 403) {
    // Handle unauthorized access (e.g., token expired)
    console.error("Authentication failed or token expired.");
    // NOTE: The calling component (AdminDashboard, etc.) should handle redirecting to /login
  }

  return res;
}