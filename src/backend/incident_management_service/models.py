"""
Models for Incident Management Service

This module defines the data model for managing security incidents, including the structure and fields required for incident data.

Requirements Addressed:
- Incident Data Management (Technical Specification/4.5 Comprehensive Case Management)
  - TR-CM-005: Maintain detailed logs of all incident-related activities, support comprehensive audit trails, and facilitate easy retrieval and analysis of historical data to support ongoing security operations and compliance requirements.
"""

import json
import logging
from datetime import datetime
from typing import Optional

from pymongo import MongoClient  # pymongo version 3.6.3

# Internal dependencies
from config import get_database_connection  # Establishes a connection to the MongoDB database using the configured URI

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the incident schema
# Internal dependency: incident_schema defines the structure and constraints for incident data.
with open('src/database/schemas/incident_schema.json', 'r') as schema_file:
    incident_schema = json.load(schema_file)


class IncidentModel:
    """
    Represents the data model for an incident, encapsulating all necessary fields and methods for managing incident data.

    Requirements Addressed:
    - Incident Data Management (Technical Specification/4.5 Comprehensive Case Management)
      - TR-CM-005: Maintain detailed logs of all incident-related activities, support comprehensive audit trails, and facilitate easy retrieval and analysis of historical data to support ongoing security operations and compliance requirements.
    """

    def __init__(
        self,
        id: str,
        title: str,
        description: str,
        status: str,
        detected_at: datetime,
        resolved_at: Optional[datetime],
        user_id: str
    ):
        """
        Initializes a new instance of the IncidentModel with the provided data.

        Parameters:
            id (str): Unique identifier for the incident.
            title (str): Title of the incident.
            description (str): Detailed description of the incident.
            status (str): Current status of the incident.
            detected_at (datetime): Timestamp when the incident was detected.
            resolved_at (datetime, optional): Timestamp when the incident was resolved.
            user_id (str): Identifier of the user associated with the incident.

        Steps:
        - Assign the provided id to the instance.
        - Assign the provided title to the instance.
        - Assign the provided description to the instance.
        - Assign the provided status to the instance.
        - Assign the provided detected_at timestamp to the instance.
        - Assign the provided resolved_at timestamp to the instance.
        - Assign the provided user_id to the instance.
        """
        self.id = id
        self.title = title
        self.description = description
        self.status = status
        self.detected_at = detected_at
        self.resolved_at = resolved_at
        self.user_id = user_id

    def _validate_incident_data(self) -> bool:
        """
        Validates the incident data against the incident_schema.

        Returns:
            bool: True if the data is valid, False otherwise.

        Note:
        - Validation logic should enforce the constraints defined in incident_schema.
        - Placeholder implementation; to be replaced with actual validation logic based on incident_schema.

        Requirements Addressed:
        - Incident Data Management (Technical Specification/4.5 Comprehensive Case Management)
          - TR-CM-005-1: Automatically log incident details, including AI-generated insights and manual actions.
        """
        # Placeholder for validation logic
        # Implement validation as per incident_schema constraints
        return True

    def save(self) -> bool:
        """
        Saves the current incident instance to the database.

        Returns:
            bool: True if the save operation was successful, otherwise False.

        Requirements Addressed:
        - Incident Data Management (Technical Specification/4.5 Comprehensive Case Management)
          - TR-CM-005-1: Automatically log incident details, including AI-generated insights and manual actions.

        Steps:
        - Establish a database connection using get_database_connection.
        - Validate the incident data against the incident_schema.
        - Insert or update the incident data in the database.
        - Return True if the operation was successful.
        """
        try:
            # Establish a database connection
            db = get_database_connection()
            incidents_collection = db['incidents']

            # Convert incident object to dictionary
            incident_data = {
                'id': self.id,
                'title': self.title,
                'description': self.description,
                'status': self.status,
                'detected_at': self.detected_at.isoformat(),
                'resolved_at': self.resolved_at.isoformat() if self.resolved_at else None,
                'user_id': self.user_id
            }

            # Validate the incident data against the incident_schema
            if not self._validate_incident_data():
                logger.error("Incident data validation failed.")
                return False

            # Insert or update the incident data in the database
            incidents_collection.update_one(
                {'id': self.id},
                {'$set': incident_data},
                upsert=True
            )

            logger.info(f"Incident {self.id} saved successfully.")
            return True
        except Exception as e:
            # Log the exception
            logger.error(f"An error occurred while saving the incident: {e}")
            return False

    def delete(self) -> bool:
        """
        Deletes the current incident instance from the database.

        Returns:
            bool: True if the delete operation was successful, otherwise False.

        Requirements Addressed:
        - Incident Data Management (Technical Specification/4.5 Comprehensive Case Management)
          - TR-CM-005-1: Automatically log incident details, including AI-generated insights and manual actions.

        Steps:
        - Establish a database connection using get_database_connection.
        - Remove the incident data from the database using the instance's id.
        - Return True if the operation was successful.
        """
        try:
            # Establish a database connection
            db = get_database_connection()
            incidents_collection = db['incidents']

            # Remove the incident data from the database using the instance's id
            result = incidents_collection.delete_one({'id': self.id})

            if result.deleted_count > 0:
                logger.info(f"Incident {self.id} deleted successfully.")
                return True
            else:
                logger.warning(f"Incident {self.id} not found.")
                return False
        except Exception as e:
            # Log the exception
            logger.error(f"An error occurred while deleting the incident: {e}")
            return False