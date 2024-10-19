"""
Initializes the Incident Management Service package, importing essential modules and configurations
for managing security incidents.

Requirement Addressed:
- Incident Response Automation
  - Location: Technical Specification/4.1 Incident Response Automation
  - Description: Automate the detection, logging, analysis, and resolution of security incidents
    using AI-driven workflows to ensure consistent and efficient incident handling.
"""

# Import the Flask web framework for handling HTTP requests and routing.
from flask import Flask  # External Dependency: Flask version 1.1.2

# Import IncidentModel which defines the data model for managing security incidents.
from .models import IncidentModel  # Defines the data model for managing security incidents.
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Import get_database_connection to establish a connection to the MongoDB database.
from .config import get_database_connection  # Establishes a connection to the MongoDB database using the configured URI.
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Import service functions for incident operations.
from .services import (
    create_incident,        # Creates a new incident record in the database.
    update_incident_status, # Updates the status of an existing incident.
    analyze_incident        # Analyzes an incident using AI-driven workflows to provide recommendations.
)
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Import register_routes to register HTTP routes for incident management with the Flask application.
from .routes import register_routes  # Registers the HTTP routes for incident management.
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Import create_app to initialize the Flask application and configure the incident management service.
from .app import create_app  # Initializes the Flask application and configures the service.
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Initialize the Flask application for the Incident Management Service.
app = create_app()
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Register the HTTP routes with the Flask application.
register_routes(app)
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Establish the database connection to MongoDB.
db = get_database_connection()
# Requirement Addressed: Incident Response Automation
# Location: Technical Specification/4.1 Incident Response Automation

# Expose the main components of the incident management service at the package level.
__all__ = [
    'app',
    'db',
    'IncidentModel',
    'create_incident',
    'update_incident_status',
    'analyze_incident',
    'register_routes'
]