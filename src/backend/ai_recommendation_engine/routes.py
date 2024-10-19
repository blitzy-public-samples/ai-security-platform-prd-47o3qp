"""Routes for AI Recommendation Engine"""

# External Dependencies
from flask import Blueprint, request, jsonify  # Flask 2.3.2
from werkzeug.exceptions import BadRequest  # Werkzeug 2.3.0
from flask_jwt_extended import jwt_required  # Flask-JWT-Extended 4.4.4
import logging  # Standard library logging module

# Internal Dependencies
from .services import RecommendationService  # Provides recommendation logic
from .models import Incident  # Data model for incidents

# Configure logging
logger = logging.getLogger(__name__)

# Create Blueprint for the AI Recommendation Engine routes
ai_recommendation_bp = Blueprint('ai_recommendation_bp', __name__)

@ai_recommendation_bp.route('/recommendations/<incident_id>', methods=['GET'])
@jwt_required()
def get_recommendations(incident_id):
    """
    Endpoint to retrieve AI-generated recommendations for a specific incident.
    
    Addresses:
    - TR-RTR-008-1: Develop algorithms to generate actionable recommendations based on current incident context.
      Location: Technical Requirements/4.8 Real-Time Recommendations/TR-RTR-008
    - TR-RTR-008-2: Implement prioritization logic to rank recommendations by impact and urgency.
      Location: Technical Requirements/4.8 Real-Time Recommendations/TR-RTR-008
    - TR-RTR-008-3: Ensure recommendations are updated in real-time as incident data evolves.
      Location: Technical Requirements/4.8 Real-Time Recommendations/TR-RTR-008
    - TR-AI-002-1: Implement machine learning models for generating actionable recommendations.
      Location: Technical Requirements/4.2 AI-Powered Assistance/TR-AI-002
    - TR-SC-013-2: Enforce Role-Based Access Control (RBAC) to restrict user permissions based on roles.
      Location: Technical Requirements/4.13 Security and Compliance/TR-SC-013
    
    Parameters:
        incident_id (str): Unique identifier of the incident.
        
    Returns:
        JSON response containing a list of recommendations.
    """
    try:
        # Validate incident_id
        if not incident_id:
            raise BadRequest("Incident ID is required")

        # Retrieve incident details
        incident = Incident.get_by_id(incident_id)
        if not incident:
            raise BadRequest(f"Incident with ID {incident_id} not found")

        # Generate recommendations using the RecommendationService
        recommendations = RecommendationService.generate_recommendations(incident)

        # Log the recommendation retrieval event
        logger.info(f"Retrieved recommendations for incident {incident_id}")

        # Return the recommendations as a JSON response
        return jsonify({'incident_id': incident_id, 'recommendations': recommendations}), 200

    except BadRequest as e:
        # Log bad request errors
        logger.error(f"Bad Request: {e}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        # Addresses:
        # - TR-LM-020-4: Enable automated alerts for suspicious activities and system anomalies.
        #   Location: Technical Requirements/4.20 Logging and Monitoring/TR-LM-020
        logger.exception(f"Internal Server Error when getting recommendations for incident {incident_id}")
        return jsonify({'error': 'Internal Server Error'}), 500

@ai_recommendation_bp.route('/recommendations/feedback', methods=['POST'])
@jwt_required()
def submit_feedback():
    """
    Endpoint to collect feedback from analysts on AI-generated recommendations.
    
    Addresses:
    - TR-RTR-008-4: Provide feedback mechanisms for analysts to rate recommendation relevance.
      Location: Technical Requirements/4.8 Real-Time Recommendations/TR-RTR-008
    - TR-AI-002-4: Integrate feedback mechanisms for analysts to refine AI suggestions.
      Location: Technical Requirements/4.2 AI-Powered Assistance/TR-AI-002
    - TR-SC-013-2: Enforce Role-Based Access Control (RBAC) to restrict user permissions based on roles.
      Location: Technical Requirements/4.13 Security and Compliance/TR-SC-013
    
    Request JSON:
        {
            "incident_id": "string",
            "recommendation_id": "string",
            "feedback": "string"  # e.g., "helpful", "not relevant", "incorrect"
        }

    Returns:
        JSON response indicating success or failure.
    """
    try:
        data = request.get_json()
        if not data:
            raise BadRequest("JSON payload is required")
        
        incident_id = data.get('incident_id')
        recommendation_id = data.get('recommendation_id')
        feedback = data.get('feedback')

        # Validate required fields
        if not all([incident_id, recommendation_id, feedback]):
            raise BadRequest("incident_id, recommendation_id, and feedback are required fields")

        # Process feedback through the RecommendationService
        RecommendationService.process_feedback(incident_id, recommendation_id, feedback)

        # Log the feedback submission
        logger.info(f"Feedback received for incident {incident_id}, recommendation {recommendation_id}")

        # Return success message
        return jsonify({'message': 'Feedback submitted successfully'}), 200

    except BadRequest as e:
        # Log bad request errors
        logger.error(f"Bad Request: {e}")
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        # Addresses:
        # - TR-LM-020-4: Enable automated alerts for suspicious activities and system anomalies.
        #   Location: Technical Requirements/4.20 Logging and Monitoring/TR-LM-020
        logger.exception("Internal Server Error when submitting feedback")
        return jsonify({'error': 'Internal Server Error'}), 500