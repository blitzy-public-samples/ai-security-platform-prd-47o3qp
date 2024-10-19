"""
Controllers for managing security incidents.

This module handles the business logic for managing security incidents, including creating,
updating, and analyzing incidents through various service calls.

Requirements Addressed:
- Incident Response Automation (Technical Specification/4.1 Incident Response Automation):
  Automate the detection, logging, analysis, and resolution of security incidents using
  AI-driven workflows to ensure consistent and efficient incident handling.
"""

from flask import Flask, request, jsonify  # Flask version 1.1.2
from models import IncidentModel  # Defines the data model for managing security incidents.
from services import create_incident, update_incident_status, analyze_incident  # Service functions for incident management.
from config import get_database_connection  # Establishes a connection to the MongoDB database using the configured URI.

app = Flask(__name__)

@app.route('/incidents', methods=['POST'])
def create_incident_controller():
    """Handles the logic for creating a new incident.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation):
      Automate the detection, logging, analysis, and resolution of security incidents using
      AI-driven workflows to ensure consistent and efficient incident handling.

    Parameters:
    - request: The HTTP request object containing the incident details.

    Returns:
    - Response object with the created incident details or error message.
    """

    # Parse the request data for incident details.
    incident_data = request.get_json()
    if not incident_data:
        return jsonify({'status': 'error', 'message': 'No incident data provided.'}), 400

    # Call create_incident service with the parsed data.
    try:
        incident = create_incident(incident_data)

        # Return a response with the created incident details.
        return jsonify({'status': 'success', 'incident': incident.to_dict()}), 201
    except Exception as e:
        # Return an error response if creation fails.
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/incidents/<incident_id>/status', methods=['PUT'])
def update_incident_status_controller(incident_id):
    """Handles the logic for updating the status of an existing incident.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation):
      Automate the detection, logging, analysis, and resolution of security incidents using
      AI-driven workflows to ensure consistent and efficient incident handling.

    Parameters:
    - incident_id (string): The unique identifier of the incident.
    - request: The HTTP request object containing the new status.

    Returns:
    - Response object indicating success or failure of the update.
    """

    # Parse the request data for the new status.
    status_data = request.get_json()
    if not status_data or 'status' not in status_data:
        return jsonify({'status': 'error', 'message': 'Status data must be provided.'}), 400

    new_status = status_data.get('status')

    # Call update_incident_status service with the incident_id and new status.
    try:
        update_incident_status(incident_id, new_status)

        # Return a response indicating the success of the update.
        return jsonify({'status': 'success', 'message': 'Incident status updated successfully.'}), 200
    except Exception as e:
        # Return an error response if update fails.
        return jsonify({'status': 'error', 'message': str(e)}), 400

@app.route('/incidents/<incident_id>/analyze', methods=['GET'])
def analyze_incident_controller(incident_id):
    """Handles the logic for analyzing an incident and providing AI-driven recommendations.

    Requirements Addressed:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation):
      Automate the detection, logging, analysis, and resolution of security incidents using
      AI-driven workflows to ensure consistent and efficient incident handling.

    Parameters:
    - incident_id (string): The unique identifier of the incident to be analyzed.

    Returns:
    - Response object with AI-generated recommendations.
    """

    # Call analyze_incident service with the incident_id.
    try:
        recommendations = analyze_incident(incident_id)

        # Return a response with the AI-generated recommendations.
        return jsonify({'status': 'success', 'recommendations': recommendations}), 200
    except Exception as e:
        # Return an error response if analysis fails.
        return jsonify({'status': 'error', 'message': str(e)}), 400