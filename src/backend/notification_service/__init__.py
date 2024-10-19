"""
Initializes the notification_service package by importing and exposing key components such as models, services, and API endpoints.
This allows for streamlined access and integration of the notification service functionalities.

Requirements Addressed:
- **Notification Management** (Technical Specification/4.5 Notification and Alert Interface):
    - Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
"""

# Importing internal components to expose them at the package level

from .models import Notification
# Defines the data model for notifications.
# Addresses data storage and modeling for notifications as per TR-CM-005 in Technical Specification/4.5.

from .config import load_config
# Loads configuration settings for the notification service.
# Ensures the service operates with the correct settings, aligning with TR-USM-006.

from .services import create_notification, send_notification
# Handles the creation and sending of notifications to recipients.
# Core functionality for managing notifications, fulfilling TR-IR-001 and TR-AM-003.

from .controllers import create_notification_endpoint, send_notification_endpoint
# API endpoints for creating and sending notifications.
# Provides interfaces for external clients to interact with the notification service, supporting TR-INT-010.

from .routes import setup_routes
# Configures the API routes for the notification service.
# Registers API endpoints with the FastAPI application instance, addressing TR-API-021.

from .app import app
# FastAPI application instance used to register routes.
# Central to serving the notification service's API, utilizing FastAPI version 0.68.0.

# Expose key components at the package level for streamlined access

__all__ = [
    "Notification",
    "create_notification",
    "send_notification",
    "create_notification_endpoint",
    "send_notification_endpoint",
    "setup_routes",
    "load_config",
    "app",
]