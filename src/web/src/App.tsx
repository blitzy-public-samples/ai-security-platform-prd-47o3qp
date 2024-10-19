// External dependencies
import React from 'react'; // react@17.0.2 - Provides the core functionality for building the application.
import { BrowserRouter as Router } from 'react-router-dom'; // react-router-dom@5.2.0 - Handles routing and navigation within the application.
import { Provider } from 'react-redux'; // react-redux@7.2.4 - Connects React components to the Redux store.

// Internal dependencies
import store from './store/store'; // Configures the Redux store for state management.
import Header from './components/Header'; // Renders the top navigation bar of the application.
import Footer from './components/Footer'; // Renders the footer section of the application.
import Sidebar from './components/Sidebar'; // Provides navigation links to different sections of the application.
import NotificationBell from './components/NotificationBell'; // Displays notifications related to the application.
import ChatBot from './components/ChatBot'; // Provides an interactive chat interface for user assistance.
import routes from './routes'; // Defines the routing logic for the application.

// Import global styles to ensure consistent design across the application.
// Addressing Requirement: User Interface Design (Technical Specification/4.1 Dashboard)
// Description: Ensure a consistent and responsive design across the web application by integrating global styles and managing component layouts.
import './styles/global.css';

// Global constants
const APP_NAME = 'Generative AI-Powered Security Orchestration Platform'; // Application name used throughout the app.

/**
 * App Component
 *
 * Sets up the main structure of the application, including routing, global state management, and integration of core components.
 *
 * Requirements Addressed:
 * - User Interface Design (Technical Specification/4.1 Dashboard):
 *   Ensure a consistent and responsive design across the web application by integrating global styles and managing component layouts.
 *
 * Steps:
 * 1. Import necessary modules and components.
 * 2. Configure the Redux store using the store module.
 * 3. Set up routing using React Router, defining paths for each page component.
 * 4. Integrate global components such as Header, Footer, Sidebar, and NotificationBell.
 * 5. Render the main application structure with routing and global components.
 * 6. Return the JSX for the application component.
 */
const App: React.FC = (): JSX.Element => {
  return (
    // Provider makes the Redux store available to the rest of the app.
    <Provider store={store}>
      {/* Router enables client-side routing for the application. */}
      <Router>
        <div className="app-container">
          {/* Header component displays the top navigation bar of the application.
              Addressing Requirement: User Interface Design (Technical Specification/4.1 Dashboard) */}
          <Header appName={APP_NAME} />

          {/* Sidebar component provides navigation links to different sections of the application.
              Addressing Requirement: User Interface Design (Technical Specification/4.1 Dashboard) */}
          <Sidebar />

          {/* Main content area where routed components are rendered. */}
          <main className="main-content">
            {/* Routes define the mapping between URLs and components. */}
            {routes}
          </main>

          {/* Footer component displays the footer section of the application.
              Addressing Requirement: User Interface Design (Technical Specification/4.1 Dashboard) */}
          <Footer />

          {/* NotificationBell component displays notifications related to the application.
              Addressing Requirement: Advanced Security Monitoring (Technical Specification/4.3.4 Technical Requirements, TR-AM-003-1) */}
          <NotificationBell />

          {/* ChatBot component provides an interactive chat interface for user assistance.
              Addressing Requirement: AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance) */}
          <ChatBot />
        </div>
      </Router>
    </Provider>
  );
};

export default App;