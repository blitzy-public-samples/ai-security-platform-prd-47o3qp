# Importing external dependencies
from flask import Flask, request, jsonify  # Flask 2.0.1: Provides the web framework for handling HTTP requests and responses.
import jwt  # PyJWT 2.1.0: Handles JWT token encoding and decoding for secure session management.
from jwt import InvalidTokenError  # PyJWT 2.1.0

# Importing internal dependencies
from src.backend.authentication_service.controllers import login_user, logout_user  # Handles user login and logout operations.
from src.backend.authentication_service.services import authenticate_user, generate_token  # Authenticates user and generates JWT tokens.
from src.backend.authentication_service.models import UserModel  # Represents the user data model.

app = Flask(__name__)

# Requirement Addressed:
# - "Implement secure user authentication mechanisms and manage JWT tokens for session management."
#   Location: Technical Specification/4.6 User and System Management

@app.route('/login', methods=['POST'])
def login_route():
    """
    Defines the HTTP endpoint for user login, processing login requests and returning JWT tokens upon successful authentication.

    Parameters:
        - request (FlaskRequest): The incoming HTTP request containing user credentials.

    Returns:
        - Response: A JSON response containing the JWT token if login is successful, otherwise an error message.

    Steps:
        1. Parse the username and password from the request.
        2. Call authenticate_user with the parsed credentials.
        3. If authentication is successful, generate a JWT token using generate_token.
        4. Return a JSON response with the JWT token.
        5. If authentication fails, return a JSON response with an error message.
    """
    # Step 1: Parse the username and password from the request.
    credentials = request.get_json()
    if not credentials:
        return jsonify({'error': 'Missing credentials in request body.'}), 400

    username = credentials.get('username')
    password = credentials.get('password')

    if not username or not password:
        # Returning error if username or password is missing
        return jsonify({'error': 'Username and password are required fields.'}), 400

    # Step 2: Call authenticate_user with the parsed credentials.
    user = authenticate_user(username, password)

    # Step 3: If authentication is successful, generate a JWT token using generate_token.
    if user:
        token = generate_token(user)

        # Step 4: Return a JSON response with the JWT token.
        return jsonify({'token': token}), 200
    else:
        # Step 5: If authentication fails, return a JSON response with an error message.
        return jsonify({'error': 'Invalid username or password.'}), 401

@app.route('/logout', methods=['POST'])
def logout_route():
    """
    Defines the HTTP endpoint for user logout, processing logout requests and invalidating JWT tokens.

    Parameters:
        - request (FlaskRequest): The incoming HTTP request containing the JWT token.

    Returns:
        - Response: A JSON response confirming the logout action.

    Steps:
        1. Extract the JWT token from the request headers.
        2. Invalidate the token by removing it from the active sessions.
        3. Return a JSON response confirming the logout.
    """
    # Step 1: Extract the JWT token from the request headers.
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.replace('Bearer ', '')
    else:
        # Error handling for missing or invalid Authorization header
        return jsonify({'error': 'Authorization header missing or invalid.'}), 401

    # Step 2: Invalidate the token by removing it from the active sessions.
    try:
        logout_user(token)

        # Requirement Addressed:
        # - "Implement secure user authentication mechanisms and manage JWT tokens for session management."
        #   Location: Technical Specification/4.6 User and System Management

        # Step 3: Return a JSON response confirming the logout.
        return jsonify({'message': 'Successfully logged out.'}), 200

    except InvalidTokenError:
        # Handle invalid token error
        return jsonify({'error': 'Invalid token provided.'}), 401

if __name__ == '__main__':
    app.run()