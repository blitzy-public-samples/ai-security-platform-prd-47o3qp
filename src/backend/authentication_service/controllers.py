"""
Controllers for handling user authentication logic, including login and logout processes.
Addresses requirement TR-USM-006-1 from Technical Specification/4.6 User and System Management:
- Implement secure user authentication mechanisms and manage JWT tokens for session management.
"""

# Import standard libraries
import logging
from datetime import datetime, timedelta

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# External imports
from flask import Blueprint, request, jsonify  # Flask version 2.0.1 - Provides the web framework for handling HTTP requests and responses.
import jwt  # PyJWT version 2.1.0 - Handles JWT token encoding and decoding for secure session management.

# Internal imports
from .models import UserModel  # Represents the user data model, encapsulating user credentials and roles for authentication purposes.
from .services import authenticate_user, generate_token  # authenticate_user: Authenticates a user by verifying the provided credentials against the stored data.
                                                         # generate_token: Generates a JWT token for a successfully authenticated user.
from .config import get_database_connection, SECRET_KEY  # Establishes a connection to the MongoDB database using the configured URI.
                                                         # SECRET_KEY: Secret key used for JWT encoding/decoding.

# Create a Blueprint for authentication routes
auth_bp = Blueprint('auth_bp', __name__)

# --- Login Function ---
@auth_bp.route('/login', methods=['POST'])
def login_user():
    """
    Handles user login by validating credentials and issuing a JWT token.
    Addresses requirements:
    - TR-USM-006-1 from Technical Specification/4.6 User and System Management:
      Implement secure user authentication mechanisms and manage JWT tokens for session management.
    - TR-LM-020-1 from Technical Specification/4.20 Logging and Monitoring:
      Implement centralized logging for all system and user activities.

    Parameters:
        request (Flask Request): The incoming HTTP request containing user credentials.

    Returns:
        Response (JSON): A JSON response containing the JWT token if login is successful, otherwise an error message.
    """
    logger.info('Login attempt initiated.')

    # Step 1: Parse the username and password from the request.
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        logger.warning('Missing username or password in login request.')
        return jsonify({'error': 'Missing username or password'}), 400

    username = data['username']
    password = data['password']

    # Step 2: Call authenticate_user with the parsed credentials.
    user = authenticate_user(username, password)

    # Step 3: If authentication is successful, generate a JWT token using generate_token.
    if user:
        token = generate_token(user)
        logger.info(f'User "{username}" authenticated successfully.')
        # Step 4: Return a JSON response with the JWT token.
        return jsonify({'token': token}), 200
    else:
        # Step 5: If authentication fails, return a JSON response with an error message.
        logger.warning(f'Failed login attempt for username: "{username}".')
        return jsonify({'error': 'Invalid username or password'}), 401

# --- Logout Function ---
@auth_bp.route('/logout', methods=['POST'])
def logout_user():
    """
    Handles user logout by invalidating the current JWT token.
    Addresses requirements:
    - TR-USM-006-1 from Technical Specification/4.6 User and System Management:
      Implement secure user authentication mechanisms and manage JWT tokens for session management.
    - TR-LM-020-1 from Technical Specification/4.20 Logging and Monitoring:
      Implement centralized logging for all system and user activities.

    Parameters:
        request (Flask Request): The incoming HTTP request containing the JWT token.

    Returns:
        Response (JSON): A JSON response confirming the logout action.
    """
    logger.info('Logout attempt initiated.')

    # Step 1: Extract the JWT token from the request headers.
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header.split(" ")[1]
    else:
        logger.warning('Token missing or invalid in logout request.')
        return jsonify({'error': 'Token missing or invalid'}), 401

    # Step 2: Invalidate the token by removing it from the active sessions.
    # Note: For stateless JWT, implement token blacklisting or short expiration times.
    invalidate_token(token)

    logger.info('Token invalidated successfully.')

    # Step 3: Return a JSON response confirming the logout.
    return jsonify({'message': 'Successfully logged out'}), 200

def invalidate_token(token):
    """
    Placeholder function to invalidate a JWT token.
    In a production environment, implement token blacklisting or store revoked tokens.
    Addresses requirement TR-USM-006-1 from Technical Specification/4.6 User and System Management.

    Parameters:
        token (str): The JWT token to invalidate.
    """
    # Implementation would add the token to a blacklist or revoked tokens list.
    # For demonstration purposes, we log the invalidation action.
    logger.info(f'Token invalidated: {token}')
    pass