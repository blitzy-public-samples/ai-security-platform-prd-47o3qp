"""
Defines the data model for notifications within the notification service, including attributes and methods for managing notification data.

Addresses the requirement 'Notification Management' located at 'Technical Specification/4.5 Notification and Alert Interface':
"Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status."
"""

import datetime

# Importing SQLAlchemy ORM capabilities
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base  # SQLAlchemy version 1.4.22
Base = declarative_base()

# Importing Pydantic for data validation
from pydantic import BaseModel  # Pydantic version 1.8.2

# Internal dependency to load configuration settings
from .config import load_config
config = load_config()

class Notification(Base):
    """
    SQLAlchemy model representing a notification entity with attributes for message, recipient, status, and timestamps.

    This class addresses 'Notification Management' as specified in Technical Specification/4.5 Notification and Alert Interface.
    """
    __tablename__ = 'notifications'

    id = Column(Integer, primary_key=True)
    message = Column(String, nullable=False)
    recipient = Column(String, nullable=False)
    status = Column(String, default='pending')
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    def __init__(self, message: str, recipient: str):
        """
        Initializes a new Notification instance with the provided message and recipient.

        Parameters:
            message (str): The message content of the notification.
            recipient (str): The recipient of the notification.

        Steps:
            1. Set the message and recipient attributes.
            2. Initialize the status to 'pending'.
            3. Set the created_at and updated_at timestamps to the current time.
        """
        self.message = message
        self.recipient = recipient
        self.status = 'pending'
        self.created_at = datetime.datetime.utcnow()
        self.updated_at = self.created_at

    def mark_as_sent(self) -> None:
        """
        Updates the notification status to 'sent' and records the timestamp.

        Steps:
            1. Update the status attribute to 'sent'.
            2. Set the updated_at timestamp to the current time.

        Returns:
            None
        """
        self.status = 'sent'
        self.updated_at = datetime.datetime.utcnow()

class NotificationModel(BaseModel):
    """
    Pydantic model for data validation of Notification entities.

    This model addresses 'Notification Management' as specified in Technical Specification/4.5 Notification and Alert Interface.
    """
    message: str
    recipient: str
    status: str = 'pending'
    created_at: datetime.datetime = None
    updated_at: datetime.datetime = None

    class Config:
        orm_mode = True