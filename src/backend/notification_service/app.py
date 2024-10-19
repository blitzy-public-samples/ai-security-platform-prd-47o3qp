"""
Notification Service Application Initialization

This file initializes the FastAPI application for the notification service, sets up the necessary configurations,
and registers the API routes for managing notifications. It serves as the entry point for the notification service,
ensuring that all components are properly integrated and operational.

Requirements Addressed:
- **Notification Management**
  - *Location*: Technical Specification/4.5 Notification and Alert Interface
  - *Description*: Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.
"""

# External dependencies (third-party libraries)
from fastapi import FastAPI  # FastAPI version 0.68.0 - Provides the web framework for building the API endpoints.
from sqlalchemy import create_engine  # SQLAlchemy version 1.4.22 - Provides ORM capabilities for data modeling.
from sqlalchemy.orm import sessionmaker  # SQLAlchemy ORM session maker.
from pydantic import BaseModel  # Pydantic version 1.8.2 - Used for data validation and settings management.

# Internal dependencies (modules within the notification service)
from src.backend.notification_service.config import load_config  # Loads configuration settings for the notification service.
from src.backend.notification_service.models import Base  # Defines the data model for notifications.
from src.backend.notification_service.services import create_notification, send_notification  # Handles notification logic.
from src.backend.notification_service.controllers import (
    create_notification_endpoint,
    send_notification_endpoint,
)  # API endpoints for creating and sending notifications.
from src.backend.notification_service.routes import setup_routes  # Configures the API routes for the notification service.

# Global FastAPI application instance
app = FastAPI()

def initialize_app() -> FastAPI:
    """
    Initializes the FastAPI application and sets up the notification service routes.

    **Requirements Addressed**:
    - **Notification Management**
      - *Location*: Technical Specification/4.5 Notification and Alert Interface
      - *Description*: Manages sending notifications and alerts to users, ensuring timely delivery and tracking of notification status.

    **Steps**:
    1. **Create a FastAPI application instance**.
    2. **Load configuration settings using load_config**.
    3. **Set up the database connection using SQLAlchemy**.
    4. **Register the create_notification_endpoint and send_notification_endpoint with the FastAPI app**.
    5. **Return the initialized FastAPI application instance**.

    **Returns**:
        FastAPI: The initialized FastAPI application instance.
    """

    # Step 1: Create a FastAPI application instance.
    app = FastAPI(
        title="Notification Service",
        description="API for managing notifications and alerts.",
        version="1.0.0",
    )

    # Step 2: Load configuration settings using load_config.
    # This loads settings such as database URLs, API keys, and other configurations.
    config = load_config()

    # Step 3: Set up the database connection using SQLAlchemy.
    # Create an engine connected to the database specified in the configuration.
    engine = create_engine(config.DATABASE_URL, echo=config.DEBUG)

    # Create a configured "SessionLocal" class for database sessions.
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Create all tables defined in the data models.
    # Ensures that the Notification table is created in the database.
    Base.metadata.create_all(bind=engine)

    # Attach the database session to the app for use in routes.
    # Allows dependency injection of the database session into API endpoints.
    app.state.db = SessionLocal

    # Step 4: Register the create_notification_endpoint and send_notification_endpoint with the FastAPI app.
    # The setup_routes function from routes.py handles adding all the necessary routes.
    setup_routes(app)

    # Step 5: Return the initialized FastAPI application instance.
    return app

# Main entry point for the application.
# Initializes the FastAPI application instance by calling initialize_app().
app = initialize_app()