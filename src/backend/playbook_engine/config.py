"""
Configuration module for the playbook engine.

This module is responsible for loading and managing configuration settings necessary for the operation of playbook-related functionalities.

Requirements Addressed:
- Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation):
  Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats and organizational policies, ensuring responsive and adaptive incident handling strategies.
"""

# Import internal dependencies
from .models import Playbook  # Represents a playbook entity with attributes and methods to interact with playbook data. (src/backend/playbook_engine/models.py)
from .services import (
    create_playbook,  # Creates a new playbook with the specified name and steps. (src/backend/playbook_engine/services.py)
    update_playbook,  # Updates an existing playbook with new steps. (src/backend/playbook_engine/services.py)
    execute_playbook  # Executes the specified playbook using AI-driven strategies. (src/backend/playbook_engine/services.py)
)

# Global configuration dictionary containing settings for the playbook engine.
config = {
    'ai_model_path': '/path/to/ai/model',  # Path to the AI model used for dynamic playbook generation.
    'threat_intelligence_sources': ['source1', 'source2'],  # List of threat intelligence sources for real-time data integration.
    'playbook_validation_enabled': True,  # Enable validation of playbooks against organizational policies and compliance standards.
    'xsoar_compatibility_mode': True,  # Ensure generated playbooks are compatible with XSOAR platform.
    'version_control_enabled': True,  # Enable version control and audit logging for all playbook modifications.
    'admin_interface_enabled': True,  # Provide interfaces for administrators to manually adjust AI-generated playbooks.
    'logging_level': 'INFO',  # Set the logging level for the playbook engine operations.
    'auto_update_interval_minutes': 15,  # Interval for auto-updating playbooks based on new threat intelligence.
}

def load_config(config_source):
    """
    Loads configuration settings for the playbook engine from a specified source.

    Parameters:
        config_source (str): The path or identifier for the configuration source.

    Returns:
        dict: A dictionary containing the loaded configuration settings.

    Steps:
    1. Read configuration data from the specified source.
    2. Parse the configuration data into a dictionary format.
    3. Update the global configuration with the loaded settings.
    4. Return the dictionary containing the configuration settings.

    Requirements Addressed:
    - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation):
      Ensuring that the playbook engine can utilize configuration settings to adapt playbook generation in real-time based on emerging threats and organizational policies.
    """

    import json  # Standard library import for handling JSON data.

    # Step 1: Read configuration data from the specified source.
    try:
        with open(config_source, 'r') as f:
            config_data = f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"Configuration source '{config_source}' not found.")
    except Exception as e:
        raise Exception(f"An error occurred while reading the configuration source '{config_source}': {e}")

    # Step 2: Parse the configuration data into a dictionary format.
    try:
        loaded_config = json.loads(config_data)
    except json.JSONDecodeError as e:
        raise Exception(f"Error parsing configuration data from '{config_source}': {e}")

    # Step 3: Update the global configuration with the loaded settings.
    global config
    config.update(loaded_config)

    # Step 4: Return the dictionary containing the configuration settings.
    return config

# Example usage:
# config = load_config('config.json')