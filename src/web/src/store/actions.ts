// src/web/src/store/actions.ts

// External dependencies
import { Dispatch } from 'redux'; // redux version 4.0.5
import { ThunkAction } from 'redux-thunk'; // redux-thunk version 2.3.0

// Internal dependencies
import { apiRequest } from '../utils/api'; // Makes HTTP requests to the backend services for various actions.
import { getAuthToken } from '../utils/auth'; // Retrieves the authentication token for API requests.

// Action Types for Authentication
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; // Action type for initiating login.
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // Action type for successful login.
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // Action type for failed login.

// Action Types for Incident Management
export const FETCH_INCIDENTS_REQUEST = 'FETCH_INCIDENTS_REQUEST'; // Action type for initiating fetch incidents.
export const FETCH_INCIDENTS_SUCCESS = 'FETCH_INCIDENTS_SUCCESS'; // Action type for successful fetch incidents.
export const FETCH_INCIDENTS_FAILURE = 'FETCH_INCIDENTS_FAILURE'; // Action type for failed fetch incidents.

// Action Creators for Authentication

/**
 * Action creator for initiating a login request.
 */
export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

/**
 * Action creator for a successful login.
 * @param user - The user information returned from the API.
 */
export const loginSuccess = (user: any) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

/**
 * Action creator for a failed login.
 * @param error - The error message returned from the API.
 */
export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Action Creators for Incident Management

/**
 * Action creator for initiating a fetch incidents request.
 */
export const fetchIncidentsRequest = () => ({
  type: FETCH_INCIDENTS_REQUEST,
});

/**
 * Action creator for a successful fetch incidents.
 * @param incidents - The list of incidents returned from the API.
 */
export const fetchIncidentsSuccess = (incidents: any[]) => ({
  type: FETCH_INCIDENTS_SUCCESS,
  payload: incidents,
});

/**
 * Action creator for a failed fetch incidents.
 * @param error - The error message returned from the API.
 */
export const fetchIncidentsFailure = (error: string) => ({
  type: FETCH_INCIDENTS_FAILURE,
  payload: error,
});

// Thunk Actions

/**
 * Dispatches an action to log in a user by verifying credentials and updating the authentication state.
 *
 * Implements requirements:
 * - State Management (Technical Specification/4.6 User and System Management)
 *   - TR-USM-006-2: Develop user management interfaces for creating and modifying user accounts.
 *   - TR-USM-006-4: Ensure multi-factor authentication (MFA) for all user accesses.
 *
 * @param username - The username of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns A function that dispatches actions based on API call results.
 */
export const loginUser = (username: string, password: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(loginRequest()); // Dispatching login request action.
    try {
      // Retrieve the authentication token using getAuthToken.
      const authToken = getAuthToken();
      // Use apiRequest to send login credentials to the backend.
      const response = await apiRequest('/auth/login', 'POST', { username, password }, authToken);
      // Dispatch an action to update the authReducer with the login status and user information.
      dispatch(loginSuccess(response.user));
    } catch (error: any) {
      // Handle any errors by dispatching an error action.
      dispatch(loginFailure(error.message));
    }
  };
};

/**
 * Dispatches an action to fetch incidents from the backend and update the incidents state.
 *
 * Implements requirements:
 * - State Management (Technical Specification/4.6 User and System Management)
 *   - TR-USM-006-5: Monitor and log all user and system activities for auditing purposes.
 *
 * @returns A function that dispatches actions based on API call results.
 */
export const fetchIncidents = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchIncidentsRequest()); // Dispatching fetch incidents request action.
    try {
      // Retrieve the authentication token using getAuthToken.
      const authToken = getAuthToken();
      // Use apiRequest to fetch the list of incidents from the backend.
      const response = await apiRequest('/incidents', 'GET', null, authToken);
      // Dispatch an action to update the incidentReducer with the fetched incidents.
      dispatch(fetchIncidentsSuccess(response.incidents));
    } catch (error: any) {
      // Handle any errors by dispatching an error action.
      dispatch(fetchIncidentsFailure(error.message));
    }
  };
};