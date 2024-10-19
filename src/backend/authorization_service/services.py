from sqlalchemy.orm import Session  # SQLAlchemy version 1.4.22
from sqlalchemy.exc import SQLAlchemyError

from src.backend.authorization_service.config import configure_database  # Configures the database connection for the authorization service
from src.backend.authorization_service.models import User, Role, Permission  # Defines User, Role, and Permission models

import logging

# Configure logging to monitor and log all user and system activities for auditing purposes (TR-USM-006-5)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configure the database session
engine, SessionLocal = configure_database()

def assign_role_to_user(user_id: int, role_id: int) -> bool:
    """
    Assigns a specific role to a user, updating the user's access permissions.

    Addresses Requirements:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      (Technical Requirements/4.6 User and System Management - TR-USM-006-1)
    - Monitor and log all user and system activities for auditing purposes.
      (Technical Requirements/4.6 User and System Management - TR-USM-006-5)

    Parameters:
        user_id (int): The ID of the user to whom the role will be assigned.
        role_id (int): The ID of the role to assign to the user.

    Returns:
        bool: True if the role was successfully assigned, False otherwise.

    Steps:
        1. Retrieve the user and role from the database using their IDs.
        2. Check if the user already has the role assigned.
        3. If not, assign the role to the user and update the database.
        4. Log the activity for auditing purposes.
        5. Return the result of the operation.
    """
    session = SessionLocal()
    try:
        # Step 1: Retrieve the user and role from the database using their IDs.
        user = session.query(User).filter(User.id == user_id).first()
        role = session.query(Role).filter(Role.id == role_id).first()

        if user is None:
            logger.warning(f"User with ID {user_id} does not exist.")
            return False

        if role is None:
            logger.warning(f"Role with ID {role_id} does not exist.")
            return False

        # Step 2: Check if the user already has the role assigned.
        if role in user.roles:
            logger.info(f"User ID {user_id} already has role ID {role_id} assigned.")
            return True

        # Step 3: If not, assign the role to the user and update the database.
        user.roles.append(role)
        session.add(user)
        session.commit()

        # Step 4: Log the activity for auditing purposes.
        logger.info(f"Assigned role ID {role_id} to user ID {user_id}.")

        # Step 5: Return the result of the operation.
        return True

    except SQLAlchemyError as e:
        # Handle database errors
        session.rollback()
        logger.error(f"Error assigning role ID {role_id} to user ID {user_id}: {e}")
        return False

    finally:
        session.close()


def check_permission(user_id: int, permission_name: str) -> bool:
    """
    Checks if a user has a specific permission.

    Addresses Requirements:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      (Technical Requirements/4.6 User and System Management - TR-USM-006-1)
    - Monitor and log all user and system activities for auditing purposes.
      (Technical Requirements/4.6 User and System Management - TR-USM-006-5)

    Parameters:
        user_id (int): The ID of the user whose permissions are to be checked.
        permission_name (str): The name of the permission to check for.

    Returns:
        bool: True if the user has the permission, False otherwise.

    Steps:
        1. Retrieve the user and their roles from the database using the user ID.
        2. Iterate through the user's roles to check for the specified permission.
        3. Log the permission check activity for auditing purposes.
        4. Return True if the permission is found, otherwise return False.
    """
    session = SessionLocal()
    try:
        # Step 1: Retrieve the user and their roles from the database using the user ID.
        user = session.query(User).filter(User.id == user_id).first()

        if user is None:
            logger.warning(f"User with ID {user_id} does not exist.")
            return False

        # Step 2: Iterate through the user's roles to check for the specified permission.
        for role in user.roles:
            for permission in role.permissions:
                if permission.name == permission_name:
                    # Permission found
                    logger.info(f"User ID {user_id} has permission '{permission_name}'.")
                    return True

        # Step 3: Log the permission check activity for auditing purposes.
        logger.info(f"User ID {user_id} does not have permission '{permission_name}'.")

        # Step 4: Return True if the permission is found, otherwise return False.
        return False

    except SQLAlchemyError as e:
        # Handle database errors
        session.rollback()
        logger.error(f"Error checking permission '{permission_name}' for user ID {user_id}: {e}")
        return False

    finally:
        session.close()