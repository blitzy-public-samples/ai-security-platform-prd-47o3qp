// src/web/src/components/IncidentDetail.tsx

// Import necessary modules and components

// Importing React to create and manage the IncidentDetail component as a React component
// Version: 17.0.2
import React, { useEffect, useState } from 'react'; // version 17.0.2

// Importing useDispatch and useSelector from React Redux to connect the component to the Redux store
// React Redux Version: 7.2.3
import { useDispatch, useSelector } from 'react-redux'; // version 7.2.3

// Importing internal utilities and components

// apiRequest makes HTTP requests to fetch detailed incident data from the backend
import { apiRequest } from '../utils/api';

// getAuthToken retrieves the authentication token for API requests
import { getAuthToken } from '../utils/auth';

// Recommendation component displays AI-generated recommendations related to the incident
import Recommendation from './Recommendation';

// Importing Redux actions and reducers

// fetchIncidents action dispatches actions to fetch incidents from the backend
import { fetchIncidents } from '../store/actions';

// RootState manages state related to incidents
import { RootState } from '../store/reducers';

// The API endpoint for fetching detailed information about a specific incident
const INCIDENT_DETAIL_ENDPOINT = '/api/incidents'; // The API endpoint

// Defining the props for the IncidentDetail component
interface IncidentDetailProps {
  incidentId: string;
}

// IncidentDetail component provides a detailed view of a specific incident, allowing users to analyze incident data, view related recommendations, and take appropriate actions.

// Requirements Addressed:
// - Comprehensive Case Management (Technical Specification/4.5 Comprehensive Case Management)
//   - Maintains detailed logs of all incident-related activities
//   - Supports comprehensive audit trails
//   - Facilitates easy retrieval and analysis of historical data to support ongoing security operations and compliance requirements

const IncidentDetail: React.FC<IncidentDetailProps> = ({ incidentId }) => {
  const dispatch = useDispatch();
  const authToken = getAuthToken(); // Retrieve the authentication token to verify user session

  // Local state for incident details
  const [incidentDetails, setIncidentDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the detailed incident data when the component mounts or incidentId changes
  useEffect(() => {
    const fetchIncidentDetail = async () => {
      try {
        // Use apiRequest to fetch detailed incident data from the backend
        const response = await apiRequest(
          `${INCIDENT_DETAIL_ENDPOINT}/${incidentId}`,
          'GET',
          null,
          authToken
        );

        // Update local state with the fetched incident details
        setIncidentDetails(response.data);

        // Dispatch fetchIncidents action to update the incidents state in the Redux store if necessary
        dispatch(fetchIncidents());

        // Set loading to false after data is fetched
        setLoading(false);
      } catch (error) {
        // Handle any errors during the API request
        console.error('Error fetching incident details:', error);
        setLoading(false);
      }
    };

    fetchIncidentDetail();
  }, [incidentId, authToken, dispatch]);

  // Handle actions that users can take, such as resolving or escalating the incident
  const handleResolve = async () => {
    // Provide option for users to resolve the incident
    // Implement incident resolution logic, possibly updating the incident status in the backend
    try {
      await apiRequest(
        `${INCIDENT_DETAIL_ENDPOINT}/${incidentId}/resolve`,
        'POST',
        null,
        authToken
      );
      // Update local state to reflect the resolved status
      setIncidentDetails({ ...incidentDetails, status: 'Resolved' });
      // Optionally, refresh incidents in the Redux store
      dispatch(fetchIncidents());
    } catch (error) {
      console.error('Error resolving incident:', error);
    }
  };

  const handleEscalate = async () => {
    // Provide option for users to escalate the incident
    // Implement incident escalation logic, possibly notifying higher-level analysts or administrators
    try {
      await apiRequest(
        `${INCIDENT_DETAIL_ENDPOINT}/${incidentId}/escalate`,
        'POST',
        null,
        authToken
      );
      // Update local state to reflect the escalated status
      setIncidentDetails({ ...incidentDetails, status: 'Escalated' });
      // Optionally, refresh incidents in the Redux store
      dispatch(fetchIncidents());
    } catch (error) {
      console.error('Error escalating incident:', error);
    }
  };

  if (loading) {
    // Display a loading message while fetching incident details
    return <div>Loading incident details...</div>;
  }

  if (!incidentDetails) {
    // Display a message if incident details are not found
    return <div>Incident not found.</div>;
  }

  return (
    <div className="incident-detail">
      {/* Render the detailed incident data, including descriptions, timestamps, and involved entities */}
      <h1>{incidentDetails.title}</h1>
      <p>{incidentDetails.description}</p>
      <p>Status: {incidentDetails.status}</p>
      <p>Detected At: {new Date(incidentDetails.detectedAt).toLocaleString()}</p>
      <p>Resolved At: {incidentDetails.resolvedAt ? new Date(incidentDetails.resolvedAt).toLocaleString() : 'N/A'}</p>
      {/* More incident details can be added here */}

      {/* Integrate Recommendation component to display AI-generated recommendations related to the incident */}
      <Recommendation incidentId={incidentId} />

      {/* Provide options for users to take actions such as resolving or escalating the incident */}
      <div className="incident-actions">
        <button onClick={handleResolve}>Resolve Incident</button>
        <button onClick={handleEscalate}>Escalate Incident</button>
      </div>
    </div>
  );
};

export default IncidentDetail;