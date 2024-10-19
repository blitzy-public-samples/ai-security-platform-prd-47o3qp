"""
Application entry point for the AI Recommendation Engine.

This module initializes and configures the Flask application for the AI Recommendation Engine,
setting up routes and integrating necessary services.

Requirements Addressed:
- AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance):
  Provide real-time, context-aware recommendations and interactive assistance to security analysts
  during incident investigations.
"""

# External dependencies
from flask import Flask  # Flask version 2.0.1 (Used for creating the web server and handling HTTP requests)

# Internal dependencies
from config import get_model_path  # Provides the file path for the pre-trained recommendation model
from routes import setup_routes    # Configures the Flask app with the necessary routes for the AI Recommendation Engine


def create_app():
    """
    Initializes the Flask application and sets up the necessary routes and configurations
    for the AI Recommendation Engine.

    Steps:
    1. Create a Flask application instance.
    2. Configure the application with necessary settings.
    3. Set up routes using the setup_routes function.
    4. Return the Flask application instance.

    Returns:
        Flask: The initialized Flask application instance.

    Requirements Addressed:
    - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance):
      Provide real-time, context-aware recommendations and interactive assistance to security analysts
      during incident investigations.
    """
    # Step 1: Create a Flask application instance.
    app = Flask(__name__)

    # Step 2: Configure the application with necessary settings.

    # Set the path to the pre-trained recommendation model.
    # This enables the application to load and run the machine learning model to generate recommendations.
    # Requirement Addressed:
    # - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance)
    app.config['MODEL_PATH'] = get_model_path()

    # Additional configuration settings can be added here if necessary.

    # Step 3: Set up routes using the setup_routes function.
    # This function registers all the necessary endpoints for the AI Recommendation Engine.
    # Requirement Addressed:
    # - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance)
    setup_routes(app)

    # Step 4: Return the Flask application instance.
    return app


if __name__ == '__main__':
    # Entry point for running the application directly.

    # Create the Flask app instance.
    app = create_app()

    # Run the Flask development server.
    # Note: In a production environment, a WSGI server like Gunicorn should be used instead.
    # Requirement Addressed:
    # - Ensure the platform maintains high reliability and availability to support continuous security operations.
    #   (Technical Specification/4.14 Reliability and Availability)
    app.run(host='0.0.0.0', port=5000, debug=False)