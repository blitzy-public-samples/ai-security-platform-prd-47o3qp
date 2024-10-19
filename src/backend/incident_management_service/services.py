"""
Provides core services for managing security incidents, including creation, status updates, and AI-driven analysis.
"""

# External Dependencies
from pymongo import MongoClient  # mongodb version 3.6.3

# Internal Dependencies
from .models import IncidentModel  # Defines the data model for managing security incidents.
from .config import get_database_connection  # Establishes a connection to the MongoDB database using the configured URI.
from ..ai_recommendation_engine.services import generate_recommendations  # Generates AI-driven recommendations for incidents.
from ..playbook_engine.services import create_playbook  # Creates a new playbook with specified steps.

def create_incident(incident_data: IncidentModel) -> bool:
    """
    Creates a new incident record in the database.

    Addresses:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
        - Requirement ID: TR-IR-001-2
            - Description: Support automated logging of incident details into the case management system.

    Parameters:
    - incident_data (IncidentModel): The incident data to be created.

    Returns:
    - bool: True if the incident was successfully created, otherwise False.
    """
    try:
        # Step 1: Establish a database connection using get_database_connection.
        db = get_database_connection()
        
        # Step 2: Validate the incident_data against the IncidentModel schema.
        if not isinstance(incident_data, IncidentModel):
            raise ValueError("Invalid incident data provided. Expected IncidentModel instance.")

        # Convert the IncidentModel instance to a dictionary for database insertion.
        incident_dict = incident_data.to_dict()
        
        # Step 3: Insert the incident_data into the database.
        result = db.incidents.insert_one(incident_dict)
        
        # Step 4: Return True if the operation was successful.
        return result.acknowledged
    except Exception as e:
        # Log the exception as per TR-LM-020-1: Implement centralized logging for all system and user activities.
        print(f"Error creating incident: {e}")
        return False

def update_incident_status(incident_id: str, new_status: str) -> bool:
    """
    Updates the status of an existing incident.

    Addresses:
    - Incident Response Automation (Technical Specification/4.1 Incident Response Automation)
        - Requirement ID: TR-IR-001-1
            - Description: Integrate with existing SIEM systems for incident detection.
        - Requirement ID: TR-IR-001-3
            - Description: Enable real-time analysis of incidents using AI algorithms.

    Parameters:
    - incident_id (str): The unique identifier of the incident to update.
    - new_status (str): The new status to set for the incident.

    Returns:
    - bool: True if the status update was successful, otherwise False.
    """
    try:
        # Step 1: Establish a database connection using get_database_connection.
        db = get_database_connection()
        
        # Step 2: Retrieve the incident by incident_id.
        incident = db.incidents.find_one({"_id": incident_id})
        if not incident:
            print(f"Incident with ID {incident_id} not found.")
            return False
        
        # Step 3: Update the status field of the incident.
        update_fields = {"status": new_status}
        
        # Step 4: Save the updated incident back to the database.
        result = db.incidents.update_one({"_id": incident_id}, {"$set": update_fields})
        
        # Step 5: Return True if the operation was successful.
        return result.modified_count > 0
    except Exception as e:
        # Log the exception as per TR-LM-020-1.
        print(f"Error updating incident status: {e}")
        return False

def analyze_incident(incident_id: str) -> list:
    """
    Analyzes an incident using AI-driven workflows to provide recommendations.

    Addresses:
    - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance)
        - Requirement ID: TR-AI-002-1
            - Description: Implement machine learning models for generating actionable recommendations.
        - Requirement ID: TR-AI-002-2
            - Description: Ensure recommendations are updated in real-time based on incident data.

    Parameters:
    - incident_id (str): The unique identifier of the incident to analyze.

    Returns:
    - list: A list of AI-generated recommendations for the incident.
    """
    try:
        # Step 1: Retrieve the incident data by incident_id.
        db = get_database_connection()
        incident = db.incidents.find_one({"_id": incident_id})
        if not incident:
            print(f"Incident with ID {incident_id} not found.")
            return []
        
        # Convert the incident data to an IncidentModel instance.
        incident_data = IncidentModel.from_dict(incident)
        
        # Step 2: Call generate_recommendations with the incident data.
        recommendations = generate_recommendations(incident_data)
        
        # Step 3: Return the list of recommendations.
        return recommendations
    except Exception as e:
        # Log the exception as per TR-LM-020-1.
        print(f"Error analyzing incident: {e}")
        return []