import pytest  # Version 6.2.4
from flask import json  # Version 2.0.1
from flask.testing import FlaskClient  # Version 2.0.1
from src.backend.playbook_engine.app import initialize_app  # Function to set up the Flask application for testing

@pytest.fixture
def client():
    """
    Fixture to initialize the Flask application and provide a test client.
    This addresses the requirement to initialize the Flask application using initialize_app,
    as specified in the test steps.

    Related Requirement:
    - Dynamic Playbook Generation
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """
    app = initialize_app()
    with app.test_client() as client:
        yield client

@pytest.mark.parametrize("playbook_data", [
    ({
        'name': 'Test Playbook',
        'steps': [
            {'action': 'Test Action 1', 'parameters': {}},
            {'action': 'Test Action 2', 'parameters': {}}
        ]
    }),
])
def test_create_playbook_route(client: FlaskClient, playbook_data):
    """
    Tests the API endpoint for creating a new playbook.

    Parameters:
        client (FlaskClient): The test client for simulating HTTP requests.
        playbook_data (dict): The data used to create a new playbook.

    Returns:
        None: This function does not return a value.

    Steps:
    1. Initialize the Flask application using initialize_app.
    2. Use the Flask test client to simulate a POST request to the create_playbook_route.
    3. Assert that the response status code is 201 (Created).
    4. Verify that the response contains the expected playbook data.

    Requirements Addressed:
    - Dynamic Playbook Generation
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """

    # Simulate a POST request to the create_playbook_route using the parameterized playbook_data
    response = client.post('/playbook', json=playbook_data)

    # Assert that the response status code is 201 (Created)
    assert response.status_code == 201, f"Expected status code 201, got {response.status_code}"

    # Verify that the response contains the expected playbook data
    response_data = response.get_json()
    assert 'id' in response_data, "Response JSON should contain 'id'"
    assert response_data['name'] == playbook_data['name'], "Playbook name does not match"
    assert response_data['steps'] == playbook_data['steps'], "Playbook steps do not match"

@pytest.mark.parametrize("original_data, updated_data", [
    (
        {
            'name': 'Original Playbook',
            'steps': [
                {'action': 'Original Action', 'parameters': {}}
            ]
        },
        {
            'name': 'Updated Playbook',
            'steps': [
                {'action': 'Updated Action', 'parameters': {}}
            ]
        }
    ),
])
def test_update_playbook_route(client: FlaskClient, original_data, updated_data):
    """
    Tests the API endpoint for updating an existing playbook.

    Parameters:
        client (FlaskClient): The test client for simulating HTTP requests.
        original_data (dict): The original playbook data.
        updated_data (dict): The updated playbook data.

    Returns:
        None: This function does not return a value.

    Steps:
    1. Initialize the Flask application using initialize_app.
    2. Use the Flask test client to simulate a PUT request to the update_playbook_route.
    3. Assert that the response status code is 200 (OK).
    4. Verify that the response indicates a successful update.

    Requirements Addressed:
    - Dynamic Playbook Generation
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """

    # Create the original playbook to be updated
    create_response = client.post('/playbook', json=original_data)
    assert create_response.status_code == 201, f"Failed to create playbook, status code {create_response.status_code}"
    playbook_id = create_response.get_json()['id']

    # Simulate a PUT request to the update_playbook_route
    response = client.put(f'/playbook/{playbook_id}', json=updated_data)

    # Assert that the response status code is 200 (OK)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    # Verify that the response indicates a successful update
    response_data = response.get_json()
    assert response_data['message'] == 'Playbook updated successfully', "Update message mismatch"
    assert response_data['playbook']['name'] == updated_data['name'], "Playbook name was not updated"
    assert response_data['playbook']['steps'] == updated_data['steps'], "Playbook steps were not updated"

@pytest.mark.parametrize("playbook_data", [
    ({
        'name': 'Executable Playbook',
        'steps': [
            {'action': 'Action 1', 'parameters': {}},
            {'action': 'Action 2', 'parameters': {}}
        ]
    }),
])
def test_execute_playbook_route(client: FlaskClient, playbook_data):
    """
    Tests the API endpoint for executing a playbook.

    Parameters:
        client (FlaskClient): The test client for simulating HTTP requests.
        playbook_data (dict): The playbook data to be executed.

    Returns:
        None: This function does not return a value.

    Steps:
    1. Initialize the Flask application using initialize_app.
    2. Use the Flask test client to simulate a POST request to the execute_playbook_route.
    3. Assert that the response status code is 200 (OK).
    4. Verify that the response indicates a successful execution.

    Requirements Addressed:
    - Dynamic Playbook Generation
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """

    # Create a playbook to execute
    create_response = client.post('/playbook', json=playbook_data)
    assert create_response.status_code == 201, f"Failed to create playbook, status code {create_response.status_code}"
    playbook_id = create_response.get_json()['id']

    # Simulate a POST request to the execute_playbook_route
    response = client.post(f'/playbook/{playbook_id}/execute')

    # Assert that the response status code is 200 (OK)
    assert response.status_code == 200, f"Expected status code 200, got {response.status_code}"

    # Verify that the response indicates a successful execution
    response_data = response.get_json()
    assert response_data['message'] == 'Playbook executed successfully', "Execution message mismatch"
    assert response_data['playbook_id'] == playbook_id, "Executed playbook ID mismatch"