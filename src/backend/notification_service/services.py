"""
Services for managing notifications.

Handles the core logic for managing notifications, including creating and sending notifications.
Interfaces with models and configurations to ensure notifications are processed and delivered correctly.

Requirements Addressed:
- Notification Management (Technical Specification/4.5 Notification and Alert Interface):
    - Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
"""

# External Dependencies
from sqlalchemy.orm import Session  # SQLAlchemy version 1.4.22 - Provides ORM capabilities for interacting with the notification data model.
from pydantic import ValidationError  # Pydantic version 1.8.2 - Used for data validation and settings management.

# Internal Dependencies
from .models import Notification  # Defines the data model for notifications.
from .config import load_config  # Loads configuration settings for the notification service.


def create_notification(session: Session, message: str, recipient: str) -> Notification:
    """
    Creates a new notification and saves it to the database.

    Parameters:
        session (Session): The SQLAlchemy session for database operations.
        message (str): The message content of the notification.
        recipient (str): The recipient identifier (e.g., user ID or email).

    Returns:
        Notification: The created Notification object.

    Requirements Addressed:
        - Notification Management (Technical Specification/4.5 Notification and Alert Interface):
            - Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
    """
    # Step 1: Load configuration settings using load_config.
    config = load_config()

    # Step 2: Create a new Notification instance with the provided message and recipient.
    try:
        notification = Notification(
            message=message,
            recipient=recipient,
            status='pending'  # Initial status is 'pending'.
        )
    except ValidationError as ve:
        # Handle validation errors from Pydantic models.
        # Log the error or raise an exception as appropriate.
        raise ve

    # Step 3: Save the Notification instance to the database using SQLAlchemy.
    session.add(notification)
    session.commit()
    session.refresh(notification)  # Refresh to get updated fields from the database.

    # Step 4: Return the created Notification object.
    return notification


def send_notification(session: Session, notification: Notification) -> bool:
    """
    Sends a notification to the specified recipient.

    Parameters:
        session (Session): The SQLAlchemy session for database operations.
        notification (Notification): The Notification object to be sent.

    Returns:
        bool: True if the notification was sent successfully, False otherwise.

    Requirements Addressed:
        - Notification Management (Technical Specification/4.5 Notification and Alert Interface):
            - Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
    """
    # Step 1: Check the notification's status to ensure it is 'pending'.
    if notification.status != 'pending':
        # The notification has already been sent or is in an invalid state.
        return False

    # Step 2: Use external services or APIs to send the notification to the recipient.
    try:
        # Implement the logic to send the notification.
        # This could involve sending an email, SMS, or push notification.
        # For example, using an email service:
        # email_service.send_email(recipient=notification.recipient, message=notification.message)

        # For the purpose of this example, we'll assume the notification is sent successfully.
        sent = True
    except Exception as e:
        # Handle any exceptions that occur during the sending process.
        # Log the error for debugging and auditing purposes.
        sent = False

    # Step 3: Update the notification's status and save changes to the database.
    if sent:
        notification.status = 'sent'
        # Optionally, record the timestamp when the notification was sent.
        # notification.sent_at = datetime.utcnow()
    else:
        # Optionally update the status to 'failed' to indicate the send operation was unsuccessful.
        notification.status = 'failed'

    session.commit()

    # Step 4: Return True if the operation was successful, otherwise return False.
    return sent