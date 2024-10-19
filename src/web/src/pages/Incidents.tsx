// Importing React for component creation (Version 17.0.2)
// Addresses general UI rendering and component structure
import React, { useEffect } from 'react';

// Importing React Redux to connect React components to the Redux store (Version 7.2.3)
// Facilitates state management as per requirement TR-IR-001-4
// Location: Technical Specification/4.1.4 Technical Requirements
import { useDispatch, useSelector } from 'react-redux';

// Importing React Router for navigation and routing (Version 5.2.0)
// Manages user navigation within the application
import { useHistory } from 'react-router-dom';

// Importing internal components
// Displays a list of security incidents for user interaction
import IncidentList from '../components/IncidentList';
// Provides detailed views of selected incidents
import IncidentDetail from '../components/IncidentDetail';
// Displays notifications related to incidents
import NotificationBell from '../components/NotificationBell';

// Importing utilities
// Handles HTTP requests to fetch incident data
import { apiRequest } from '../utils/api';
// Retrieves the authentication token for API requests
import { getAuthToken } from '../utils/auth';

// Importing Redux actions and state types
// Dispatches actions to fetch incidents from the backend
import { fetchIncidentsSuccess } from '../store/actions';
// Defines the structure of the application's state
import { RootState } from '../store/reducers';

// Importing global constants
// Contains page title for the Incidents page
const INCIDENTS_PAGE_TITLE = 'Incidents Management';

// Styles for the Incidents page container
// See 'Styles' section in file specification
import './Incidents.css';

// IncidentsPage Component
// Renders the Incidents page, displaying a list of incidents and providing options to view details and manage incidents.
// Requirements Addressed:
// - Incident Response Automation (TR-IR-001)
//   - Automate the detection, logging, analysis, and resolution of security incidents using AI-driven workflows.
//   - Location: Technical Specification/4.1 Incident Response Automation
// - AI-Powered Assistance (TR-AI-002)
//   - Provide real-time, context-aware recommendations and interactive assistance to security analysts.
//   - Location: Technical Specification/4.2 AI-Powered Assistance
const IncidentsPage: React.FC = () => {
  // useDispatch allows dispatching actions to the Redux store
  const dispatch = useDispatch();

  // useHistory provides navigation capabilities
  const history = useHistory();

  // useSelector accesses the incidents state from the Redux store
  const incidents = useSelector((state: RootState) => state.incidentReducer.incidents);

  // useEffect hook to perform side effects on component mount
  useEffect(() => {
    // Retrieve the authentication token to verify user session
    const authToken = getAuthToken();
    if (!authToken) {
      // If user is not authenticated, redirect to login page
      history.push('/login');
    } else {
      // Use apiRequest to fetch the list of incidents from the backend
      // Addresses TR-IR-001-1: Integrate with existing SIEM systems for incident detection
      // Location: Technical Specification/4.1.4 Technical Requirements
      apiRequest('/incidents', 'GET', null, authToken)
        .then((response) => {
          // Dispatch fetchIncidentsSuccess action to update the incidents state in the Redux store
          // Addresses TR-IR-001-2: Support automated logging of incident details into the case management system.
          // Location: Technical Specification/4.1.4 Technical Requirements
          dispatch(fetchIncidentsSuccess(response.data));
        })
        .catch((error) => {
          console.error('Error fetching incidents:', error);
          // Handle error appropriately
        });
    }
  }, [dispatch, history]);

  // Handler function when an incident is selected
  // Provides options to view detailed information using the IncidentDetail component
  const handleIncidentSelect = (incidentId: string) => {
    // Navigate to Incident Detail page or display details
    // Placeholder for incident detail handling logic
    // Addresses TR-IR-001-3: Enable real-time analysis of incidents using AI algorithms.
    // Location: Technical Specification/4.1.4 Technical Requirements
  };

  return (
    <div className="incidents-page-container">
      {/* Integrate NotificationBell to display notifications related to incidents */}
      {/* Addresses TR-AM-003-1: Implement real-time tracking of incident response actions and alerts */}
      {/* Location: Technical Specification/4.3.4 Technical Requirements */}
      <NotificationBell />

      {/* Page Title */}
      <h1>{INCIDENTS_PAGE_TITLE}</h1>

      {/* Render the IncidentList component to display the list of incidents */}
      {/* Addresses TR-IR-001-1: Integrate with existing SIEM systems for incident detection */}
      {/* Location: Technical Specification/4.1.4 Technical Requirements */}
      <IncidentList incidents={incidents} onIncidentSelect={handleIncidentSelect} />

      {/* IncidentDetail component can be conditionally rendered based on selected incident */}
      {/* For illustrative purposes, not implemented here */}
    </div>
  );
};

export default IncidentsPage;