"""
Unit tests for the notification service API routes.

This module contains unit tests for the endpoints defined in the notification service. It ensures that the endpoints for creating and sending notifications function as expected, handling various input scenarios and edge cases.

Requirements Addressed:
- Notification Management (Technical Specification/4.5 Notification and Alert Interface)
  - Ensures that the notification service endpoints are tested for correct functionality, including creating and sending notifications.
"""

# External dependencies
from fastapi import status  # FastAPI version 0.68.0
from fastapi.testclient import TestClient  # TestClient from FastAPI version 0.68.0

# Internal dependencies
from src.backend.notification_service.app import app  # FastAPI application instance used to register routes.
from src.backend.notification_service.controllers import (
    create_notification_endpoint,
    send_notification_endpoint,
)  # API endpoints for creating and sending notifications.

# Initialize the TestClient with the FastAPI app.
client = TestClient(app)


def test_create_notification():
    """
    Tests the create notification endpoint for successful notification creation.

    Steps:
    1. Initialize the TestClient with the FastAPI app.
    2. Send a POST request to the create notification endpoint with valid data.
    3. Assert that the response status code is 201 (Created).
    4. Assert that the response body contains the expected notification data.

    Requirements Addressed:
    - Notification Management (Technical Specification/4.5 Notification and Alert Interface)
      - Ensures that notifications can be created via the API correctly.
    """
    # Prepare the request data for creating a notification.
    notification_data = {
        "title": "Test Notification",
        "message": "This is a test notification.",
        "recipient_id": 12345,
    }

    # Send a POST request to the create notification endpoint with valid data.
    response = client.post("/notifications/create", json=notification_data)

    # Assert that the response status code is 201 (Created).
    assert response.status_code == status.HTTP_201_CREATED

    # Parse the response JSON.
    response_data = response.json()

    # Assert that the response body contains the expected notification data.
    assert response_data["title"] == notification_data["title"]
    assert response_data["message"] == notification_data["message"]
    assert response_data["recipient_id"] == notification_data["recipient_id"]


def test_send_notification():
    """
    Tests the send notification endpoint for successful notification delivery.

    Steps:
    1. Initialize the TestClient with the FastAPI app.
    2. Send a POST request to the send notification endpoint with a valid notification ID.
    3. Assert that the response status code is 200 (OK).
    4. Assert that the response body indicates successful notification delivery.

    Requirements Addressed:
    - Notification Management (Technical Specification/4.5 Notification and Alert Interface)
      - Ensures that notifications can be sent via the API correctly.
    """
    # First, create a notification to be sent.
    notification_data = {
        "title": "Send Notification Test",
        "message": "This notification will be sent.",
        "recipient_id": 67890,
    }

    # Send a POST request to create the notification.
    create_response = client.post("/notifications/create", json=notification_data)
    assert create_response.status_code == status.HTTP_201_CREATED

    # Extract the notification ID from the response.
    created_notification = create_response.json()
    notification_id = created_notification.get("id")

    # Ensure the notification ID was returned.
    assert notification_id is not None

    # Send a POST request to the send notification endpoint with the valid notification ID.
    send_response = client.post(f"/notifications/send/{notification_id}")

    # Assert that the response status code is 200 (OK).
    assert send_response.status_code == status.HTTP_200_OK

    # Parse the response JSON.
    send_response_data = send_response.json()

    # Assert that the response body indicates successful notification delivery.
    assert send_response_data.get("status") == "Success"
    assert send_response_data.get("message") == "Notification sent successfully."