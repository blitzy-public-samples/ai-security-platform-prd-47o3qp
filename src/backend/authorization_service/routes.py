"""
Routes for the authorization service, handling HTTP requests related to role and permission management.

This module defines the routing logic for the authorization service, interfacing with the controller layer
to execute operations and return responses to clients.

Requirements addressed:
- Implement Role-Based Access Control (RBAC) for user permissions.
  Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-1)
"""

# External Dependencies
from flask import request, jsonify  # Flask version 2.0.1

# Internal Dependencies
from .controllers import create_role, assign_role, get_all_roles, update_role, delete_role

def register_routes(app):
    """
    Registers the HTTP routes for role and permission management within the authorization service.

    Parameters:
        app (Flask): The Flask application instance.

    Returns:
        None: This function does not return a value.

    Steps:
        - Define the route for creating a new role and link it to the create_role controller function.
        - Define the route for assigning a role to a user and link it to the assign_role controller function.
        - Add any additional routes necessary for managing roles and permissions.

    Requirements addressed:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-1)
    """

    @app.route('/roles', methods=['POST'])
    def create_role_route():
        """
        Endpoint to create a new role with specified permissions.

        This endpoint receives role data from the client, passes it to the controller layer, and returns a response.

        Requirements addressed:
        - Implement Role-Based Access Control (RBAC) for user permissions.
          Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-1)
        """
        role_data = request.get_json()
        result = create_role(role_data)
        return jsonify(result), 201

    @app.route('/roles/assign', methods=['POST'])
    def assign_role_route():
        """
        Endpoint to assign an existing role to a user.

        This endpoint receives user and role information from the client, passes it to the controller layer, and returns a response.

        Requirements addressed:
        - Implement Role-Based Access Control (RBAC) for user permissions.
          Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-1)
        """
        assignment_data = request.get_json()
        result = assign_role(assignment_data)
        return jsonify(result), 200

    @app.route('/roles', methods=['GET'])
    def get_roles_route():
        """
        Endpoint to retrieve all roles.

        This endpoint fetches all existing roles from the controller layer and returns them to the client.

        Requirements addressed:
        - Provide user management interfaces for creating and modifying user accounts and roles.
          Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-2)
        """
        roles = get_all_roles()
        return jsonify(roles), 200

    @app.route('/roles/<role_id>', methods=['PUT'])
    def update_role_route(role_id):
        """
        Endpoint to update an existing role.

        This endpoint receives updated role data from the client, passes it to the controller layer, and returns a response.

        Requirements addressed:
        - Provide user management interfaces for creating and modifying user accounts and roles.
          Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-2)
        """
        role_data = request.get_json()
        result = update_role(role_id, role_data)
        return jsonify(result), 200

    @app.route('/roles/<role_id>', methods=['DELETE'])
    def delete_role_route(role_id):
        """
        Endpoint to delete an existing role.

        This endpoint instructs the controller layer to remove a role and returns the appropriate response.

        Requirements addressed:
        - Provide user management interfaces for creating and modifying user accounts and roles.
          Reference: Technical Requirements/4.6 User and System Management (TR-USM-006-2)
        """
        result = delete_role(role_id)
        return '', 204