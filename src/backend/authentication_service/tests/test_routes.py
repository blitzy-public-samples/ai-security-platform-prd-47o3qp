"""
Unit tests for authentication service routes.

These tests ensure that the login and logout endpoints function correctly and handle various scenarios.

Requirements Addressed:
- **User Authentication and Token Management**
  - Location: Technical Specification/4.6 User and System Management
  - Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.
"""

# External dependencies
import pytest  # pytest version 6.2.4 (Provides the testing framework for writing and executing test cases)
from flask import Flask  # Flask version 2.0.1 (Used to create a test client for simulating HTTP requests to the application)

# Internal dependencies
from src.backend.authentication_service.app import create_app  # Sets up the Flask application for testing purposes

@pytest.fixture
def client():
    """
    Fixture to create a Flask test client for the authentication service.

    This fixture sets up the Flask application in testing mode and provides a test client for simulating HTTP requests.

    Dependencies:
    - create_app: Initializes the Flask application.
    """
    app = create_app()
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

@pytest.mark.parametrize("credentials, expected_status, expected_response_key", [
    ({"username": "valid_user", "password": "valid_password"}, 200, "token"),
    ({"username": "invalid_user", "password": "invalid_password"}, 401, "error"),
])
def test_login_route(client, credentials, expected_status, expected_response_key):
    """
    Tests the login route to ensure it returns a JWT token for valid credentials and an error message for invalid credentials.

    Parameters:
    - client (FlaskClient): The test client used to simulate HTTP requests.

    Returns:
    - None: This function does not return a value; it asserts expected outcomes.

    Decorators:
    - @pytest.mark.parametrize: Parametrizes the test with different credential scenarios.

    Steps:
    1. Use the test client to send a POST request to the login route with the provided credentials.
    2. Assert that the response status code matches the expected status code.
    3. Assert that the expected key (either 'token' or 'error') is present in the JSON response.

    Requirements Addressed:
    - **User Authentication and Token Management**
      - Location: Technical Specification/4.6 User and System Management
      - Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.
    """
    # Step 1: Send POST request to the login route with the provided credentials
    response = client.post('/login', json=credentials)

    # Step 2: Assert that the response status code matches the expected status code
    assert response.status_code == expected_status, f"Expected status code {expected_status}, got {response.status_code}"

    # Step 3: Assert that the expected response key is present in the JSON response
    response_data = response.get_json()
    assert expected_response_key in response_data, f"Expected key '{expected_response_key}' in response, got {response_data}"

def test_logout_route(client):
    """
    Tests the logout route to ensure it invalidates the JWT token and returns a confirmation message.

    Parameters:
    - client (FlaskClient): The test client used to simulate HTTP requests.

    Returns:
    - None: This function does not return a value; it asserts expected outcomes.

    Steps:
    1. Authenticate and obtain a valid JWT token.
    2. Use the test client to send a POST request to the logout route with the valid JWT token.
    3. Assert that the response status code is 200 and a confirmation message is returned.
    4. Send a POST request without a JWT token.
    5. Assert that the response status code is 401 and an error message is returned.

    Requirements Addressed:
    - **User Authentication and Token Management**
      - Location: Technical Specification/4.6 User and System Management
      - Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.
    """
    # Step 1: Authenticate and obtain a valid JWT token
    valid_credentials = {"username": "valid_user", "password": "valid_password"}
    login_response = client.post('/login', json=valid_credentials)
    assert login_response.status_code == 200, f"Expected status code 200 for login, got {login_response.status_code}"
    login_data = login_response.get_json()
    token = login_data.get('token')
    assert token is not None, "Expected token in login response"

    # Step 2: Use the test client to send a POST request to the logout route with the valid JWT token
    headers = {'Authorization': f'Bearer {token}'}
    logout_response = client.post('/logout', headers=headers)

    # Step 3: Assert that the response status code is 200 and a confirmation message is returned
    assert logout_response.status_code == 200, f"Expected status code 200 for logout, got {logout_response.status_code}"
    logout_data = logout_response.get_json()
    assert 'message' in logout_data, f"Expected 'message' in logout response, got {logout_data}"

    # Step 4: Send a POST request without a JWT token
    no_token_response = client.post('/logout')

    # Step 5: Assert that the response status code is 401 and an error message is returned
    assert no_token_response.status_code == 401, f"Expected status code 401 for logout without token, got {no_token_response.status_code}"
    no_token_data = no_token_response.get_json()
    assert 'error' in no_token_data, f"Expected 'error' in response, got {no_token_data}"