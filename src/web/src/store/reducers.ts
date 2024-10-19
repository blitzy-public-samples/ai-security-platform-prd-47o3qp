// Importing combineReducers from redux version 4.0.5
import { combineReducers } from 'redux'; // redux@4.0.5

/**
 * authReducer
 * Manages authentication state based on login actions.
 * 
 * Addresses Requirement: State Management
 * Location: Technical Specification/4.6 User and System Management
 * Description: Implement Redux actions and reducers to manage application state effectively.
 */
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      // Updates state when login is successful
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case 'LOGOUT':
      // Resets state on logout
      return initialAuthState;
    default:
      return state;
  }
}

/**
 * incidentReducer
 * Manages state related to incidents based on fetch actions.
 * 
 * Addresses Requirement: State Management
 * Location: Technical Specification/4.6 User and System Management
 * Description: Implement Redux actions and reducers to manage application state effectively.
 */
const initialIncidentState = {
  incidents: [],
  loading: false,
  error: null,
};

function incidentReducer(state = initialIncidentState, action) {
  switch (action.type) {
    case 'FETCH_INCIDENTS_REQUEST':
      // Sets loading state when fetching incidents
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_INCIDENTS_SUCCESS':
      // Stores retrieved incidents in state
      return {
        ...state,
        loading: false,
        incidents: action.payload.incidents,
      };
    case 'FETCH_INCIDENTS_FAILURE':
      // Stores error information in state
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
}

/**
 * rootReducer
 * Combines all reducers into a single reducing function.
 * 
 * Addresses Requirement: State Management
 * Location: Technical Specification/4.6 User and System Management
 * Description: Implement Redux actions and reducers to manage application state effectively.
 */
const rootReducer = combineReducers({
  auth: authReducer,
  incident: incidentReducer,
  // Additional reducers like playbookReducer and notificationsReducer can be added here
});

export default rootReducer;