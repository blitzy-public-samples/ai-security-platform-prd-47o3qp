"""
Routes configuration for the Notification Service.

This module is responsible for setting up the API routes for the notification service.
It integrates with the FastAPI application to define endpoints for creating and sending notifications,
ensuring that the service can handle HTTP requests related to notification management.

Requirements Addressed:
- Notification Management (Technical Specification/4.5 Notification and Alert Interface):
  Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
"""

# External imports
from fastapi import APIRouter  # Provides tools for creating API routes (FastAPI version 0.68.0)

# Internal imports
from .app import app  # FastAPI application instance used to register routes
from .controllers import create_notification_endpoint, send_notification_endpoint  # API endpoints for notification operations

def setup_routes():
    """
    Configures the API routes for the notification service.

    Steps:
    1. Import the FastAPI application instance from app.py.
    2. Import the create_notification_endpoint and send_notification_endpoint from controllers.py.
    3. Register the create_notification_endpoint with the FastAPI app using the appropriate HTTP method and path.
    4. Register the send_notification_endpoint with the FastAPI app using the appropriate HTTP method and path.

    Related Requirements:
    - Notification Management (Technical Specification/4.5 Notification and Alert Interface):
      Ensures the service can handle HTTP requests related to notification management, including creation and sending of notifications.

    Returns:
        None
    """
    # Create an APIRouter instance
    router = APIRouter()

    # Step 3: Register the create_notification_endpoint
    # This endpoint handles HTTP POST requests to create a new notification.
    # Related Requirement: Notification Management (Technical Specification/4.5 Notification and Alert Interface)
    @router.post("/notifications/create")
    async def create_notification():
        return await create_notification_endpoint()

    # Step 4: Register the send_notification_endpoint
    # This endpoint handles HTTP POST requests to send a notification.
    # Related Requirement: Notification Management (Technical Specification/4.5 Notification and Alert Interface)
    @router.post("/notifications/send")
    async def send_notification():
        return await send_notification_endpoint()

    # Include the router in the FastAPI application instance
    app.include_router(router)

# Call setup_routes to register routes when the module is imported
setup_routes()