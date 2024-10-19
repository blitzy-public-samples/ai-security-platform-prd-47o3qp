// Import React and necessary hooks for managing component state and lifecycle.
// Addressing TR-DPG-004 (Dynamic Playbook Generation) as per Technical Specification/4.4.
// Ensures the component can update in response to playbook data changes.
import React, { useState, useEffect } from 'react'; // React version 17.0.2

// Import useHistory from React Router to handle navigation within the component.
// Supports user interactions for managing playbooks (e.g., viewing details).
import { useHistory } from 'react-router-dom'; // React Router version 5.2.0

// Import internal utility for making API requests to fetch playbook data from the backend.
// Ensures communication with the backend services as per the component's description.
import apiRequest from '../utils/api'; // To make HTTP requests for fetching playbook data from the backend.

// Import utility to retrieve authentication token for verifying user sessions.
// Aligns with security requirements TR-SC-013 (Security and Compliance) in Technical Specification/4.13.
import getAuthToken from '../utils/auth'; // To retrieve the authentication token for verifying user sessions.

// Import global CSS for consistent styling across the component.
// Enhances usability and accessibility as per TR-UA-015 (Usability and Accessibility) in Technical Specification/4.15.
import '../styles/global.css'; // To apply consistent styling across the PlaybookList component.

// Import header, footer, and sidebar components to compose the layout of the page.
// Addresses modular architecture as per TR-MS-016 (Maintainability and Support) from Technical Specification/4.16.
import Header from './Header'; // To render the header section within the playbook list page.
import Footer from './Footer'; // To render the footer section within the playbook list page.
import Sidebar from './Sidebar'; // To render the sidebar navigation within the playbook list page.

// Import NotificationBell to display notifications related to playbooks.
// Supports real-time updates and alerts as per TR-AM-003 (Advanced Security Monitoring) from Technical Specification/4.3.
import NotificationBell from './NotificationBell'; // To display notifications related to playbooks.

// Define the API endpoint for fetching the list of playbooks.
// Ensures consistent use of endpoint URLs across the application.
// Part of the component's responsibility as per the description.
const PLAYBOOK_LIST_ENDPOINT = '/api/playbooks';

// Define the TypeScript interface for a Playbook.
// Supports maintainability and self-documenting code as per TR-MS-016 (Maintainability and Support).
interface Playbook {
    id: string;
    name: string;
    description: string;
}

// PlaybookList Component
// Description: Renders the playbook list component with functionalities for viewing and managing playbooks.
// Requirements Addressed:
// - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation)
//   - Utilizes AI-generated playbooks and integrates with backend services to display and manage playbooks.
// - Security and Compliance (Technical Specification/4.13 Security and Compliance)
//   - Verifies user session with authentication token.
// - Advanced Security Monitoring (Technical Specification/4.3 Advanced Security Monitoring)
//   - Displays notifications related to playbooks.
// - Maintainability and Support (Technical Specification/4.16 Maintainability and Support)
//   - Uses modular components (Header, Footer, Sidebar) for ease of maintenance.
const PlaybookList: React.FC = () => {
    // State hook to manage the list of playbooks.
    // Addresses dynamic data retrieval and component state management.
    const [playbooks, setPlaybooks] = useState<Playbook[]>([]);

    // useHistory hook from React Router to handle navigation.
    const history = useHistory();

    // useEffect hook to perform side effects, such as data fetching, on component mount.
    useEffect(() => {
        // Retrieve the authentication token to verify user session.
        // Ensures only authorized users can access the playbook list.
        // Aligns with TR-SC-013 (Security and Compliance) in Technical Specification/4.13.
        const token = getAuthToken();
        
        if (!token) {
            // If no token is found, redirect to login page.
            // Enhances security by preventing unauthorized access.
            history.push('/login');
            return;
        }

        // Fetch the list of playbooks from the backend.
        // Uses the apiRequest utility to make secure API calls.
        // Addresses TR-DPG-004 (Dynamic Playbook Generation) by retrieving AI-generated playbooks.
        apiRequest('GET', PLAYBOOK_LIST_ENDPOINT, null, token)
            .then(response => {
                // Update the playbooks state with the data fetched from the backend.
                setPlaybooks(response.data);
            })
            .catch(error => {
                // Handle errors in fetching playbook data.
                // Logs errors for monitoring and troubleshooting purposes.
                console.error('Error fetching playbooks:', error);
            });
        
    }, [history]);

    // Function to handle viewing the details of a selected playbook.
    // Supports user interactions for managing playbooks.
    const viewPlaybookDetails = (playbookId: string) => {
        // Navigate to the PlaybookDetail page for the selected playbook.
        history.push(`/playbooks/${playbookId}`);
    };

    // Render the PlaybookList component UI.
    return (
        <div className="playbook-list-container">
            {/* Render the Header component */}
            {/* Provides consistent header across pages as per TR-UA-015 (Usability and Accessibility) */}
            <Header />

            {/* Render the Sidebar component */}
            {/* Provides navigation options for the user */}
            <Sidebar />

            {/* Main content area */}
            <div className="playbook-list-content">
                {/* Render the NotificationBell component */}
                {/* Addresses TR-AM-003 (Advanced Security Monitoring) for displaying notifications */}
                <NotificationBell />
                
                {/* Display the list of playbooks available */}
                <h1>Playbooks</h1>
                <ul>
                    {playbooks.map((playbook: Playbook) => (
                        <li key={playbook.id} className="playbook-item">
                            {/* Display playbook name and description */}
                            <h2>{playbook.name}</h2>
                            <p>{playbook.description}</p>
                            {/* Button to view details and manage the playbook */}
                            <button onClick={() => viewPlaybookDetails(playbook.id)}>View Details</button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Render the Footer component */}
            {/* Provides consistent footer across pages */}
            <Footer />
        </div>
    );
};

export default PlaybookList;