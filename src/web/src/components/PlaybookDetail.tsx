// Import necessary modules and components

// External dependencies
import React, { useState, useEffect } from 'react'; // React version 17.0.2 - To create and manage the PlaybookDetail component as a React component.
import { useParams } from 'react-router-dom'; // React Router version 5.2.0 - To handle navigation within the playbook detail component.

// Internal dependencies
import { apiRequest } from '../utils/api'; // To make HTTP requests for fetching playbook details from the backend.
import { getAuthToken } from '../utils/auth'; // To retrieve the authentication token for verifying user sessions.
import '../styles/global.css'; // To apply consistent styling across the PlaybookDetail component.

import { renderHeader } from './Header'; // To render the header section within the playbook detail view.
import { renderFooter } from './Footer'; // To render the footer section within the playbook detail view.
import { renderSidebar } from './Sidebar'; // To render the sidebar navigation within the playbook detail view.
import { renderNotificationBell } from './NotificationBell'; // To display notifications related to playbooks.
import Recommendation from './Recommendation'; // To display AI-generated recommendations related to the playbook.

// Global constants
// PLAYBOOK_DETAIL_ENDPOINT: The API endpoint for fetching detailed information about a specific playbook.
// (Defined in the globals as per the JSON specification)
const PLAYBOOK_DETAIL_ENDPOINT = '/api/playbook/detail';

/*
 * PlaybookDetail Component
 *
 * Renders the playbook detail component with functionalities
 * for viewing and managing detailed playbook information.
 *
 * Requirements Addressed:
 * - Dynamic Playbook Generation
 *   (Technical Specification/4.4 Dynamic Playbook Generation)
 *     - Utilize artificial intelligence to create and modify security playbooks in real-time
 *       based on emerging threats and organizational policies.
 *     - Ensures responsive and adaptive incident handling strategies.
 *
 * This component integrates with backend services to fetch
 * detailed playbook data and supports user interactions for
 * managing playbook details.
 */

const PlaybookDetail: React.FC = () => {
    // Retrieve the playbook ID from URL parameters using useParams.
    // This allows the component to display details for the selected playbook.
    const { playbookId } = useParams<{ playbookId: string }>();

    // State for storing playbook data fetched from the backend.
    const [playbook, setPlaybook] = useState<any>(null);

    // State for handling loading and error messages.
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect hook to fetch playbook data when the component mounts.
    useEffect(() => {
        // Retrieve the authentication token using getAuthToken to verify user session.
        const authToken = getAuthToken();

        // Check if the user is authenticated.
        if (!authToken) {
            // Handle unauthorized access by setting an error message.
            setError('Authentication required. Please log in.');
            setLoading(false);
            return;
        }

        // Function to fetch detailed playbook data from the backend using PLAYBOOK_DETAIL_ENDPOINT.
        const fetchPlaybookDetail = async () => {
            try {
                // Use apiRequest to make an HTTP GET request to fetch playbook details.
                // This addresses the requirement to integrate with backend services to fetch data.
                const response = await apiRequest(`${PLAYBOOK_DETAIL_ENDPOINT}/${playbookId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });

                // Update the playbook state with the fetched data.
                setPlaybook(response.data);
                setLoading(false);
            } catch (err) {
                // Handle errors by setting an error message.
                setError('Failed to fetch playbook details.');
                setLoading(false);
            }
        };

        // Call the fetchPlaybookDetail function to initiate data fetching.
        fetchPlaybookDetail();

        // [Technical Specification Reference]
        // This data fetching mechanism supports real-time updates to playbooks based on emerging threats,
        // as outlined in Technical Specification/4.4 Dynamic Playbook Generation.
    }, [playbookId]);

    // Render the JSX element representing the playbook detail.
    return (
        <div className="playbook-detail-container">
            {/* Render the header component within the playbook detail view. */}
            {renderHeader()}

            {/* Render the sidebar navigation within the playbook detail view. */}
            {renderSidebar()}

            {/* Main content area for displaying playbook details. */}
            <div className="playbook-detail-content">
                {/* Include the notification bell for displaying notifications related to playbooks. */}
                {renderNotificationBell()}

                {loading ? (
                    // Show a loading message while playbook data is being fetched.
                    <p>Loading playbook details...</p>
                ) : error ? (
                    // Display an error message if data fetching fails or user is not authenticated.
                    <p>Error: {error}</p>
                ) : (
                    <>
                        {/* Display detailed information about the playbook, including title and description. */}
                        <h1>{playbook.title}</h1>
                        <p>{playbook.description}</p>

                        {/* Display playbook steps. */}
                        <h2>Steps</h2>
                        <ol>
                            {playbook.steps.map((step: any, index: number) => (
                                <li key={index}>{step.description}</li>
                            ))}
                        </ol>

                        {/* Display related incidents associated with the playbook. */}
                        <h2>Related Incidents</h2>
                        <ul>
                            {playbook.relatedIncidents.map((incident: any) => (
                                <li key={incident.id}>{incident.title}</li>
                            ))}
                        </ul>

                        {/* Integrate the Recommendation component to show AI-generated recommendations. */}
                        {/* The Recommendation component utilizes AI to provide actionable insights,
                            supporting the AI-Powered Assistance requirement described in
                            Technical Specification/4.2 AI-Powered Assistance. */}
                        <Recommendation playbookId={playbookId} />
                    </>
                )}
            </div>

            {/* Render the footer component within the playbook detail view. */}
            {renderFooter()}
        </div>
    );
};

export default PlaybookDetail;