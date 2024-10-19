// External Dependencies
import React, { useEffect, useState } from 'react'; // React version 17.0.2
import { Line } from 'react-chartjs-2'; // Chart.js React integration version 2.11.1
import 'chart.js/auto'; // Chart.js version 3.7.1

// Internal Dependencies
import { fetchDashboardMetrics } from '../utils/api'; // API utility to fetch dashboard metrics
import { WidgetConfig } from '../types'; // Type definitions for widget configurations

/**
 * Interface for DashboardWidget properties.
 */
interface DashboardWidgetProps {
  title: string;
  widgetConfig: WidgetConfig;
}

/**
 * DashboardWidget Component
 *
 * Description:
 * This component renders a dashboard widget that displays key metrics and interactive charts.
 * It fetches data in real-time and updates the visualization accordingly.
 *
 * Requirements Addressed:
 * - TR-DI-007-2: Display performance metrics for both automated and AI-enhanced actions.
 *   Location: Technical Specification 4.7 Dashboard Integration
 * - TR-DI-007-5: Ensure real-time data updates and responsiveness of dashboard components.
 *   Location: Technical Specification 4.7 Dashboard Integration
 * - TR-UA-015-3: Implement customizable dashboards with drag-and-drop widget functionality.
 *   Location: Technical Specification 4.15 Usability and Accessibility
 */

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ title, widgetConfig }) => {
  // State to hold fetched data
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * fetchData Function
   *
   * Description:
   * Fetches the latest metrics from the backend API and updates the component state.
   *
   * Requirements Addressed:
   * - TR-AM-003-1: Implement real-time tracking of incident response actions and alerts.
   *   Location: Technical Specification 4.3 Advanced Security Monitoring
   * - TR-PO-012-1: Achieve average response times for AI-generated recommendations under 2 seconds.
   *   Location: Technical Specification 4.12 Performance Optimization
   */
  const fetchData = async () => {
    try {
      const response = await fetchDashboardMetrics(widgetConfig.endpoint);
      setData(response.dataPoints);
      setLabels(response.labels);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard metrics:', error);
      setIsLoading(false);
    }
  };

  /**
   * useEffect Hook
   *
   * Description:
   * Triggers data fetching on component mount and sets up an interval for real-time updates.
   *
   * Requirements Addressed:
   * - TR-DI-007-5: Ensure real-time data updates and responsiveness of dashboard components.
   *   Location: Technical Specification 4.7 Dashboard Integration
   */
  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, widgetConfig.refreshInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * chartData Constant
   *
   * Description:
   * Prepares the data structure required by the Chart.js component.
   */
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: widgetConfig.metricLabel,
        data: data,
        fill: false,
        backgroundColor: widgetConfig.backgroundColor,
        borderColor: widgetConfig.borderColor,
      },
    ],
  };

  /**
   * renderWidgetContent Function
   *
   * Description:
   * Renders the content of the widget based on the loading state and data availability.
   *
   * Requirements Addressed:
   * - TR-UA-015-1: Develop an intuitive and user-friendly interface tailored to different user roles.
   *   Location: Technical Specification 4.15 Usability and Accessibility
   */
  const renderWidgetContent = () => {
    if (isLoading) {
      return <p>Loading data...</p>;
    } else if (data.length === 0) {
      return <p>No data available.</p>;
    } else {
      return (
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      );
    }
  };

  return (
    <div className="dashboard-widget bg-white shadow-md rounded p-4">
      {/* Widget Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {/* Widget Content */}
      <div className="widget-content h-64">{renderWidgetContent()}</div>
    </div>
  );
};

export default DashboardWidget;