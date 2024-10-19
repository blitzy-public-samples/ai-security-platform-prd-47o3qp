// Import necessary modules and dependencies.

// External dependencies.

// Import React and React Hooks.
// Version: react@17.0.2
import React, { useState, useEffect } from 'react';

// Internal dependencies.

// Import Header component.
// Purpose: Renders the top navigation bar for the registration page.
import Header from '../components/Header';

// Import Footer component.
// Purpose: Renders the footer section for the registration page.
import Footer from '../components/Footer';

// Import apiRequest utility.
// Purpose: Handles HTTP requests to the backend services for registration.
import { apiRequest } from '../utils/api';

// Import getAuthToken utility.
// Purpose: Manages authentication tokens for secure API communication.
import { getAuthToken } from '../utils/auth';

// Import global CSS.
// Purpose: Ensures consistent typography and applies the primary color theme.
import '../styles/global.css';

// Define the REGISTER_API_ENDPOINT.
// Purpose: The API endpoint for submitting registration data.
const REGISTER_API_ENDPOINT = '/api/register';

// Styles for the registration form.
// Addresses consistent styling requirements as per Technical Specification/4.6 User and System Management.
const styles = {
  registerForm: {
    fontFamily: 'var(--BODY_FONT_FAMILY)', // Uses BODY_FONT_FAMILY from global CSS variables.
    backgroundColor: 'var(--BACKGROUND_COLOR)', // Uses BACKGROUND_COLOR from global CSS variables.
    border: '1px solid #bdc3c7',
    borderRadius: '4px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '400px',
  },
  formField: {
    marginBottom: '15px',
  },
  formLabel: {
    display: 'block',
    marginBottom: '5px',
  },
  formInput: {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box' as 'border-box',
  },
  submitButton: {
    backgroundColor: 'var(--PRIMARY_COLOR)', // Uses PRIMARY_COLOR from global CSS variables.
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  errorMessage: {
    color: 'red',
    marginBottom: '10px',
  },
};

// Register functional component.
// Description: Renders the registration form and handles user input, validation, and submission.
// Addresses requirement: "User Registration".
// Location: Technical Specification/4.6 User and System Management.
const Register: React.FC = () => {
  // Initialize state variables for form fields using useState.
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect to perform side effects such as clearing messages on component mount.
  // Addresses requirement for side effects handling.
  // Location: External Dependency "useEffect" from react@17.0.2.
  useEffect(() => {
    setErrorMessage('');
    setSuccessMessage('');
  }, []);

  // Define a function to handle form submission, including input validation and API request using apiRequest.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Input validation.
    if (!username || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Clear any existing error messages.
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      // Prepare registration data.
      const registrationData = {
        username,
        email,
        password,
      };

      // Submit registration data to the backend using apiRequest.
      // Addresses backend communication for account creation.
      // Location: Technical Specification/4.6 User and System Management.
      const response = await apiRequest('POST', REGISTER_API_ENDPOINT, registrationData);

      // Handle successful registration.
      setSuccessMessage('Registration successful. Please log in.');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      // Handle registration errors.
      setErrorMessage(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render the registration form with form fields for user details.
  // Apply styles using the imported global CSS variables.
  return (
    <div>
      {/* Renders the Header component. */}
      <Header />

      <div style={styles.registerForm}>
        <h2>Register</h2>

        {/* Displays error messages if any. */}
        {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}

        {/* Displays success message upon successful registration. */}
        {successMessage && <div>{successMessage}</div>}

        <form onSubmit={handleSubmit}>
          {/* Username field */}
          <div style={styles.formField}>
            <label htmlFor="username" style={styles.formLabel}>
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              style={styles.formInput}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email field */}
          <div style={styles.formField}>
            <label htmlFor="email" style={styles.formLabel}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.formInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password field */}
          <div style={styles.formField}>
            <label htmlFor="password" style={styles.formLabel}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.formInput}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password field */}
          <div style={styles.formField}>
            <label htmlFor="confirmPassword" style={styles.formLabel}>
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              style={styles.formInput}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button type="submit" style={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>

      {/* Renders the Footer component. */}
      <Footer />
    </div>
  );
};

export default Register;