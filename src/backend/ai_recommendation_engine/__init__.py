# __init__.py for AI Recommendation Engine package
# Description: Initializes the AI Recommendation Engine package by importing essential modules and components for generating AI-powered recommendations.
# Requirements Addressed:
# - AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance): Provide real-time, context-aware recommendations and interactive assistance to security analysts during incident investigations.

# Import external dependencies
from flask import Flask  # Flask version 2.0.1; Used for creating the web server and handling HTTP requests.
import tensorflow as tf  # TensorFlow version 2.6.0; Used for loading and running the machine learning model to generate recommendations.

# Import internal modules
from .models import RecommendationData  # Defines the data structure for recommendation-related information.
from .config import get_model_path  # Provides the file path for the pre-trained recommendation model.
from .services import generate_recommendations  # Generates recommendations based on user interaction data.
from .controllers import get_recommendations  # Handles HTTP GET requests to retrieve recommendations.
from .routes import setup_routes  # Configures the Flask app with necessary routes.
from .app import create_app  # Initializes and configures the Flask application.

# Initialize the Flask application
app = create_app()
# Set up the routes for the Flask app
setup_routes(app)

# Load the pre-trained recommendation model
model_path = get_model_path()
recommendation_model = tf.keras.models.load_model(model_path)
# The model is loaded to provide AI-powered recommendations as per requirement TR-AI-002 in Technical Specification/4.2 AI-Powered Assistance.

# Make the app and relevant components available when the package is imported
__all__ = [
    'app',
    'recommendation_model',
    'generate_recommendations',
    'get_recommendations',
    'RecommendationData'
]