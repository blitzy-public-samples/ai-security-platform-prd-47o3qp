"""
Authorization Service Initialization

This file initializes the authorization service package, setting up the necessary imports and configurations for role-based access control (RBAC) within the platform.

Requirements Addressed:
- Implement Role-Based Access Control (RBAC) for user permissions.
  Location: Technical Requirements/4.6 User and System Management (Section TR-USM-006-1)

"""

# External dependencies
from flask import Flask  # Flask web framework (version 2.0.1)
from sqlalchemy import create_engine  # SQLAlchemy ORM (version 1.4.22)

# Internal imports
from .app import create_app  # Initializes the Flask application for the authorization service
from .config import configure_database  # Configures the database connection
from .routes import register_routes  # Registers HTTP routes for role and permission management
from .models import Role, Permission  # Defines user roles and associated permissions
from .services import assign_role_to_user, check_permission  # Service functions for RBAC operations
from .controllers import create_role, assign_role  # Controller functions for role management

# Initialize the Flask application
# The create_app function sets up the Flask app instance with necessary configurations.
# Refer to 'src/backend/authorization_service/app.py' for implementation details.
app = create_app()

# Configure the database connection for the authorization service
# The configure_database function sets up the database URI and initializes the SQLAlchemy engine.
# This is essential for persisting role and permission data.
# See 'src/backend/authorization_service/config.py' for configuration details.
configure_database(app)

# Register the HTTP routes with the Flask application
# The register_routes function maps URL endpoints to controller actions for managing roles and permissions.
# Enables clients to interact with the authorization service via RESTful APIs.
# Implementation aligns with TR-USM-006-1 in the technical requirements.
register_routes(app)

# Importing models and services at the package level
# This facilitates easier access to the Role and Permission models and RBAC service functions from other modules.
# Supports modular design and clean code architecture.

# Role and Permission Models:
# - Role: Defines the user roles within the system.
# - Permission: Defines the permissions that can be assigned to roles.
# Located in 'src/backend/authorization_service/models.py'

# Service Functions:
# - assign_role_to_user: Assigns a specific role to a user, updating their permissions.
# - check_permission: Checks if a user has a specific permission.
# Located in 'src/backend/authorization_service/services.py'

# Controller Functions:
# - create_role: Handles the creation of new roles with specified permissions.
# - assign_role: Handles the assignment of existing roles to users.
# Located in 'src/backend/authorization_service/controllers.py'

# These components collectively implement Role-Based Access Control (RBAC),
# fulfilling the requirement to "Implement Role-Based Access Control (RBAC) for user permissions."
# As specified in Technical Requirements/4.6 User and System Management (Section TR-USM-006-1)

# The authorization service is now initialized and ready to handle RBAC functionalities across the platform.