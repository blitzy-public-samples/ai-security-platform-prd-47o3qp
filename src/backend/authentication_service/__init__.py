"""
Initializes the authentication service package by importing essential modules and setting up the package environment.

Requirements Addressed:
- User Authentication and Token Management
  Location: Technical Specification/4.6 User and System Management
  Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.
"""

# External Dependencies
from flask import Flask  # Version 2.0.1; Provides the web framework for handling HTTP requests and responses.
import jwt  # Version 2.1.0; Handles JWT token encoding and decoding for secure session management.

# Internal Dependencies

# Import UserModel for handling user data and roles.
# Requirement Addressed: Implement secure user authentication mechanisms.
# Location: Technical Specification/4.6 User and System Management
from .models import UserModel  # Represents the user data model, encapsulating user credentials and roles.

# Import get_database_connection to establish database connections.
# Requirement Addressed: Ensure secure data storage and retrieval.
# Location: Technical Specification/4.11 Data Management
from .config import get_database_connection  # Establishes a connection to the MongoDB database using the configured URI.

# Import authentication services to authenticate users and generate JWT tokens.
# Requirement Addressed: Manage JWT tokens for session management.
# Location: Technical Specification/4.6 User and System Management
from .services import authenticate_user, generate_token  # Provides authentication mechanisms and token generation.

# Import controllers for handling user login and logout processes.
# Requirement Addressed: Manage user authentication flows.
# Location: Technical Specification/4.6 User and System Management
from .controllers import login_user, logout_user  # Manages user login and logout functionalities.

# Import register_routes to register the authentication routes with the Flask application.
# Requirement Addressed: Provide endpoints for authentication services.
# Location: Technical Specification/4.6 User and System Management
from .routes import register_routes  # Registers the authentication routes with the Flask application.

# Initialize the Flask application for the authentication service.
# Requirement Addressed: Provide the web framework for handling HTTP requests and responses.
# Location: Technical Specification/1.3 System Architecture
app = Flask(__name__)

# Establish the database connection using the configured URI.
# Requirement Addressed: Implement robust data storage, retrieval, and processing systems.
# Location: Technical Specification/4.11 Data Management
db = get_database_connection()

# Register the authentication routes with the Flask application.
# Requirement Addressed: Manage user roles, permissions, and system configurations.
# Location: Technical Specification/4.6 User and System Management
register_routes(app)

# Define the package's public interface.
__all__ = [
    'app',
    'db',
    'UserModel',
    'authenticate_user',
    'generate_token',
    'login_user',
    'logout_user',
    'register_routes',
]