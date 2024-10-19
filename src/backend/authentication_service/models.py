# Import necessary modules

# Import the MongoDB client - pymongo module version 3.6.3
from pymongo import MongoClient  # pymongo version 3.6.3

# Import JSON module to load the user schema
import json

# Import get_database_connection function from config.py
from config import get_database_connection

# Load user schema from 'src/database/schemas/user_schema.json'
with open('src/database/schemas/user_schema.json', 'r') as f:
    user_schema = json.load(f)

# Import datetime module to handle timestamps
from datetime import datetime

# Import hashlib for password hashing
import hashlib

def validatePassword(input_password, stored_hash):
    """
    Validates a user's password against the stored hash.

    Requirements Addressed:
    - Ensures secure authentication of users.
    - Technical Specification/4.6 User and System Management

    Parameters:
    - input_password (str): The password input by the user.
    - stored_hash (str): The hashed password stored in the database.

    Returns:
    - bool: True if the input password matches the stored hash, otherwise False.

    Steps:
    1. Hash the input_password using the same hashing algorithm used for stored_hash.
    2. Compare the hashed input_password with stored_hash.
    3. Return True if they match, otherwise return False.
    """

    # Step 1: Hash the input_password using SHA-256
    hashed_input = hashlib.sha256(input_password.encode()).hexdigest()

    # Step 2: Compare the hashed input_password with stored_hash
    return hashed_input == stored_hash

class UserModel:
    """
    Represents the user data model, encapsulating user credentials and roles for authentication purposes.

    Requirements Addressed:
    - Implements Role-Based Access Control (RBAC) for user permissions.
    - Technical Specification/4.6 User and System Management (TR-USM-006-1)

    Properties:
    - id (ObjectId): The unique identifier for the user.
    - username (str): The username of the user.
    - password (str): The hashed password of the user.
    - role (str): The role assigned to the user.
    - created_at (datetime): The timestamp when the user was created.
    """

    def __init__(self, username, password, role):
        """
        Initializes a new UserModel instance with the provided username, password, and role.

        Requirements Addressed:
        - Allows for creating new user accounts.
        - Technical Specification/4.6 User and System Management (TR-USM-006-2)

        Parameters:
        - username (str): The username of the user.
        - password (str): The password of the user (will be hashed).
        - role (str): The role assigned to the user.

        Steps:
        1. Assign the provided username to the instance's username property.
        2. Hash the provided password and assign it to the instance's password property.
        3. Assign the provided role to the instance's role property.
        4. Set the created_at property to the current date and time.
        """

        self.username = username

        # Hash the password using SHA-256
        self.password = hashlib.sha256(password.encode()).hexdigest()

        self.role = role

        self.created_at = datetime.now()

        self.id = None  # Will be set when the user is saved to the database

    def save(self):
        """
        Saves the user model instance to the database.

        Requirements Addressed:
        - Stores user credentials securely in the database.
        - Technical Specification/4.6 User and System Management (TR-USM-006-1, TR-USM-006-2)

        Returns:
        - bool: True when the user data is successfully saved to the database.

        Steps:
        1. Establish a database connection using get_database_connection.
        2. Insert the user data into the users collection defined by user_schema.
        3. Return True when the operation is complete.
        """

        # Step 1: Establish a database connection
        db = get_database_connection()

        # Step 2: Prepare user data according to user_schema
        user_data = {
            "username": self.username,
            "password": self.password,
            "role": self.role,
            "created_at": self.created_at,
        }

        # Step 3: Insert the user data into the 'users' collection
        users_collection = db['users']

        result = users_collection.insert_one(user_data)

        # Set the id of the model
        self.id = result.inserted_id

        # Step 4: Return True when the operation is complete
        return True