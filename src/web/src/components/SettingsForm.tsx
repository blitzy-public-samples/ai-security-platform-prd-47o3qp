// Import necessary libraries and components

// Import React and Component from 'react'
import React, { Component, FormEvent, ChangeEvent } from 'react';

// Import connect from 'react-redux' to connect the component to the Redux store
import { connect } from 'react-redux';

// Import internal dependencies
// Import apiRequest from 'src/web/src/utils/api.ts' to make HTTP requests to the backend services for updating user settings
import apiRequest from '../utils/api';
// Import getAuthToken from 'src/web/src/utils/auth.ts' to retrieve the authentication token for API requests
import { getAuthToken } from '../utils/auth';
// Import updateUserSettings action from 'src/web/src/store/actions.ts' to handle updating user settings in the Redux store
import { updateUserSettings } from '../store/actions';

// Import global styles to ensure consistent design
// Addresses requirement: User Interface Design (Technical Specification/4.1 Dashboard)
// - Ensures a consistent and responsive design across the web application by applying global styles
import '../styles/global.css';

// Import external dependencies
// Import Dispatch from 'redux' (version 4.0.5) for dispatching actions to Redux store
import { Dispatch } from 'redux'; // redux@4.0.5

// Define global constants
// FORM_INITIAL_VALUES holds the initial state values for the form fields
const FORM_INITIAL_VALUES = {
  username: '',
  email: '',
  notifications: false,
};

// Define TypeScript interfaces for props and state
interface SettingsFormProps {
  updateUserSettings: (userData: any) => void;
}

interface SettingsFormState {
  username: string;
  email: string;
  notifications: boolean;
}

/**
 * SettingsForm Component
 *
 * A React component that renders a form for updating user settings.
 *
 * Addresses:
 * - User Interface Design (Technical Specification/4.1 Dashboard):
 *   Ensures a consistent and responsive design across the web application by applying global styles.
 * - User and System Management (Technical Specification/4.6 User and System Management):
 *   Manages user roles, permissions, system configurations, and integrations to ensure operational security and efficiency within the platform.
 */
class SettingsForm extends Component<SettingsFormProps, SettingsFormState> {
  /**
   * Constructor
   *
   * Initializes the component state with default form values.
   * Steps:
   * - Set the initial state using FORM_INITIAL_VALUES.
   */
  constructor(props: SettingsFormProps) {
    super(props);
    this.state = {
      ...FORM_INITIAL_VALUES,
    };

    // Bind the methods to the class instance
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * handleSubmit
   *
   * Handles the form submission event, validates input, and sends the data to the backend.
   *
   * Steps:
   * 1. Prevent the default form submission behavior.
   * 2. Validate the form input fields.
   * 3. Retrieve the authentication token using getAuthToken.
   * 4. Use apiRequest to send the updated settings to the backend.
   * 5. Handle the response to update the user settings in the Redux store.
   *
   * Addresses requirement: User and System Management (Technical Specification/4.6 User and System Management)
   */
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Step 1: Prevent the default form submission behavior.
    event.preventDefault();

    // Step 2: Validate the form input fields.
    const { username, email, notifications } = this.state;
    if (!username || !email) {
      // Simple validation check
      alert('Please fill in all required fields.');
      return;
    }

    // Step 3: Retrieve the authentication token using getAuthToken.
    const authToken = getAuthToken();
    if (!authToken) {
      // Handle missing authentication token (user might need to log in again)
      alert('Authentication required. Please log in again.');
      return;
    }

    // Prepare data to send to the backend
    const data = {
      username,
      email,
      notifications,
    };

    // Step 4: Use apiRequest to send the updated settings to the backend.
    apiRequest('/user/settings', 'POST', data, authToken)
      .then((response) => {
        // Step 5: Handle the response to update the user settings in the Redux store.
        // Dispatch an action to update the user settings in the Redux store
        this.props.updateUserSettings(response.data);

        // Notify the user of success
        alert('Settings updated successfully.');
      })
      .catch((error) => {
        // Handle any errors from the API request
        console.error('Error updating settings:', error);
        alert('Failed to update settings. Please try again later.');
      });
  }

  /**
   * handleChange
   *
   * Handles changes to the form input fields and updates the component state.
   */
  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    } as Pick<SettingsFormState, keyof SettingsFormState>);
  }

  /**
   * render
   *
   * Renders the settings form with input fields and a submit button.
   *
   * Steps:
   * 1. Render input fields for username, email, and notification preferences.
   * 2. Attach handleSubmit to the form's onSubmit event.
   *
   * Addresses requirement: User Interface Design (Technical Specification/4.1 Dashboard)
   */
  render() {
    const { username, email, notifications } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {/* Input field for username */}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </div>
        {/* Input field for email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        {/* Checkbox for notification preferences */}
        <div>
          <label htmlFor="notifications">
            <input
              type="checkbox"
              id="notifications"
              name="notifications"
              checked={notifications}
              onChange={this.handleChange}
            />
            Receive Notifications
          </label>
        </div>
        {/* Submit button */}
        <button type="submit">Update Settings</button>
      </form>
    );
  }
}

/**
 * mapDispatchToProps
 *
 * Maps dispatch actions to component props to update user settings in the Redux store.
 *
 * Addresses requirement: User and System Management (Technical Specification/4.6 User and System Management)
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserSettings: (userData: any) => {
      // Dispatch an action to update the user settings in the Redux store
      dispatch(updateUserSettings(userData));
    },
  };
};

// Export the connected component
export default connect(null, mapDispatchToProps)(SettingsForm);