"""
Controllers for the Playbook Engine.

This module handles the logic for controlling the flow of playbook operations, including creation, updating, and execution using AI-driven strategies.

Requirements Addressed:
- Dynamic Playbook Generation (TR-DPG-004)
  Location: Technical Specification/4.4 Dynamic Playbook Generation
  Description: Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats and organizational policies, ensuring responsive and adaptive incident handling strategies.
"""

# Import 'datetime' module (built-in) for handling date and time operations for playbook timestamps.
import datetime  # built-in module

# Import Playbook model from models.py
from .models import Playbook  # Represents a playbook entity with attributes and methods to interact with playbook data.

# Import services for playbook operations from services.py
from .services import create_playbook, update_playbook, execute_playbook  # Handles creation, updating, and execution of playbooks.

# Import load_config function from config.py to load configuration settings.
from .config import load_config  # Loads configuration settings for the playbook engine.


def create_playbook_controller(name: str, steps: list) -> Playbook:
    """
    Handles the logic for creating a new playbook.

    Parameters:
    - name (str): The name of the new playbook.
    - steps (list): A list of steps to be included in the playbook.

    Returns:
    - Playbook: The created Playbook instance.

    Requirements Addressed:
    - Dynamic Playbook Generation (TR-DPG-004)
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """

    # Validate the input parameters for name and steps.
    # Ensure that 'name' is provided and is a non-empty string.
    if not name or not isinstance(name, str):
        raise ValueError("Invalid playbook name provided.")

    # Ensure that 'steps' is provided and is a list.
    if not steps or not isinstance(steps, list):
        raise ValueError("Invalid playbook steps provided.")

    # Call the create_playbook service with the provided name and steps.
    # This service utilizes AI algorithms to generate standardized playbooks (TR-DPG-004-1).
    playbook = create_playbook(name, steps)

    # Return the created Playbook instance to the caller.
    return playbook


def update_playbook_controller(playbook_id: str, new_steps: list) -> bool:
    """
    Handles the logic for updating an existing playbook.

    Parameters:
    - playbook_id (str): The unique identifier of the playbook to be updated.
    - new_steps (list): A list of new steps to update the playbook with.

    Returns:
    - bool: True if the update is successful, otherwise False.

    Requirements Addressed:
    - Dynamic Playbook Generation (TR-DPG-004)
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """

    # Retrieve the Playbook instance by playbook_id.
    # Use the Playbook model's method to fetch the playbook from the database.
    playbook = Playbook.get_by_id(playbook_id)
    if not playbook:
        # If the playbook is not found, return False indicating the update failed.
        return False

    # Call the update_playbook service with the playbook_id and new_steps.
    # This service updates the playbook's steps, potentially integrating AI-driven modifications (TR-DPG-004-2).
    updated = update_playbook(playbook_id, new_steps)

    # Return True if the update was successful, otherwise False.
    return updated


def execute_playbook_controller(playbook_id: str) -> bool:
    """
    Handles the logic for executing a playbook.

    Parameters:
    - playbook_id (str): The unique identifier of the playbook to execute.

    Returns:
    - bool: True if the execution is successful, otherwise False.

    Requirements Addressed:
    - Dynamic Playbook Generation (TR-DPG-004)
      Location: Technical Specification/4.4 Dynamic Playbook Generation
    """

    # Retrieve the Playbook instance by playbook_id.
    # Fetch the playbook from the database using its unique identifier.
    playbook = Playbook.get_by_id(playbook_id)
    if not playbook:
        # If the playbook is not found, return False indicating the execution failed.
        return False

    # Load configuration settings using load_config.
    # Configuration may include settings necessary for executing the playbook correctly.
    config = load_config()

    # Call the execute_playbook service with the playbook_id.
    # This service handles the execution logic, utilizing AI-driven strategies (TR-DPG-004-1, TR-DPG-004-2).
    executed = execute_playbook(playbook_id, config)

    # Return True if the execution was successful, otherwise False.
    return executed