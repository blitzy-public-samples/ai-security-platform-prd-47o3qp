// src/web/src/components/Sidebar.tsx

// Import React to create and manage the Sidebar component.
// External Dependency: React v17.0.2
import React from 'react';

// Import necessary modules from React Router for navigation links.
// External Dependency: React Router v5.2.0
import { NavLink } from 'react-router-dom';

// Import internal components for consistent navigation and quick access.
// Internal Dependencies:
// - Header: To include the header component within the sidebar for consistent navigation.
// - Footer: To include the footer component within the sidebar for consistent navigation.
// - NotificationBell: To display notification alerts within the sidebar.
// - ChatBot: To provide quick access to the AI assistant from the sidebar.
// - UserProfile: To allow users to access and manage their profile from the sidebar.
// - SettingsForm: To provide access to user settings and preferences from the sidebar.
import Header from './Header';
import Footer from './Footer';
import NotificationBell from './NotificationBell';
import ChatBot from './ChatBot';
import UserProfile from './UserProfile';
import SettingsForm from './SettingsForm';

// Import utility functions for API requests and authentication.
// Internal Dependencies:
// - apiRequest: To make HTTP requests for dynamic content within the sidebar.
// - getAuthToken: To retrieve the authentication token for secure API requests.
import { apiRequest } from '../utils/api';
import { getAuthToken } from '../utils/auth';

// Import global styles for consistent styling across the Sidebar component.
// Internal Dependency:
// - global.css: To apply consistent styling across the Sidebar component.
import '../styles/global.css';

// Define the fixed width for the sidebar component.
// Global Constant: SIDEBAR_WIDTH
const SIDEBAR_WIDTH = 250; // Defines the sidebar width in pixels

// The Sidebar component renders navigation links and quick access to various sections.
// It ensures a consistent and responsive design across the application by applying global styles.
// Requirements Addressed:
// - User Interface Design (Technical Specification/4.1 Dashboard):
//   Ensure a consistent and responsive design across the web application by applying global styles.

const Sidebar: React.FC = () => {
  // Retrieve the authentication token for secure API requests.
  // This is necessary for user-specific links and content.
  const authToken = getAuthToken();

  // Define the navigation links to be displayed in the sidebar.
  const navigationLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/incidents', label: 'Incidents' },
    { to: '/playbooks', label: 'Playbooks' },
    { to: '/recommendations', label: 'Recommendations' },
    { to: '/users', label: 'Users' },
    { to: '/settings', label: 'Settings' },
  ];

  // Apply styles using the imported global CSS variables.
  // This ensures a consistent and responsive design across the application.
  const sidebarStyle: React.CSSProperties = {
    width: SIDEBAR_WIDTH,
  };

  return (
    <div className="sidebar" style={sidebarStyle}>
      {/* Include the Header component for consistent navigation */}
      {/* Internal Component: Header */}
      <Header />

      {/* Navigation links within the sidebar */}
      <nav className="sidebar-nav">
        <ul>
          {navigationLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} activeClassName="active">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Display the user's profile for quick access to profile management */}
      {/* Internal Component: UserProfile */}
      <UserProfile />

      {/* Display notification alerts within the sidebar */}
      {/* Internal Component: NotificationBell */}
      <NotificationBell />

      {/* Provide quick access to the AI assistant */}
      {/* Internal Component: ChatBot */}
      <ChatBot />

      {/* Access to user settings and preferences */}
      {/* Internal Component: SettingsForm */}
      <SettingsForm />

      {/* Include the Footer component for consistent navigation */}
      {/* Internal Component: Footer */}
      <Footer />
    </div>
  );
};

// Export the Sidebar component to be used in other parts of the application.
export default Sidebar;