"""
This file is responsible for loading and managing configuration settings for the notification service.
It ensures that all necessary configurations such as database connections, API keys, and service-specific settings
are correctly initialized and accessible throughout the service.

Requirements Addressed:
- Configuration Management (Technical Specification/4.5 Notification and Alert Interface):
  Ensures that the notification service is configured correctly with all necessary settings for operation,
  including database connections and API keys.
"""

from pydantic import BaseSettings  # Pydantic version: 1.8.2

class Config(BaseSettings):
    """
    A Pydantic model representing the configuration settings for the notification service.

    This class initializes the configuration settings with default values or values from environment variables.

    Properties:
    - database_url (str): The database connection URL.
    - api_key (str): The API key for external integrations.
    - service_name (str): The name of the notification service.

    Requirements Addressed:
    - Configuration Management (Technical Specification/4.5 Notification and Alert Interface)
    """

    database_url: str
    api_key: str
    service_name: str

    class Config:
        """
        Pydantic configuration to set environment variable prefix.

        Requirements Addressed:
        - Configuration Management (Technical Specification/4.5 Notification and Alert Interface)
        """
        env_prefix = 'NOTIFICATION_'  # Prefix for environment variables

def load_config() -> Config:
    """
    Loads and validates configuration settings using Pydantic models.

    Steps:
    1. Define a Pydantic model for configuration settings.
    2. Read configuration values from environment variables or a configuration file.
    3. Validate the configuration values using the Pydantic model.
    4. Return the validated configuration instance.

    Returns:
        Config: An instance of the Config class containing validated settings.

    Requirements Addressed:
    - Configuration Management (Technical Specification/4.5 Notification and Alert Interface)
    """
    # Step 1 is completed: Config class is defined above.

    # Step 2 and 3: Read and validate configuration from environment variables.
    config = Config()

    # Step 4: Return the validated configuration instance.
    return config

# Global configuration instance
config = load_config()
# 'config' is now a globally accessible instance containing validated configuration settings for the notification service.