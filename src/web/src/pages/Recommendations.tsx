/**
 * RecommendationsPage Component
 *
 * This component renders the Recommendations page, displaying AI-generated suggestions to the user.
 * It integrates various components and utilities to fetch, process, and present recommendation data
 * in a user-friendly format.
 *
 * Requirements Addressed:
 * - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance)
 *   - Provides real-time, context-aware recommendations and interactive assistance to security analysts
 *     during incident investigations to enhance decision-making and response effectiveness.
 *
 * Detailed Steps:
 * 1. Import necessary modules and dependencies.
 * 2. Define the RecommendationsPage functional component.
 * 3. Use `useSelector` from `react-redux` to access the global state.
 * 4. Fetch recommendation data from the backend using `apiRequest`.
 * 5. Process the fetched data to extract relevant recommendations.
 * 6. Render the `Header`, `Sidebar`, `Recommendation`, and `Footer` components using JSX.
 * 7. Apply styles using the imported global CSS.
 * 8. Return the JSX for the Recommendations page component.
 */

// Import React core functionality (React version 17.0.2)
import React, { useEffect, useState } from 'react';

// Import hooks to connect to the Redux store (react-redux version 7.2.4)
import { useSelector } from 'react-redux';

// Import the Header component which renders the top navigation bar
import Header from '../components/Header';

// Import the Sidebar component which provides navigational links
import Sidebar from '../components/Sidebar';

// Import the Recommendation component which displays AI-generated recommendations
import Recommendation from '../components/Recommendation';

// Import the Footer component which renders the footer section
import Footer from '../components/Footer';

// Import the apiRequest utility to make HTTP requests to the backend services
import { apiRequest } from '../utils/api';

// Import getAuthToken utility to retrieve the authentication token for API requests
import { getAuthToken } from '../utils/auth';

// Import the RootState type from the Redux store for typing the useSelector hook
import { RootState } from '../store/store';

// Import global CSS styles to apply styles across the page
import '../styles/global.css';

// Define the API endpoint for fetching AI-generated recommendations
const RECOMMENDATION_API_ENDPOINT = '/api/recommendations';

// Define the RecommendationsPage functional component
const RecommendationsPage: React.FC = () => {
  /**
   * State to hold the recommendation data.
   * Using useState to manage the recommendations fetched from the backend.
   */
  const [recommendations, setRecommendations] = useState<Array<any>>([]);

  /**
   * Retrieve the authentication token for API requests.
   * This ensures the API requests are authenticated.
   */
  const authToken = getAuthToken();

  /**
   * Access authentication state from Redux store.
   * This could be used to display user-specific information if needed.
   */
  const authState = useSelector((state: RootState) => state.auth);

  /**
   * Access incident state from Redux store.
   * The incident state may influence the context of recommendations provided.
   * This aligns with the need for context-aware recommendations.
   */
  const incidentState = useSelector((state: RootState) => state.incident);

  /**
   * useEffect hook to fetch recommendation data when the component mounts
   * or when the incident state changes. This ensures that recommendations
   * are updated in real-time based on the current context, addressing:
   *
   * - Technical Requirement ID: TR-AI-002-2
   *   Description: Ensure recommendations are updated in real-time based on incident data.
   *   Location: Technical Specification/4.2.4 Technical Requirements/TR-AI-002-2
   */
  useEffect(() => {
    // Define an asynchronous function to fetch recommendations
    const fetchRecommendations = async () => {
      try {
        // Make a GET API request to fetch recommendations
        const response = await apiRequest(
          'GET',
          RECOMMENDATION_API_ENDPOINT,
          null,
          {
            // Include the authentication token in the request headers
            Authorization: `Bearer ${authToken}`,
          }
        );

        // Check if the response is successful and contains data
        if (response && response.data && response.data.recommendations) {
          // Update the state with the fetched recommendations
          setRecommendations(response.data.recommendations);
        } else {
          console.error('Invalid response format:', response);
        }
      } catch (error) {
        // Log any errors during the API request
        console.error('Error fetching recommendations:', error);
      }
    };

    // Call the fetchRecommendations function
    fetchRecommendations();
  }, [authToken, incidentState]);

  // Render the Recommendations page component
  return (
    <div className="recommendations-page">
      {/* Render the Header component */}
      <Header />

      {/* Render the Sidebar component */}
      <Sidebar />

      {/* Main content area */}
      <div className="content">
        {/* Page title */}
        <h1>AI-Powered Recommendations</h1>

        {/* Check if there are any recommendations to display */}
        {recommendations.length > 0 ? (
          // Map over the recommendations and render each using the Recommendation component
          recommendations.map((recommendation, index) => (
            <Recommendation key={index} data={recommendation} />
          ))
        ) : (
          // Display a message if no recommendations are available
          <p>No recommendations available at this time.</p>
        )}
      </div>

      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

// Export the RecommendationsPage component as default export
export default RecommendationsPage;