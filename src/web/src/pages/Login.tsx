// Login.tsx
// This component renders the login form and handles user authentication.
// Requirements Addressed:
// - "User Authentication and Token Management" (Technical Specification/4.6 User and System Management)
//   - Implements secure user authentication mechanisms.
//   - Manages JWT tokens for session management.

// React version 17.0.2
import React, { useState } from 'react';
// React Router version 5.2.0
import { useHistory } from 'react-router-dom';

// Internal Dependencies
import { getAuthToken, setAuthToken } from '../utils/auth'; // Retrieves and stores the authentication token.
// Purpose: Manages JWT tokens for API requests and session management (src/web/src/utils/auth.ts).
import { apiRequest } from '../utils/api'; // Handles HTTP requests to the backend services.
// Purpose: Facilitates communication with backend for login operations (src/web/src/utils/api.ts).
import Header from '../components/Header'; // Renders the top navigation bar for the login page.
// Purpose: Provides consistent header across pages (src/web/src/components/Header.tsx).
import Footer from '../components/Footer'; // Renders the footer section for the login page.
// Purpose: Provides consistent footer across pages (src/web/src/components/Footer.tsx).

// Define the Login functional component.
const Login: React.FC = () => {
  // Use useState to manage form input states for username and password.
  const [username, setUsername] = useState(''); // Stores the input value for username.
  const [password, setPassword] = useState(''); // Stores the input value for password.
  const [error, setError] = useState(''); // Stores any error messages to display to the user.

  const history = useHistory(); // Allows navigation to different pages after successful login.

  // Define a handleSubmit function to handle form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior.

    try {
      // Use apiRequest to send login credentials to the backend.
      // Addresses 'Implement secure user authentication mechanisms' (Technical Specification/4.6 User and System Management).
      const response = await apiRequest('/login', 'POST', {
        username,
        password,
      });

      // On successful login, store the authentication token using setAuthToken.
      // Addresses 'Manages JWT tokens for session management' (Technical Specification/4.6 User and System Management).
      setAuthToken(response.token);

      // Redirect the user to the dashboard page using React Router.
      history.push('/dashboard');
    } catch (err) {
      // Handles any errors during login and displays an appropriate message.
      setError('Invalid username or password.');
    }
  };

  // Render the login form using JSX.
  return (
    <div>
      <Header />
      <div style={styles.loginForm}>
        <h2>Login</h2>
        {/* Display error message if login fails */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label><br />
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Updates username state on change.
              required
            /><br />
          </div>
          <div>
            <label htmlFor="password">Password:</label><br />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Updates password state on change.
              required
            /><br />
          </div>
          <button type="submit">Login</button> {/* Submits the form and triggers handleSubmit */}
        </form>
      </div>
      <Footer />
    </div>
  );
};

// Styles for the login form.
// As specified in the JSON schema under 'styles'.
// Purpose: Provides styling to align with the application's design guidelines.
const styles = {
  loginForm: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Aligns items vertically.
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'BACKGROUND_COLOR', // Placeholder for actual background color.
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  } as React.CSSProperties,
};

export default Login;