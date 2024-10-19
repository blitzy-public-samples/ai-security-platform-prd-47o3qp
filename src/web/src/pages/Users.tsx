// Import external dependencies (React v17.0.2)
import React, { useState, useEffect } from 'react'; // React v17.0.2

// Import internal dependencies
import { apiRequest } from '../../utils/api'; // Handles API requests to backend services for user data
import { getAuthToken } from '../../utils/auth'; // Retrieves the authentication token for API requests
import UserProfile from '../components/UserProfile'; // Displays and manages individual user profile information
import SettingsForm from '../components/SettingsForm'; // Provides a form interface for updating user settings and preferences

// Import Redux related modules (redux v4.0.5, redux-thunk v2.3.0)
import { useDispatch, useSelector } from 'react-redux'; // Provides access to Redux dispatch and state
import { fetchUsers, updateUserRoles } from '../store/actions'; // Handles user-related actions
import { RootState } from '../store/reducers'; // Root state type from reducers
import store from '../store/store'; // Configures the Redux store for state management

// Import global CSS styles
import '../../styles/global.css'; // Apply styles using the imported global CSS variables

// Global constants
const USER_LIST_ENDPOINT = '/api/users'; // The API endpoint for retrieving the list of users

// Define User interface
interface User {
    id: string;
    username: string;
    role: string;
    // Additional user fields can be added here
}

/**
 * UsersPage Component
 *
 * Renders the users page interface, allowing administrators to view and manage user accounts.
 *
 * Addressed Requirements:
 * - User and System Management (Technical Specification/4.6 User and System Management)
 *   - TR-USM-006-1: Implement Role-Based Access Control (RBAC) for user permissions.
 *   - TR-USM-006-2: Develop user management interfaces for creating and modifying user accounts.
 *   - TR-USM-006-5: Monitor and log all user and system activities for auditing purposes.
 *
 * This component enables administrators to:
 * - View a list of all users
 * - Edit user details
 * - Manage user roles and permissions
 *
 * Ensuring operational security and efficiency within the platform.
 */
const UsersPage: React.FC = () => {
    // Initialize state variables for user list and loading status
    const [users, setUsers] = useState<User[]>([]); // Stores the list of users
    const [loading, setLoading] = useState<boolean>(true); // Indicates loading status
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // Stores the currently selected user for editing

    // Use Redux dispatch and selector hooks
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.user);

    // Fetch initial user data when the component mounts
    useEffect(() => {
        // Fetch users from the API
        const fetchUserData = async () => {
            try {
                const token = getAuthToken(); // Retrieve the authentication token
                /**
                 * Securely fetch the list of users from the backend API.
                 * Addresses:
                 * - Security and Compliance (Technical Specification/4.13 Security and Compliance)
                 *   - TR-SC-013-3: Encrypt all data in transit using industry-standard encryption protocols (e.g., TLS 1.2+).
                 * - User and System Management (Technical Specification/4.6 User and System Management)
                 *   - TR-USM-006-2: Allows administrators to view user accounts.
                 */
                const response = await apiRequest('GET', USER_LIST_ENDPOINT, null, {
                    Authorization: `Bearer ${token}`,
                });
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Function to handle user selection for editing
    const handleEditUser = (user: User) => {
        /**
         * Prepares the selected user for editing.
         * Addresses:
         * - User and System Management (Technical Specification/4.6 User and System Management)
         *   - TR-USM-006-2: Allows modification of user accounts.
         */
        setSelectedUser(user);
    };

    // Function to handle updating user information
    const handleUpdateUser = async (updatedUser: User) => {
        try {
            const token = getAuthToken();
            /**
             * Sends updated user data to the backend API.
             * Addresses:
             * - User and System Management (Technical Specification/4.6 User and System Management)
             *   - TR-USM-006-1: Implement RBAC by updating user roles.
             *   - TR-USM-006-2: Modify user accounts.
             * - Logging and Monitoring (Technical Specification/4.20 Logging and Monitoring)
             *   - TR-LM-020-1: Implement centralized logging for all user activities.
             */
            await apiRequest('PUT', `${USER_LIST_ENDPOINT}/${updatedUser.id}`, updatedUser, {
                Authorization: `Bearer ${token}`,
            });
            setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
            setSelectedUser(null);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // Function to handle deleting a user
    const handleDeleteUser = async (userId: string) => {
        try {
            const token = getAuthToken();
            /**
             * Deletes a user account from the backend.
             * Addresses:
             * - User and System Management (Technical Specification/4.6 User and System Management)
             *   - TR-USM-006-2: Allows deletion of user accounts.
             * - Security and Compliance (Technical Specification/4.13 Security and Compliance)
             *   - TR-SC-013-2: Enforce RBAC to restrict user permissions based on roles.
             * - Logging and Monitoring (Technical Specification/4.20 Logging and Monitoring)
             *   - TR-LM-020-1: Log all system activities for auditing purposes.
             */
            await apiRequest('DELETE', `${USER_LIST_ENDPOINT}/${userId}`, null, {
                Authorization: `Bearer ${token}`,
            });
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Render loading state if data is still being fetched
    if (loading) {
        return <div>Loading users...</div>;
    }

    return (
        <div className="users-page">
            <h1>Users Management</h1>
            {/** 
             * Render a table of users with options to edit or delete each user.
             * Addresses:
             * - User and System Management (Technical Specification/4.6 User and System Management)
             *   - TR-USM-006-2: User management interface for modifying user accounts.
             */}
            <table className="users-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button onClick={() => handleEditUser(user)}>Edit</button>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/** 
             * Integrate UserProfile and SettingsForm components for detailed user management.
             * Addresses:
             * - User and System Management (Technical Specification/4.6 User and System Management)
             *   - TR-USM-006-2: Modify user accounts and preferences.
             */}
            {selectedUser && (
                <div className="user-edit-modal">
                    <UserProfile user={selectedUser} />
                    <SettingsForm
                        user={selectedUser}
                        onUpdate={handleUpdateUser}
                        onCancel={() => setSelectedUser(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default UsersPage;