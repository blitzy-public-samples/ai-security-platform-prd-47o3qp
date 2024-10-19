// src/web/src/store/store.ts

// Importing Redux functions and middleware from redux@4.0.5
// These are essential for creating the store, applying middleware, and combining reducers.
import { createStore, applyMiddleware, combineReducers } from 'redux'; // redux@4.0.5

// Importing thunk middleware from redux-thunk@2.3.0
// Thunk middleware allows for writing action creators that return functions, enabling async operations.
import thunk from 'redux-thunk'; // redux-thunk@2.3.0

// Importing internal reducers from reducers.ts
// - authReducer: Manages authentication state based on login actions.
// - incidentReducer: Manages state related to incidents based on fetch actions.
import { authReducer, incidentReducer } from './reducers';

// Importing internal utilities (included as dependencies)
// - apiRequest: Makes HTTP requests to the backend services for various actions.
// - getAuthToken: Retrieves the authentication token for API requests.
// Note: While not used directly here, these utilities support asynchronous actions in action creators.
import { apiRequest } from '../utils/api';
import { getAuthToken } from '../utils/auth';

/**
 * Combines the application's reducers into a single root reducer.
 * This is necessary to manage different slices of the application state effectively.
 *
 * Addresses Requirement:
 * - State Management
 *   - Location: Technical Specification/4.6 User and System Management
 *   - Description: Implement Redux actions and reducers to manage application state effectively.
 */
const rootReducer = combineReducers({
  auth: authReducer,      // Handles authentication state
  incident: incidentReducer, // Handles incident-related state
  // Additional reducers can be added here
});

/**
 * Configures and creates the Redux store with middleware.
 * Applies redux-thunk middleware to handle asynchronous actions.
 *
 * Steps:
 * 1. Import necessary reducers from reducers.ts.
 * 2. Combine reducers using combineReducers.
 * 3. Apply middleware using applyMiddleware with redux-thunk.
 * 4. Create the Redux store using createStore with the combined reducers and middleware.
 * 5. Return the configured store.
 *
 * Returns:
 * - The configured Redux store.
 *
 * Addresses Requirement:
 * - State Management
 *   - Location: Technical Specification/4.6 User and System Management
 *   - Description: Implement Redux actions and reducers to manage application state effectively.
 */
export const configureStore = () => {
  // Applying middleware to enhance the store's dispatch function
  const middleware = [thunk]; // Including redux-thunk middleware for handling async operations

  // Creating the Redux store with the rootReducer and middleware
  const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
  );

  return store;
};