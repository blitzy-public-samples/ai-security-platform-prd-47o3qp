// Import necessary modules and dependencies.

// Import React core functionality.
// Version 17.0.2
import React, { useState, useEffect } from 'react';

// Import useSelector hook to access the global state from Redux.
// Version 7.2.4
import { useSelector } from 'react-redux';

// Import Dispatch from Redux for potential dispatch actions.
// Version 4.0.5
import { Dispatch } from 'redux';

// Import apiRequest to make HTTP requests to the backend services to fetch recommendation data.
import { apiRequest } from '../utils/api';

// Import getAuthToken to retrieve the authentication token for API requests.
import { getAuthToken } from '../utils/auth';

// Import the CSS styles from global CSS.
import '../styles/global.css';

// Import RootState type for typing the state in useSelector.
import { RootState } from '../store/store';

// ------------------[Requirements Addressed]------------------------
// - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance)
//   - TR-AI-002-2: Ensure recommendations are updated in real-time based on incident data.
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)
//   - TR-INT-010-3: Implement authentication mechanisms like OAuth 2.0 and API keys for secure integrations.
// -------------------------------------------------------------------

// Define the Recommendation functional component.
// This component renders AI-generated suggestions to the user, fulfilling the requirement to provide real-time, context-aware recommendations (TR-AI-002-2).
const Recommendation: React.FC = () => {

    // Use useSelector from react-redux to access the global state.

    // Get the authentication state from authReducer to ensure that the user is authenticated.
    // authReducer manages authentication state, which may influence the recommendations displayed.
    const authState = useSelector((state: RootState) => state.auth);

    // Get the current incident data from incidentReducer to provide context for the recommendations.
    // incidentReducer manages state related to incidents, affecting the context of recommendations.
    const incidentState = useSelector((state: RootState) => state.incident);

    // Use useState to manage the recommendations fetched from the backend.
    const [recommendations, setRecommendations] = useState<string[]>([]);

    // Effect hook to fetch recommendation data from the backend when the component mounts or when authState or incidentState changes.
    // This ensures recommendations are updated in real-time based on incident data (TR-AI-002-2).
    useEffect(() => {
        // Define an asynchronous function to fetch the recommendations.
        const fetchRecommendations = async () => {
            try {
                // Retrieve the authentication token for API requests using getAuthToken.
                // Ensures secure API communication as per integration capabilities (TR-INT-010-3).
                const token = getAuthToken();

                // Prepare the request headers with the authentication token.
                const headers = {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                };

                // Define the API endpoint for fetching AI-generated recommendations.
                // This global constant is specified in globals as 'RECOMMENDATION_API_ENDPOINT'.
                const RECOMMENDATION_API_ENDPOINT = '/api/recommendations';

                // Get the current incident ID from the incident state to fetch context-aware recommendations.
                const incidentId = incidentState.currentIncidentId;

                // Make the API request to fetch recommendations for the current incident.
                // apiRequest is used to make HTTP requests to the backend services (TR-INT-010-1: Develop RESTful APIs for communication with third-party security tools).
                const response = await apiRequest(`${RECOMMENDATION_API_ENDPOINT}/${incidentId}`, 'GET', null, headers);

                // Process the fetched data to extract relevant recommendations.
                if (response && response.recommendations) {
                    // Update the recommendations state with the fetched data.
                    setRecommendations(response.recommendations);
                } else {
                    // Handle cases where no recommendations are available.
                    setRecommendations([]);
                }

            } catch (error) {
                // Handle any errors during the API request.
                // Error handling is important for robustness and performance optimization (TR-PO-012-3).
                console.error('Error fetching recommendations:', error);
                // Set recommendations to empty array in case of error to prevent application crash.
                setRecommendations([]);
            }
        };

        // Call the fetchRecommendations function to initiate the API call.
        fetchRecommendations();

    }, [authState, incidentState]); // The effect re-runs when authState or incidentState changes.

    // Render the recommendations using JSX, applying styles from global CSS.
    return (
        <div className="recommendation-container">
            {/* Heading for the recommendations section */}
            <h2>AI-Powered Recommendations</h2>
            {/* Check if there are any recommendations to display */}
            {recommendations.length > 0 ? (
                <ul>
                    {/* Map over the recommendations and display each one in a list item */}
                    {recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                    ))}
                </ul>
            ) : (
                // Message to display if no recommendations are available
                <p>No recommendations available at this time.</p>
            )}
        </div>
    );
};

// Export the Recommendation component as the default export.
// This allows other parts of the application to import and use this component.
export default Recommendation;