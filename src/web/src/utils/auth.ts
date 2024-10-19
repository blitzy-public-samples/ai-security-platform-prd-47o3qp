// External Dependencies
// jwt-decode v3.1.2
import jwt_decode from 'jwt-decode';

// Internal Dependencies
import { apiRequest } from './api';

/**
 * Key used to store the authentication token in local storage.
 * Requirement Addressed: User Authentication and Token Management
 * Location: Technical Specification/4.6 User and System Management
 */
const AUTH_TOKEN_KEY = 'authToken';

/**
 * Retrieves the authentication token from local storage.
 *
 * Requirement Addressed: Implement secure user authentication mechanisms and manage JWT tokens for session management.
 * Location: Technical Specification/4.6 User and System Management
 *
 * @returns {string | null} The authentication token if it exists, otherwise null.
 */
export function getAuthToken(): string | null {
  // Access the local storage to retrieve the token using AUTH_TOKEN_KEY
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  // Return the token if it exists, otherwise return null
  return token ? token : null;
}

/**
 * Stores the authentication token in local storage.
 *
 * Requirement Addressed: Implement secure user authentication mechanisms and manage JWT tokens for session management.
 * Location: Technical Specification/4.6 User and System Management
 *
 * @param {string} token - The authentication token to store.
 * @returns {void} No return value.
 */
export function setAuthToken(token: string): void {
  // Store the provided token in local storage using AUTH_TOKEN_KEY
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Removes the authentication token from local storage.
 *
 * Requirement Addressed: Implement secure user authentication mechanisms and manage JWT tokens for session management.
 * Location: Technical Specification/4.6 User and System Management
 *
 * @returns {void} No return value.
 */
export function removeAuthToken(): void {
  // Remove the token from local storage using AUTH_TOKEN_KEY
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

/**
 * Checks the validity of the current authentication token.
 *
 * Requirement Addressed: Implement secure user authentication mechanisms and manage JWT tokens for session management.
 * Location: Technical Specification/4.6 User and System Management
 *
 * @returns {boolean} True if the token is valid, otherwise false.
 */
export function isTokenValid(): boolean {
  // Retrieve the token using getAuthToken
  const token = getAuthToken();
  if (!token) {
    // If there is no token, it is not valid
    return false;
  }

  try {
    // Decode the token using jwt-decode to extract the expiration time
    const decodedToken: { exp: number } = jwt_decode(token);
    // Get the current time in seconds
    const currentTime = Date.now() / 1000;

    // Check if the current time is before the expiration time
    if (decodedToken && decodedToken.exp && currentTime < decodedToken.exp) {
      // Return true if valid
      return true;
    } else {
      // Token has expired
      return false;
    }
  } catch (error) {
    // If there is an error decoding the token, consider it invalid
    return false;
  }
}