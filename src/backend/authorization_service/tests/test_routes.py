"""
Unit tests for the authorization service routes, ensuring that the HTTP endpoints for role and permission management function correctly.

Requirements Addressed:
- Implement Role-Based Access Control (RBAC) for user permissions.
  Location: Technical Requirements/4.6 User and System Management
"""

import pytest  # pytest version 6.2.4
from flask import json  # Flask version 2.0.1
from src.backend.authorization_service.app import create_app

@pytest.fixture
def client():
    """
    Pytest fixture to initialize the Flask test client.

    Returns:
    - client (FlaskClient): The Flask test client instance.

    Steps:
    1. Initialize the Flask application using the create_app function.
    2. Create and return the Flask test client.

    Requirements Addressed:
    - Supports testing of the authorization service routes.
    """

    # Step 1: Initialize the Flask application using the create_app function.
    app = create_app()

    # Step 2: Create and return the Flask test client.
    with app.test_client() as client:
        yield client

@pytest.mark.parametrize("role_data", [
    {"name": "admin", "permissions": ["read", "write", "delete"]},
    {"name": "user", "permissions": ["read"]},
    {"name": "guest", "permissions": []}
])
def test_create_role(client, role_data):
    """
    Tests the HTTP endpoint for creating a new role, ensuring it returns the correct status and response.

    Parameters:
    - client (FlaskClient): The Flask test client.
    - role_data (dict): Data for the role to be created.

    Returns:
    - None: This function does not return a value.

    Steps:
    1. Send a POST request to the '/roles' endpoint with role data.
    2. Assert that the response status code is 201 (Created).
    3. Verify that the response data contains the expected role information.

    Requirements Addressed:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      Location: Technical Requirements/4.6 User and System Management
    """

    # Step 1: Send a POST request to the '/roles' endpoint with role data.
    response = client.post('/roles', data=json.dumps(role_data), content_type='application/json')

    # Step 2: Assert that the response status code is 201 (Created).
    assert response.status_code == 201, f"Expected status code 201, got {response.status_code}"

    # Step 3: Verify that the response data contains the expected role information.
    response_data = json.loads(response.data)
    assert response_data['name'] == role_data['name'], "Returned role name does not match"
    assert response_data['permissions'] == role_data['permissions'], "Returned permissions do not match"

@pytest.mark.parametrize("user_role_data", [
    {"user_id": 1, "role_name": "admin"},
    {"user_id": 2, "role_name": "user"},
    {"user_id": 3, "role_name": "guest"}
])
def test_assign_role(client, user_role_data):
    """
    Tests the HTTP endpoint for assigning a role to a user, ensuring it returns the correct status and response.

    Parameters:
    - client (FlaskClient): The Flask test client.
    - user_role_data (dict): Data containing user_id and role_name for role assignment.

    Returns:
    - None: This function does not return a value.

    Steps:
    1. Send a POST request to the '/assign-role' endpoint with user and role data.
    2. Assert that the response status code is 200 (OK).
    3. Verify that the response data confirms the role assignment.

    Requirements Addressed:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      Location: Technical Requirements/4.6 User and System Management
    """

    # Step 1: Send a POST request to the '/assign-role' endpoint with user and role data.
    response = client.post('/assign-role', data=json.dumps(user_role_data), content_type='application/json')

    # Step 2: Assert that the response status code is 200 (OK).
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    # Step 3: Verify that the response data confirms the role assignment.
    response_data = json.loads(response.data)
    assert response_data['user_id'] == user_role_data['user_id'], "User ID does not match"
    assert response_data['role_name'] == user_role_data['role_name'], "Role name does not match"
    assert response_data['message'] == "Role assigned successfully", "Unexpected response message"