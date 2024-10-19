"""
App initialization for the authentication service.

This module initializes and configures the Flask application for the authentication service, including setting up routes,
middleware, and application-level configurations.

Requirements Addressed:
- User Authentication and Token Management
  - Location: Technical Specification/4.6 User and System Management (TR-USM-006)
  - Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.
"""

# External dependencies
from flask import Flask  # Flask version 2.0.1
import jwt  # PyJWT version 2.1.0

# Internal dependencies
from models import UserModel
from config import get_database_connection
from services import authenticate_user, generate_token
from controllers import login_user, logout_user
from routes import register_routes

# Global variable: Initialize the Flask application instance
app = Flask(__name__)

def create_app():
    """
    Configures the Flask application instance for the authentication service.

    Returns:
        Flask: A configured Flask application instance.

    Steps:
        1. Configure the application using environment-specific settings.
        2. Establish a database connection using get_database_connection.
        3. Register authentication routes using register_routes.
        4. Return the configured Flask application instance.

    Requirements Addressed:
    - User Authentication and Token Management
      - Location: Technical Specification/4.6 User and System Management (TR-USM-006)
      - Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.
    """
    global app

    # Step 1: Configure the application using environment-specific settings.
    # Load configuration settings such as SECRET_KEY, MONGODB_URI, and JWT configurations.
    # This addresses TR-USM-006-3: "Provide configuration settings for system integrations with third-party tools."
    app.config.from_object('config.Config')

    # Step 2: Establish a database connection using get_database_connection.
    # Sets up the connection to the MongoDB database for user data storage.
    # Addresses TR-DM-011-2: "Employ a NoSQL database (e.g., MongoDB) for unstructured data storage."
    app.db = get_database_connection(app.config['MONGODB_URI'])

    # Step 3: Register authentication routes using register_routes.
    # Initializes endpoints for login, logout, and token management.
    # Essential for TR-IR-001: "Automate the detection, logging, analysis, and resolution of security incidents."
    register_routes(app)

    # Step 4: Return the configured Flask application instance.
    return app

if __name__ == '__main__':
    # Create and run the application.
    # Note: In production, use a WSGI server like Gunicorn as per best practices (TR-PO-012-4).
    app = create_app()
    app.run(host='0.0.0.0', port=5000)