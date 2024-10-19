"""
Configuration settings for the authentication service.

This module provides configuration settings including database connection details,
secret keys, and environment-specific configurations.

Requirements Addressed:
- Configuration Management (Technical Specification/4.6 User and System Management)
  Manage configuration settings for the authentication service to ensure secure and efficient operation.
"""

# Import built-in module 'os' to access environment variables
import os  # built-in module

# Import MongoClient from 'pymongo' library for MongoDB operations
from pymongo import MongoClient  # pymongo version 3.6.3

# Global Variables

# DATABASE_URI: Retrieves the database URI from environment variables or uses the default
DATABASE_URI = os.getenv('DATABASE_URI', 'mongodb://localhost:27017/authentication')
# The DATABASE_URI is used to establish a connection to the MongoDB database.
# This addresses the need for managing configuration settings as per
# Technical Specification/4.6 User and System Management.

# SECRET_KEY: Retrieves the secret key from environment variables or uses the default
SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
# The SECRET_KEY is used for cryptographic purposes within the authentication service.
# Managing the SECRET_KEY securely is critical for maintaining operational security.

def get_database_connection():
    """
    Establishes a connection to the MongoDB database using the configured URI.

    Requirements Addressed:
    - Configuration Management (Technical Specification/4.6 User and System Management)
      Manage configuration settings for the authentication service to ensure secure and efficient operation.

    Returns:
        MongoClient: A MongoDB client instance connected to the specified database URI.
    """

    # Step 1: Import the MongoClient from the pymongo library
    # (Already imported at the top)

    # Step 2: Retrieve the DATABASE_URI from the environment variables
    # (Already retrieved and stored in DATABASE_URI)

    # Step 3: Create a MongoClient instance using the DATABASE_URI
    client = MongoClient(DATABASE_URI)

    # Step 4: Return the MongoClient instance
    return client