import React, { useState, useEffect } from 'react'; // React version 17.0.2
import { useSelector, useDispatch } from 'react-redux'; // React-Redux version 7.2.4
import { Icon } from 'your-ui-library'; // UI library for icons
import { RootState } from '../store/store';
import { getAuthToken } from '../utils/auth'; // Retrieves the authentication token for API requests.
import apiRequest from '../utils/api'; // Makes HTTP requests to the backend services to fetch notification data.

/**
 * NotificationBell Component
 *
 * Renders a notification bell icon with a badge displaying the count of unread notifications.
 * Provides a dropdown to view recent notifications when clicked.
 *
 * This component addresses the requirement 'Notification and Alert Interface' specified in
 * 'Technical Specification/4.5 Notification and Alert Interface'. It ensures that users are
 * promptly informed about critical events and updates through a notification system integrated
 * into the user interface.
 */

const NOTIFICATION_API_ENDPOINT = '/api/notifications'; // The API endpoint for fetching notifications.

const NotificationBell: React.FC = () => {
  // Retrieve the authentication token using getAuthToken.
  const authToken = getAuthToken();

  // State to store the count of unread notifications.
  const [unreadCount, setUnreadCount] = useState<number>(0);
  // State to store the list of recent notifications.
  const [notifications, setNotifications] = useState<Array<any>>([]);
  // State to manage the visibility of the dropdown menu.
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  // Connect to the Redux store using React-Redux to access the notification state if needed.
  const dispatch = useDispatch();
  const notificationsFromStore = useSelector((state: RootState) => state.notifications.items);

  // useEffect hook to fetch notification data when the component mounts.
  useEffect(() => {
    /**
     * fetchNotifications
     *
     * Retrieves the count of unread notifications and the list of recent notifications
     * from the backend API using the apiRequest utility function.
     *
     * Steps:
     * 1. Retrieve the authentication token using getAuthToken.
     * 2. Use apiRequest to fetch the count of unread notifications from the NOTIFICATION_API_ENDPOINT.
     * 3. Update the state variables 'unreadCount' and 'notifications' with the fetched data.
     */
    const fetchNotifications = async () => {
      try {
        const response = await apiRequest.get(NOTIFICATION_API_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setUnreadCount(response.data.unreadCount);
        setNotifications(response.data.notifications);

        // Optionally update the Redux store with the fetched notifications.
        // dispatch({ type: 'UPDATE_NOTIFICATIONS', payload: response.data.notifications });

      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [authToken]);

  /**
   * handleBellClick
   *
   * Toggles the visibility of the notifications dropdown menu when the bell icon is clicked.
   */
  const handleBellClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="notification-bell">
      {/* Bell icon with unread count badge */}
      <div onClick={handleBellClick} className="bell-icon-wrapper">
        {/* Using an icon component from the UI library to display the bell icon */}
        <Icon name="bell" className="bell-icon" />
        {/* Displaying the unread count as a badge if there are unread notifications */}
        {unreadCount > 0 && (
          <span className="badge">
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown menu displaying recent notifications */}
      {dropdownVisible && (
        <div className="notifications-dropdown">
          <ul>
            {/* Mapping over the notifications array to display each notification */}
            {notifications.map((notification, index) => (
              <li key={index} className="notification-item">
                <span className="notification-message">{notification.message}</span>
                <span className="notification-time">{notification.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;