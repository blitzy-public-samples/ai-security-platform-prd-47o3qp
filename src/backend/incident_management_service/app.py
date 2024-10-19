# External dependencies
from flask import Flask  # Flask version 1.1.2 provides the web framework for handling HTTP requests and routing

# Internal dependencies
from .routes import register_routes  # Registers the HTTP routes for incident management with the Flask application
from .config import get_database_connection  # Establishes a connection to the MongoDB database using the configured URI

def create_app():
    """
    Initializes and configures the Flask application for the incident management service.

    Requirements Addressed:
    - Incident Response Automation
      Location: Technical Specification/4.1 Incident Response Automation
      Description:
        Automate the detection, logging, analysis, and resolution of security incidents using AI-driven workflows
        to ensure consistent and efficient incident handling.

    Returns:
        Flask: The initialized and configured Flask application instance.
    """
    # Create a new Flask application instance.
    app = Flask(__name__)  # Initialize the Flask application.

    # Configure the application with necessary settings and database connections.

    # Step 1: Establish a connection to the MongoDB database using the configured URI.
    # This connection is essential for accessing incident data and performing CRUD operations.
    db = get_database_connection()

    # Store the database connection in the app configuration for access in other components.
    app.config['DB_CONNECTION'] = db

    # Step 2: Call register_routes to set up HTTP routes for incident management.
    # This sets up endpoints for incident detection, logging, analysis, and resolution,
    # aligning with the Incident Response Automation requirements.
    register_routes(app)

    # Return the configured Flask application instance.
    return app

# Initialize the Flask application instance.
app = create_app()  # Global Flask application instance