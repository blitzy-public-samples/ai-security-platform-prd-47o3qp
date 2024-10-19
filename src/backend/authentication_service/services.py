# Import necessary modules and dependencies.

# Internal imports
from models import UserModel, validatePassword  # Represents the user data model and password validation functions.
from config import get_database_connection, SECRET_KEY  # Establishes a connection to the MongoDB database and provides the secret key for JWT.

# External imports
import jwt  # pyjwt version 2.1.0 - Handles JWT token encoding and decoding for secure session management.
import datetime  # Standard library module for handling date and time operations.

# Provides core services for the authentication service, including user authentication, token generation, and password management.
# Addresses Requirement:
# - "User Authentication and Token Management" described in Technical Specification/4.6 User and System Management.
#   Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.

def authenticate_user(username: str, password: str) -> dict:
    """
    Authenticates a user by verifying the provided credentials against the stored data.

    Requirements Addressed:
    - User Authentication and Token Management
      Location: Technical Specification/4.6 User and System Management
      Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.

    Parameters:
    - username (str): The username of the user attempting to authenticate.
    - password (str): The plaintext password provided by the user.

    Returns:
    - dict: A dictionary containing user details and a JWT token if authentication is successful,
            otherwise an error message.
    """
    try:
        # Retrieve the user data from the database using the username.
        db = get_database_connection()
        user_collection = db['users']
        user_record = user_collection.find_one({'username': username})

        if user_record:
            # Use validatePassword to verify the provided password against the stored hash.
            if validatePassword(password, user_record['password']):
                # If the password is valid, generate a JWT token using generate_token.
                token = generate_token(user_record)

                # Return the user details and JWT token if authentication is successful.
                return {
                    'user': {
                        'id': str(user_record['_id']),
                        'username': user_record['username'],
                        'role': user_record.get('role', 'user')
                    },
                    'token': token
                }
            else:
                # If authentication fails, return an error message.
                return {'error': 'Invalid password'}
        else:
            # If the user is not found, return an error message.
            return {'error': 'User not found'}

    except Exception as e:
        # Handle exceptions and return an appropriate error message.
        return {'error': 'An error occurred during authentication'}

def generate_token(user_data: dict) -> str:
    """
    Generates a JWT token for a successfully authenticated user.

    Requirements Addressed:
    - User Authentication and Token Management
      Location: Technical Specification/4.6 User and System Management
      Description: Implement secure user authentication mechanisms and manage JWT tokens for session management.

    Parameters:
    - user_data (dict): The user data dictionary containing user's information.

    Returns:
    - str: A JWT token encoded with the user's information and a secret key.
    """
    try:
        # Import the jwt library.
        # Note: pyjwt version 2.1.0 is used for handling JWT token encoding.

        # Define the payload with user information and expiration time.
        payload = {
            'user_id': str(user_data['_id']),
            'username': user_data['username'],
            'role': user_data.get('role', 'user'),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)  # Token expires in 24 hours.
        }

        # Encode the payload using the SECRET_KEY from config.
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

        # Return the encoded JWT token.
        return token

    except Exception as e:
        # Handle exceptions and return None if token generation fails.
        return None