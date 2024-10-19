// Import necessary modules and components.

// External imports

// React version 17.0.2
import React, { useState, useEffect } from 'react'; // Version 17.0.2

// React Router version 5.2.0
import { useHistory } from 'react-router-dom'; // Version 5.2.0

// Internal imports

// Import PlaybookList to display a list of playbooks available to the user.
// Module: src/web/src/components/PlaybookList.tsx
import PlaybookList from '../components/PlaybookList';

// Import PlaybookDetail to provide detailed views of individual playbooks.
// Module: src/web/src/components/PlaybookDetail.tsx
import PlaybookDetail from '../components/PlaybookDetail';

// Import apiRequest to make HTTP requests for fetching playbook data from the backend.
// Module: src/web/src/utils/api.ts
import { apiRequest } from '../utils/api';

// Import getAuthToken to retrieve the authentication token for verifying user sessions.
// Module: src/web/src/utils/auth.ts
import { getAuthToken } from '../utils/auth';

// Import global CSS to apply consistent styling across the Playbooks page.
// Module: src/web/src/styles/global.css
import '../styles/global.css';

// Import components for header, footer, sidebar, and notification bell.
// Module: src/web/src/components/Header.tsx
import Header from '../components/Header';

// Module: src/web/src/components/Footer.tsx
import Footer from '../components/Footer';

// Module: src/web/src/components/Sidebar.tsx
import Sidebar from '../components/Sidebar';

// Module: src/web/src/components/NotificationBell.tsx
import NotificationBell from '../components/NotificationBell';

// Define global constants.

// PLAYBOOKS_ENDPOINT: The API endpoint for fetching the list of playbooks.
const PLAYBOOKS_ENDPOINT = '/api/playbooks';

// Renders the Playbooks page with functionalities for viewing and managing playbooks.
// This component addresses the following requirements:
// - **Dynamic Playbook Generation** (Requirement ID: TR-DPG-004)
//   Location: Technical Specification/4.4 Dynamic Playbook Generation
//   - Utilizes artificial intelligence to create and modify security playbooks in real-time based on emerging threats and organizational policies.
// - **User and System Management** (Requirement ID: TR-USM-006)
//   Location: Technical Specification/4.6 User and System Management
//   - Manages user sessions and permissions to ensure operational security and efficiency within the platform.
// - **Advanced Security Monitoring** (Requirement ID: TR-AM-003)
//   Location: Technical Specification/4.3 Advanced Security Monitoring
//   - Provides real-time alerts and monitoring capabilities within the playbooks page.
// - **Usability and Accessibility** (Requirement ID: TR-UA-015)
//   Location: Technical Specification/4.15 Usability and Accessibility
//   - Ensures the interface is intuitive and accessible to all users.
const PlaybooksPage: React.FC = () => {
    // State variables for managing playbooks and UI state.

    // playbooks: Holds the list of playbooks fetched from the backend.
    const [playbooks, setPlaybooks] = useState<any[]>([]);

    // selectedPlaybook: Holds the currently selected playbook for detailed view.
    const [selectedPlaybook, setSelectedPlaybook] = useState<any | null>(null);

    // loading: Indicates whether the playbooks are currently being loaded.
    const [loading, setLoading] = useState<boolean>(true);

    // error: Holds any error message encountered during data fetching.
    const [error, setError] = useState<string | null>(null);

    // useHistory hook from React Router to handle navigation.
    const history = useHistory();

    // useEffect hook to perform data fetching after component mounts.
    useEffect(() => {
        // fetchPlaybooks: Async function to fetch playbooks from the backend.
        const fetchPlaybooks = async () => {
            try {
                // Retrieve the authentication token using getAuthToken to verify user session.
                // Addresses Requirement ID: TR-SC-013 (Security and Compliance)
                // Location: Technical Specification/4.13 Security and Compliance
                const token = getAuthToken();

                if (!token) {
                    // If authentication token is not present, redirect to login page.
                    // Ensures that only authenticated users can access the playbooks page.
                    history.push('/login');
                    return;
                }

                // Use apiRequest to fetch the list of playbooks from the backend using PLAYBOOKS_ENDPOINT.
                // Addresses Requirement ID: TR-DPG-004-2
                // Location: Technical Specification/4.4 Dynamic Playbook Generation
                // Incorporate real-time threat intelligence into playbook creation.
                const response = await apiRequest.get(PLAYBOOKS_ENDPOINT, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the authentication token in the request headers.
                    },
                });

                // Update the state with the fetched playbooks data.
                setPlaybooks(response.data.playbooks);

                // Set loading to false after data is successfully fetched.
                setLoading(false);
            } catch (err) {
                // Handle any errors that occur during the data fetching process.

                // Set an error message to display to the user.
                setError('Failed to fetch playbooks. Please try again later.');

                // Set loading to false as the fetching process has concluded even in case of error.
                setLoading(false);
            }
        };

        // Invoke the fetchPlaybooks function.
        fetchPlaybooks();
    }, [history]);

    // handleSelectPlaybook: Function to handle the selection of a playbook from the list.
    // Parameters:
    // - playbook: The playbook object selected by the user.
    const handleSelectPlaybook = (playbook: any) => {
        // Update the state to set the selected playbook for detailed view.
        setSelectedPlaybook(playbook);
    };

    // handleClosePlaybookDetail: Function to handle closing the playbook detail view.
    const handleClosePlaybookDetail = () => {
        // Reset the selectedPlaybook state to null to close the detail view.
        setSelectedPlaybook(null);
    };

    // Return the JSX element representing the playbooks page.
    return (
        <div className="playbooks-page">

            {/* Render the header component */}
            {/* Addresses Requirement ID: TR-UA-015 */}
            {/* Location: Technical Specification/4.15 Usability and Accessibility */}
            <Header />

            {/* Render the sidebar component for navigation */}
            {/* Provides access to different modules as per usability requirements */}
            <Sidebar />

            {/* Main content area */}
            <div className="content">

                {/* Include the notification bell for user interactions */}
                {/* Addresses Requirement ID: TR-AM-003 */}
                {/* Location: Technical Specification/4.3 Advanced Security Monitoring */}
                <NotificationBell />

                {/* Display any error message encountered during data fetching */}
                {error && <div className="error-message">{error}</div>}

                {/* Display loading indicator while playbooks are being fetched */}
                {loading ? (
                    <div className="loading">Loading playbooks...</div>
                ) : (
                    <div className="playbooks-content">

                        {/* Display the list of playbooks using the PlaybookList component */}
                        {/* Allows users to view and select playbooks */}
                        {/* Addresses Requirement ID: TR-DPG-004 */}
                        {/* Location: Technical Specification/4.4 Dynamic Playbook Generation */}
                        <PlaybookList
                            playbooks={playbooks}
                            onSelectPlaybook={handleSelectPlaybook}
                        />

                        {/* Provide detailed view of the selected playbook using the PlaybookDetail component */}
                        {/* Allows users to interact with and manage individual playbooks */}
                        {/* Addresses Requirement ID: TR-DPG-004-4 */}
                        {/* Location: Technical Specification/4.4 Dynamic Playbook Generation */}
                        {selectedPlaybook && (
                            <PlaybookDetail
                                playbook={selectedPlaybook}
                                onClose={handleClosePlaybookDetail}
                            />
                        )}
                    </div>
                )}
            </div>

            {/* Render the footer component */}
            {/* Ensures a consistent layout and accessibility across the platform */}
            <Footer />
        </div>
    );
};

// Export the PlaybooksPage component as default export.
// Allows the component to be imported and used in other parts of the application.
export default PlaybooksPage;