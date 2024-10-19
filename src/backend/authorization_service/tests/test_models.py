# Importing unittest module (Python 3 standard library) to provide a framework for constructing and running tests.
import unittest  # Version: Built-in

# Importing Role and Permission models from 'models.py' which define the user roles and associated permissions.
from ..models import Role, Permission

class TestModels(unittest.TestCase):
    """
    Test suite for the Role and Permission models in the authorization service.
    These tests ensure that the models behave as expected, specifically focusing on
    the correct initialization and assignment of permissions, in compliance with
    Technical Requirements/4.6 User and System Management, which outlines the
    implementation of Role-Based Access Control (RBAC) for user permissions.
    """

    def test_role_initialization(self):
        """
        Tests the initialization of the Role model to ensure it correctly sets the name
        and initializes an empty permissions list.

        Requirements Addressed:
        - Implement Role-Based Access Control (RBAC) for user permissions.
          Location: Technical Requirements/4.6 User and System Management
        """
        # Step 1: Create an instance of the Role model with a sample name.
        role_name = 'Administrator'
        role = Role(name=role_name)

        # Step 2: Assert that the role's name is set correctly.
        self.assertEqual(role.name, role_name, "Role name should be set to 'Administrator'.")

        # Step 3: Assert that the role's permissions list is initialized as empty.
        self.assertEqual(len(role.permissions), 0, "Role permissions list should be initialized as empty.")

    def test_permission_initialization(self):
        """
        Tests the initialization of the Permission model to ensure it correctly sets the name.

        Requirements Addressed:
        - Implement Role-Based Access Control (RBAC) for user permissions.
          Location: Technical Requirements/4.6 User and System Management
        """
        # Step 1: Create an instance of the Permission model with a sample name.
        permission_name = 'view_reports'
        permission = Permission(name=permission_name)

        # Step 2: Assert that the permission's name is set correctly.
        self.assertEqual(permission.name, permission_name, "Permission name should be set to 'view_reports'.")

    def test_add_permission_to_role(self):
        """
        Tests the add_permission method of the Role model to ensure it correctly adds
        a permission to the role.

        Requirements Addressed:
        - Implement Role-Based Access Control (RBAC) for user permissions.
          Location: Technical Requirements/4.6 User and System Management
        """
        # Step 1: Create an instance of the Role model.
        role = Role(name='User')

        # Step 2: Create an instance of the Permission model.
        permission = Permission(name='edit_profile')

        # Step 3: Add the permission to the role using add_permission.
        role.add_permission(permission)

        # Step 4: Assert that the permission is now in the role's permissions list.
        self.assertIn(permission, role.permissions, "Permission 'edit_profile' should be added to the role's permissions list.")

if __name__ == '__main__':
    unittest.main()