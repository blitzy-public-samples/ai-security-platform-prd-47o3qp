// src/web/src/pages/Dashboard.tsx

import React from 'react'; // React v18.0.0
import { Header } from '../components/Header'; // Importing Header component for platform header
import { Sidebar } from '../components/Sidebar'; // Importing Sidebar component for navigation
import { OverviewWidgets } from '../components/OverviewWidgets'; // Widgets displaying high-level metrics
import { IncidentTimeline } from '../components/IncidentTimeline'; // Visualization of incident occurrences over time
import { RecentActivities } from '../components/RecentActivities'; // List of recent actions by analysts and systems
import { ThreatMap } from '../components/ThreatMap'; // Geographical visualization of active threats

import './Dashboard.css'; // Importing custom styles for the Dashboard page

/**
 * Dashboard Page Component
 * 
 * This component serves as the central hub for users to monitor and manage security incidents.
 * It includes a Header, Sidebar, and Main Panel with various interactive widgets and visualizations.
 * 
 * Requirements Addressed:
 * - **4.1.1 Layout**: Implements the dashboard layout as specified in "Technical Specification" > "USER INTERFACE DESIGN" > "4.1 Dashboard" > "4.1.1 Layout".
 * - **4.1.2 Functionality**: Incorporates real-time updates, customizable widgets, interactive charts, alert notifications, and export capabilities as per "Technical Specification" > "USER INTERFACE DESIGN" > "4.1 Dashboard" > "4.1.2 Functionality".
 * - **TR-AM-003-1**: Implements real-time tracking of incident response actions and alerts ("Technical Specification" > "4.3 Advanced Security Monitoring" > "4.3.4 Technical Requirements").
 * - **TR-DI-007-1**: Provides a high-level overview dashboard displaying all incidents and their statuses ("Technical Specification" > "4.7 Dashboard Integration" > "4.7.4 Technical Requirements").
 * - **TR-UA-015-1**: Develops an intuitive and user-friendly interface tailored to different user roles ("Technical Specification" > "4.15 Usability and Accessibility" > "4.15.4 Technical Requirements").
 * - **TR-UA-015-5**: Incorporates responsive design to support various devices and screen sizes ("Technical Specification" > "4.15 Usability and Accessibility" > "4.15.4 Technical Requirements").
 */

const Dashboard: React.FC = () => {
  // State hooks to manage data for incidents, activities, and threat information
  const [incidents, setIncidents] = React.useState([]); // Stores incident data
  const [activities, setActivities] = React.useState([]); // Stores recent activities
  const [threatData, setThreatData] = React.useState([]); // Stores threat map data

  /**
   * useEffect hook to fetch data on component mount
   * 
   * Requirements Addressed:
   * - **TR-INT-010-1**: Develops RESTful APIs for communication with third-party security tools such as Splunk and XSOAR ("Technical Specification" > "4.10 Integration Capabilities" > "4.10.4 Technical Requirements").
   * - **TR-PO-012-1**: Achieves average response times for AI-generated recommendations under 2 seconds ("Technical Specification" > "4.12 Performance Optimization" > "4.12.4 Technical Requirements").
   * - **TR-LM-020-3**: Provides real-time monitoring dashboards for system performance and security events ("Technical Specification" > "4.20 Logging and Monitoring" > "4.20.4 Technical Requirements").
   */
  React.useEffect(() => {
    // Fetch incident data
    fetch('/api/incidents')
      .then(response => response.json())
      .then(data => setIncidents(data))
      .catch(error => console.error('Error fetching incidents:', error));

    // Fetch recent activities
    fetch('/api/activities')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));

    // Fetch threat map data
    fetch('/api/threats')
      .then(response => response.json())
      .then(data => setThreatData(data))
      .catch(error => console.error('Error fetching threat data:', error));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header Component */}
      {/* Provides the platform logo, user profile access, and global navigation links */}
      <Header />

      {/* Sidebar Component */}
      {/* Provides quick access to different modules such as Incidents, Playbooks, Recommendations, and Settings */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="dashboard-main-content">
        {/* Overview Widgets */}
        {/* Displays high-level metrics like total incidents, resolved incidents, active threats, and system health status */}
        <OverviewWidgets incidents={incidents} />

        {/* Incident Timeline */}
        {/* Visual representation of incident occurrences over time */}
        <IncidentTimeline incidents={incidents} />

        {/* Recent Activities */}
        {/* Lists the most recent actions taken by analysts and automated systems */}
        <RecentActivities activities={activities} />

        {/* Threat Map */}
        {/* Geographical visualization of active threats */}
        <ThreatMap data={threatData} />
      </main>
    </div>
  );
};

export default Dashboard;

/**
 * Note:
 * - The actual data fetching endpoints ('/api/incidents', '/api/activities', '/api/threats') should be defined in the backend services.
 * - Error handling is included to log any issues during data fetching.
 * - The components used (Header, Sidebar, OverviewWidgets, IncidentTimeline, RecentActivities, ThreatMap) need to be implemented according to their specifications.
 * - Stylesheets (Dashboard.css) should include responsive design considerations.
 * 
 * Additional Requirements Addressed:
 * - **TR-PO-012-2**: Supports at least 1000 concurrent users without performance degradation ("Technical Specification" > "4.12 Performance Optimization" > "4.12.4 Technical Requirements").
 * - **TR-SC-017-4**: Ensures that all services are stateless to facilitate easy scaling ("Technical Specification" > "4.17 Scalability" > "4.17.4 Technical Requirements").
 */