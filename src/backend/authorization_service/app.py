"""
Authorization Service Entry Point

This file serves as the entry point for the authorization service, initializing the Flask application,
configuring routes, and setting up the database connection for role-based access control (RBAC).
This addresses the following requirement:

- Implement Role-Based Access Control (RBAC) for user permissions.
  Requirement ID: TR-USM-006-1
  Location: Technical Requirements/4.6 User and System Management
"""

from flask import Flask  # External Dependency: Flask version 2.0.1; provides the web framework for handling HTTP requests and responses.
from config import configure_database  # Internal Dependency: Configures the database connection for the authorization service.
from routes import register_routes  # Internal Dependency: Registers the HTTP routes for role and permission management within the authorization service.

# Global Flask application instance
app = Flask(__name__)

def create_app():
    """
    Initializes the Flask application for the authorization service, setting up configurations and routes.

    Returns:
        Flask: The initialized Flask application instance.
    """

    # Step 1: The global 'app' instance is already created with Flask(__name__)

    # Step 2: Configure the database connection using the configure_database function
    configure_database(app)
    # Database configuration is set up to support Role-Based Access Control (RBAC) as per requirement TR-USM-006-1
    # (Technical Requirements/4.6 User and System Management)

    # Step 3: Register the HTTP routes using the register_routes function
    register_routes(app)
    # Routes for role and permission management are registered to handle HTTP requests for RBAC functionalities

    # Step 4: Return the initialized Flask application instance
    return app

if __name__ == '__main__':
    create_app()
    app.run()