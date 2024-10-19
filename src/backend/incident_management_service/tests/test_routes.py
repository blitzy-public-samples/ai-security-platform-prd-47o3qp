"""
Unit tests for the HTTP routes defined in the Incident Management Service.
These tests ensure that the endpoints for creating, updating, and analyzing incidents function correctly.

Requirements Addressed:
- Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
"""

# External dependencies
import pytest  # pytest version 6.2.4
import requests  # requests version 2.25.1
from flask import Flask  # Flask version 1.1.2

# Internal dependencies
from src.backend.incident_management_service.app import create_app
from src.backend.incident_management_service.routes import register_routes  # Registers the HTTP routes
from src.backend.incident_management_service.controllers import (
    create_incident_controller,          # Handles the logic for creating a new incident
    update_incident_status_controller,   # Handles the logic for updating the status of an existing incident
    analyze_incident_controller          # Handles the logic for analyzing an incident and providing AI-driven recommendations
)

@pytest.fixture
def client():
    """
    Fixture to set up a test client for the Flask application.
    """
    app = create_app()
    register_routes(app)
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_create_incident(client):
    """
    Tests the '/incidents' POST route for creating a new incident.

    Steps:
    1. Set up a test client for the Flask application.
    2. Define test data for creating a new incident.
    3. Send a POST request to the '/incidents' endpoint with the test data.
    4. Assert that the response status code is 201 (Created).
    5. Assert that the response contains the expected incident details.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
    """
    # Step 2: Define test data for creating a new incident.
    test_data = {
        "title": "Test Incident",
        "description": "This is a test incident.",
        "detected_at": "2023-10-05T10:00:00Z"
    }

    # Step 3: Send a POST request to the '/incidents' endpoint with the test data.
    response = client.post('/incidents', json=test_data)

    # Step 4: Assert that the response status code is 201 (Created).
    assert response.status_code == 201

    # Step 5: Assert that the response contains the expected incident details.
    response_data = response.get_json()
    assert response_data['title'] == test_data['title']
    assert response_data['description'] == test_data['description']
    assert 'id' in response_data

def test_update_incident_status(client):
    """
    Tests the '/incidents/<incident_id>/status' PUT route for updating an incident's status.

    Steps:
    1. Set up a test client for the Flask application.
    2. Define test data for updating an incident's status.
    3. Create a test incident to update.
    4. Send a PUT request to the '/incidents/<incident_id>/status' endpoint with the test data.
    5. Assert that the response status code is 200 (OK).
    6. Assert that the response indicates a successful status update.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
    """
    # Step 2: Define test data for updating an incident's status.
    status_update = {
        "status": "resolved"
    }

    # Step 3: Create a test incident to update.
    incident_data = {
        "title": "Incident to Update",
        "description": "This incident will be updated.",
        "detected_at": "2023-10-05T11:00:00Z"
    }
    create_response = client.post('/incidents', json=incident_data)
    assert create_response.status_code == 201
    incident_id = create_response.get_json()['id']

    # Step 4: Send a PUT request to the '/incidents/<incident_id>/status' endpoint with the test data.
    response = client.put(f'/incidents/{incident_id}/status', json=status_update)

    # Step 5: Assert that the response status code is 200 (OK).
    assert response.status_code == 200

    # Step 6: Assert that the response indicates a successful status update.
    response_data = response.get_json()
    assert response_data['status'] == status_update['status']

def test_analyze_incident(client):
    """
    Tests the '/incidents/<incident_id>/analyze' GET route for analyzing an incident.

    Steps:
    1. Set up a test client for the Flask application.
    2. Create a test incident to analyze.
    3. Send a GET request to the '/incidents/<incident_id>/analyze' endpoint.
    4. Assert that the response status code is 200 (OK).
    5. Assert that the response contains AI-generated recommendations.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
    """
    # Step 2: Create a test incident to analyze.
    incident_data = {
        "title": "Incident to Analyze",
        "description": "This incident will be analyzed.",
        "detected_at": "2023-10-05T12:00:00Z"
    }
    create_response = client.post('/incidents', json=incident_data)
    assert create_response.status_code == 201
    incident_id = create_response.get_json()['id']

    # Step 3: Send a GET request to the '/incidents/<incident_id>/analyze' endpoint.
    response = client.get(f'/incidents/{incident_id}/analyze')

    # Step 4: Assert that the response status code is 200 (OK).
    assert response.status_code == 200

    # Step 5: Assert that the response contains AI-generated recommendations.
    response_data = response.get_json()
    assert 'recommendations' in response_data
    assert isinstance(response_data['recommendations'], list)