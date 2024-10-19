# Configuration file for the Incident Management Service
# Responsible for setting up database connections and other service-specific configurations.

# Import MongoClient from the mongodb library (version 3.6.3)
from mongodb import MongoClient  # mongodb version 3.6.3

# Global variable for the MongoDB connection URI
DATABASE_URI = 'mongodb://localhost:27017/incidents'

def get_database_connection():
    """
    Establishes and returns a connection to the MongoDB database using the configured URI.

    This function addresses the following requirement:
    - **Name**: Incident Response Automation
    - **Location**: Technical Specification/4.1 Incident Response Automation
    - **Description**: Automate the detection, logging, analysis, and resolution of security incidents using AI-driven workflows to ensure consistent and efficient incident handling.

    **Steps:**
    1. Import the `MongoClient` from the `mongodb` library.
    2. Use the `DATABASE_URI` to create a new `MongoClient` instance.
    3. Return the `MongoClient` instance.

    **Returns:**
        `MongoClient`: A MongoDB client instance connected to the specified database.
    """
    # Create a new MongoClient instance using the DATABASE_URI
    client = MongoClient(DATABASE_URI)
    # Return the MongoClient instance
    return client