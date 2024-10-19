# Import necessary modules
from flask import Flask, request, jsonify  # Flask version 1.1.2

# Importing controllers that handle the logic for incident management
from .controllers import (
    create_incident_controller,
    update_incident_status_controller,
    analyze_incident_controller
)

# Initialize the Flask application
app = Flask(__name__)

def register_routes(app):
    """
    Registers the HTTP routes for incident management with the Flask application.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation):
      Automate the detection, logging, analysis, and resolution of security incidents using AI-driven workflows to ensure consistent and efficient incident handling.

    Parameters:
    - app: The Flask application instance.

    Returns:
    - None
    """

    # Register the '/incidents' route with the create_incident_controller
    @app.route('/incidents', methods=['POST'])
    def create_incident():
        """
        Endpoint to create a new security incident.

        Requirements Addressed:
        - Supports automated logging of incident details into the case management system.
          (Requirement ID: TR-IR-001-2, Technical Specification/4.1.4 Technical Requirements)
        """
        return create_incident_controller()

    # Register the '/incidents/<incident_id>/status' route with the update_incident_status_controller
    @app.route('/incidents/<incident_id>/status', methods=['PUT'])
    def update_incident_status(incident_id):
        """
        Endpoint to update the status of an existing incident.

        Requirements Addressed:
        - Enables real-time analysis and updates of incidents.
          (Requirement ID: TR-IR-001-3, Technical Specification/4.1.4 Technical Requirements)
        """
        return update_incident_status_controller(incident_id)

    # Register the '/incidents/<incident_id>/analyze' route with the analyze_incident_controller
    @app.route('/incidents/<incident_id>/analyze', methods=['GET'])
    def analyze_incident(incident_id):
        """
        Endpoint to analyze an incident and provide AI-driven recommendations.

        Requirements Addressed:
        - Provides AI-powered assistance for incident analysis by generating actionable recommendations.
          (Requirement ID: TR-AI-002-1, Technical Specification/4.2.4 Technical Requirements)
        - Ensures recommendations are updated in real-time based on incident data.
          (Requirement ID: TR-AI-002-2, Technical Specification/4.2.4 Technical Requirements)
        """
        return analyze_incident_controller(incident_id)

# Register the routes with the Flask application
register_routes(app)