// src/web/src/components/IncidentList.tsx

// IncidentList Component
// Description:
// The IncidentList component displays a list of security incidents, allowing users to view,
// filter, and interact with incidents. It integrates with the Redux store to manage state
// and uses API utilities to fetch incident data.

// Requirements Addressed:
// - Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
//   - Requirement ID: TR-IR-001
//     - Description: Automate the detection, logging, analysis, and resolution of security
//       incidents using AI-driven workflows to ensure consistent and efficient incident handling.

import React, { useEffect } from 'react'; // React v17.0.2
import { useDispatch, useSelector } from 'react-redux'; // React Redux v7.2.3

// Internal dependencies
import { apiRequest } from '../utils/api'; // Makes HTTP requests to fetch incident data from the backend.
import { getAuthToken } from '../utils/auth'; // Retrieves the authentication token for API requests.
import { fetchIncidents } from '../store/actions'; // Dispatches actions to update the incidents state.
import { renderIncidentDetail } from './IncidentDetail'; // Provides detailed views of selected incidents.

// Type definitions (assumed to be defined in the project)
import { RootState } from '../store/store'; // Configures the Redux store for state management.
import { Incident } from '../store/types'; // Defines the Incident data type.

// Globals
const INCIDENTS_ENDPOINT = '/api/incidents'; // The API endpoint for fetching the list of incidents.

/**
 * IncidentList Component
 * Renders the list of incidents with options to filter and select individual incidents for more details.
 * Connects to the Redux store to access incidents state.
 */
const IncidentList: React.FC = () => {
  // Initialize dispatch function to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Access the incidents state from the Redux store.
  // This allows the component to render the list of incidents stored in the global state.
  const incidents = useSelector((state: RootState) => state.incidents.list);

  // Retrieve the authentication token to verify the user session.
  // This is necessary to authenticate API requests to the backend.
  const authToken = getAuthToken();

  useEffect(() => {
    // useEffect hook to fetch incidents when the component mounts.
    // This ensures that the incidents list is populated when the user accesses the component.

    // Check if the authentication token is available.
    if (authToken) {
      // Use apiRequest to fetch the list of incidents from the backend using INCIDENTS_ENDPOINT.
      // Addresses TR-IR-001-1: Integrate with existing SIEM systems for incident detection.
      apiRequest(INCIDENTS_ENDPOINT, 'GET', null, authToken)
        .then((response) => {
          // Dispatch fetchIncidents action to update the incidents state in the Redux store.
          // Addresses TR-IR-001-2: Support automated logging of incident details into the case management system.
          dispatch(fetchIncidents(response.data));
        })
        .catch((error) => {
          // Handle any errors that occur during the API request.
          console.error('Error fetching incidents:', error);
        });
    } else {
      // If the authentication token is not available, log an error.
      console.error('Authentication token not found.');
    }
  }, [dispatch, authToken]);

  /**
   * Render the incident list UI.
   * This includes rendering each incident with options to view details using renderIncidentDetail.
   * Addresses TR-IR-001-3: Enable real-time analysis of incidents using AI algorithms.
   */
  return (
    <div className="incident-list">
      <h2>Incident List</h2>
      {incidents && incidents.length > 0 ? (
        <ul>
          {incidents.map((incident: Incident) => (
            <li key={incident.id}>
              <div className="incident-item">
                <h3>{incident.title}</h3>
                <p>{incident.description}</p>
                {/* Render incident details using renderIncidentDetail */}
                {/* This allows users to view detailed information about each incident */}
                {renderIncidentDetail(incident)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading incidents...</p>
      )}
    </div>
  );
};

export default IncidentList;