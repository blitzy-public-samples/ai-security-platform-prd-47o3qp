/**
 * Utility functions for making HTTP requests to the backend services,
 * handling API endpoints, and managing request headers, including authentication tokens.
 * 
 * Requirements Addressed:
 * - API Management (Technical Specification/4.21 API Management)
 *   - TR-API-021: Manage APIs effectively to ensure secure, reliable, and scalable interactions
 *     between the platform and external systems, supporting both internal and third-party integrations.
 */

// Importing axios for handling HTTP requests to the backend services
// Version: 0.21.1
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Importing getAuthToken utility to retrieve the authentication token for API requests
import { getAuthToken } from './auth';

// BASE_API_URL: The base URL for the backend API endpoints
const BASE_API_URL = 'https://api.example.com'; // TODO: Replace with the actual base URL

/**
 * Makes an HTTP request to a specified API endpoint with the given options,
 * including headers and authentication token.
 * 
 * @param endpoint - The API endpoint to which the request is made.
 * @param options - Axios request configuration options.
 * @returns A promise that resolves to the response data from the API.
 * 
 * Steps:
 * 1. Retrieve the authentication token using getAuthToken.
 * 2. Set up request headers, including the Authorization header with the token.
 * 3. Use axios to make the HTTP request to the specified endpoint with the provided options.
 * 4. Return the response data from the API.
 * 
 * Requirements Addressed:
 * - API Management (Technical Specification/4.21 API Management)
 *   - TR-API-021-4: Secure APIs with authentication mechanisms such as OAuth 2.0 and API keys.
 */
export async function apiRequest(endpoint: string, options: AxiosRequestConfig = {}): Promise<any> {
  try {
    // Step 1: Retrieve the authentication token using getAuthToken
    const authToken = getAuthToken();

    // Step 2: Set up request headers, including the Authorization header with the token
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      ...options.headers,
    };

    // Merge the provided options with the default headers
    const config: AxiosRequestConfig = {
      ...options,
      headers,
      url: `${BASE_API_URL}${endpoint}`, // Construct full URL
    };

    // Step 3: Use axios to make the HTTP request to the specified endpoint with the provided options
    const response: AxiosResponse = await axios(config);

    // Step 4: Return the response data from the API
    return response.data;
  } catch (error) {
    // Handle errors appropriately
    // Requirements Addressed:
    // - API Management (Technical Specification/4.21 API Management)
    //   - TR-API-021-6: Monitor API performance and usage metrics for optimization and troubleshooting.
    // For now, we re-throw the error to be handled by the calling function
    throw error;
  }
}