# External Dependencies
# SQLAlchemy==1.4.22
from sqlalchemy import create_engine  # Provides ORM capabilities for defining and interacting with the database models (SQLAlchemy 1.4.22)

# Standard Library Imports
import os  # Provides functions to interact with the operating system

# Global Configuration Variables
# Retrieve the DATABASE_URI from environment variables or use the default
DATABASE_URI = os.getenv('DATABASE_URI', 'sqlite:///default.db')

def configure_database():
    """
    Configures the database connection using SQLAlchemy, setting up the necessary engine and session maker.

    Requirements Addressed:
    - Role-Based Access Control (RBAC)
      Location: Technical Requirements/4.6 User and System Management
      Description: Implement Role-Based Access Control (RBAC) for user permissions.

    Steps:
    1. Retrieve the DATABASE_URI from environment variables.
    2. Create an SQLAlchemy engine using the DATABASE_URI.
    3. Configure the session maker with the engine.
    4. Return the configured engine.

    Returns:
        sqlalchemy.engine.Engine: The SQLAlchemy engine instance configured for the authorization service.
    """
    # Step 1: Retrieve the DATABASE_URI from environment variables.
    # Note: The DATABASE_URI is already retrieved globally.

    # Step 2: Create an SQLAlchemy engine using the DATABASE_URI.
    engine = create_engine(DATABASE_URI)

    # Step 3: Configure the session maker with the engine.
    from sqlalchemy.orm import sessionmaker  # Provides a factory for session objects
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

    # Step 4: Return the configured engine.
    return engine