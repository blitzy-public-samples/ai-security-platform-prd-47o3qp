// Importing core React functionality (React v17.0.2)
// Reference: External Dependency 'React' version '17.0.2' (Provides the core functionality for building the application)
import React from 'react';

// Importing ReactDOM to render React components to the DOM (ReactDOM v17.0.2)
// Reference: External Dependency 'ReactDOM' version '17.0.2' (Renders the React application to the DOM)
import ReactDOM from 'react-dom';

// Importing the main App component
// Reference: Internal Dependency 'App' module 'src/web/src/App.tsx' (Main entry point for the application, setting up routing and global components)
import App from './App';

// Importing the Redux store for state management
// Reference: Internal Dependency 'store' module 'src/web/src/store/store.ts' (Configures the Redux store for state management)
import { store } from './store/store';

// Importing Provider from react-redux to connect Redux with React (Provider v7.2.4)
// Reference: External Dependency 'Provider' from 'react-redux' version '7.2.4' (Connects the Redux store to the React application)
import { Provider } from 'react-redux';

// Importing global CSS styles to apply consistent design across the application
// Reference: Internal Dependency 'global.css' module 'src/web/src/styles/global.css' (Applies global styles to ensure consistent design)
import './styles/global.css';

// Renders the main App component and integrates the Redux store using the Provider component
// Reference: Function 'renderApp' (Renders the main App component and integrates the Redux store using the Provider component)
// Requirements Addressed:
// - Ensure a consistent and responsive design across the web application by integrating global styles and managing component layouts.
//   Location: Technical Specification/4.1 Dashboard

// Rendering the App component into the root DOM element
ReactDOM.render(
  // Wrapping the App component with the Provider component to integrate the Redux store
  <Provider store={store}>
    <App />
  </Provider>,
  // Ensuring the application is rendered within the root element defined in the HTML
  document.getElementById('root')
);