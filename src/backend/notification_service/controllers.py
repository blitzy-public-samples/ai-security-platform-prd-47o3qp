"""
Controllers for notification-related operations.

This file defines the controller logic for handling notification-related operations.
It interfaces with the services to process requests and manage the flow of data between
the API endpoints and the notification service logic.

Requirements Addressed:
- Notification Management (Technical Specification/4.5 Notification and Alert Interface):
  Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
"""

# External dependencies
from fastapi import APIRouter, HTTPException  # FastAPI version 0.68.0
from pydantic import BaseModel  # Pydantic version 1.8.2

# Internal dependencies
from .models import Notification  # Defines the data model for notifications.
from .services import create_notification, send_notification  # Handles the creation and sending of notifications.

# Initialize API router
router = APIRouter()

# Pydantic models for request validation

class CreateNotificationRequest(BaseModel):
    """
    Data model for creating a new notification.
    """
    message: str
    recipient: str

class SendNotificationRequest(BaseModel):
    """
    Data model for sending a notification.
    """
    notification_id: int

@router.post("/notifications")
async def create_notification_endpoint(request: CreateNotificationRequest):
    """
    API endpoint for creating a new notification.

    Requirements Addressed:
    - Notification Management (Technical Specification/4.5 Notification and Alert Interface):
      Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.

    Steps:
    1. Receive the message and recipient from the request body.
    2. Call the create_notification service with the provided message and recipient.
    3. Return the created Notification object as a response.
    """
    # Step 1: Receive the message and recipient from the request body.
    message = request.message
    recipient = request.recipient

    # Step 2: Call the create_notification service with the provided message and recipient.
    try:
        notification = create_notification(message=message, recipient=recipient)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating notification: {str(e)}")

    # Step 3: Return the created Notification object as a response.
    return notification

@router.post("/notifications/send")
async def send_notification_endpoint(request: SendNotificationRequest):
    """
    API endpoint for sending a notification.

    Requirements Addressed:
    - Notification Management (Technical Specification/4.5 Notification and Alert Interface):
      Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.

    Steps:
    1. Receive the notification_id from the request body.
    2. Retrieve the Notification object using the notification_id.
    3. Call the send_notification service with the retrieved Notification object.
    4. Return the result of the send operation as a response.
    """
    # Step 1: Receive the notification_id from the request body.
    notification_id = request.notification_id

    # Step 2: Retrieve the Notification object using the notification_id.
    notification = Notification.get(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found.")

    # Step 3: Call the send_notification service with the retrieved Notification object.
    try:
        success = send_notification(notification)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error sending notification: {str(e)}")

    # Step 4: Return the result of the send operation as a response.
    return {"success": success}