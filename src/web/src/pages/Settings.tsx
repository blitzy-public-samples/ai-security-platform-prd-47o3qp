/**
 * SettingsPage Component
 * 
 * This component renders the Settings page, providing an interface for users to manage their personal settings and preferences within the web application.
 * 
 * Requirements addressed:
 * 
 * - **User Interface Design** *(Technical Specification/4.1 Dashboard)*:
 *   - Ensures a consistent and responsive design across the web application by applying global styles.
 * - **User and System Management** *(Technical Specification/4.6 User and System Management)*:
 *   - Allows users to manage their roles, permissions, system configurations, and integrations to ensure operational security and efficiency within the platform.
 */

// Import necessary modules and dependencies

// External dependencies
import React from 'react'; // React version 17.0.2 - Used to create and manage the component's lifecycle and rendering.
import { useSelector } from 'react-redux'; // react-redux version 7.2.4 - Connects the React component to the Redux store.

// Internal dependencies
import Header from '../components/Header'; // Renders the top navigation bar for the Settings page.
import Footer from '../components/Footer'; // Renders the footer section for the Settings page.
import Sidebar from '../components/Sidebar'; // Provides navigational links to other sections of the application.
import SettingsForm from '../components/SettingsForm'; // Handles user input for updating personal settings.

import { getAuthToken } from '../utils/auth'; // Retrieves the authentication token for API requests.
import { apiRequest } from '../utils/api'; // Makes HTTP requests to the backend services for updating settings.

import { authReducer } from '../store/reducers'; // Manages authentication state based on user actions.

import '../styles/global.css'; // Applies global styles to ensure consistent design.
// Addresses requirement: User Interface Design (Technical Specification/4.1 Dashboard)

// Define the SettingsPage functional component
const SettingsPage: React.FC = () => {
  // Use useSelector from react-redux to access the global state
  // Access the authentication state from the Redux store
  const authState = useSelector((state: any) => state.auth);

  /**
   * The component applies styles using the imported global CSS variables to ensure a consistent and responsive design.
   * This addresses the requirement: User Interface Design (Technical Specification/4.1 Dashboard).
   */

  // Return the JSX for the Settings page component
  return (
    <div className="settings-page">
      {/* Render the Header component */}
      {/* Provides the top navigation bar */}
      <Header />

      {/* Page container to hold Sidebar and main content */}
      <div className="page-container">
        {/* Render the Sidebar component */}
        {/* Provides navigational links to other sections */}
        <Sidebar />

        {/* Main content area */}
        <main className="main-content">
          {/* Render the SettingsForm component for user input */}
          {/* Allows users to update their personal settings and preferences */}
          {/* Addresses requirement: User and System Management (Technical Specification/4.6 User and System Management) */}
          <SettingsForm />
        </main>
      </div>

      {/* Render the Footer component */}
      {/* Provides the footer section */}
      <Footer />
    </div>
  );
};

export default SettingsPage;