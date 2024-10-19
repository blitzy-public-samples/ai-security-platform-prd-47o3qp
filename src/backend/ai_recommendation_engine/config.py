"""
Configuration settings for the AI Recommendation Engine.
This file includes paths to models and other necessary configurations for
the application to function correctly.

Requirements Addressed:
- AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance):
  Provide configuration settings necessary for generating actionable
  recommendations using AI.
"""

# Global variable for the path to the pre-trained recommendation model.
# Required for implementing machine learning models as per TR-AI-002-1.
MODEL_PATH = '/models/recommendation_model.h5'

# Configuration for real-time data updates.
# Ensures recommendations are updated in real-time based on incident data (Requirement ID: TR-AI-002-2).
REAL_TIME_UPDATES = True

# Data privacy compliance setting.
# Maintains compliance with data privacy regulations in AI operations (Requirement ID: TR-AI-002-5).
DATA_PRIVACY_COMPLIANCE = True

def get_model_path():
    """
    Returns the file path for the pre-trained recommendation model.

    Requirements Addressed:
    - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance):
      Implement machine learning models for generating actionable recommendations
      (Requirement ID: TR-AI-002-1).

    Returns:
        str: The file path to the pre-trained recommendation model.
    """
    # Return the MODEL_PATH global variable.
    return MODEL_PATH