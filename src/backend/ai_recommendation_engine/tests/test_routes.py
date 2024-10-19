"""
Unit tests for the routes defined in the AI Recommendation Engine.

This file contains tests for the '/recommendations' endpoint to ensure it returns
the correct recommendations for a given user.

Requirements Addressed:
- AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance)
  - Ensure the AI Recommendation Engine's routes provide real-time, context-aware recommendations and interactive assistance.
  - TR-AI-002-1: Implement machine learning models for generating actionable recommendations.
  - TR-AI-002-2: Ensure recommendations are updated in real-time based on incident data.
"""

# External Dependencies
import pytest  # pytest version 6.2.4
from flask import json  # Flask version 2.0.1
from flask_testing import TestCase  # Flask-Testing version 0.8.1

# Internal Dependencies
from src.backend.ai_recommendation_engine.app import create_app  # Initializes and configures the Flask application for the AI Recommendation Engine.
from src.backend.ai_recommendation_engine.routes import setup_routes  # Configures the Flask app with the necessary routes for the AI Recommendation Engine.


class TestRecommendationRoutes(TestCase):
    """
    TestCase for testing the recommendation routes of the AI Recommendation Engine.
    """

    def create_app(self):
        """
        Creates and configures a new app instance for testing.

        Returns:
            Flask app instance configured for testing.
        """
        app = create_app()
        setup_routes(app)
        app.config['TESTING'] = True
        return app

    @pytest.mark.parametrize("user_id, expected_recommendations", [
        (1, ["Recommendation A", "Recommendation B"]),
        (2, ["Recommendation C", "Recommendation D"]),
        (3, ["Recommendation E", "Recommendation F"]),
    ])
    def test_get_recommendations(self, user_id, expected_recommendations):
        """
        Tests the '/recommendations' endpoint with different user IDs.

        Parameters:
            user_id (int): The ID of the user to get recommendations for.
            expected_recommendations (list): The expected recommendations for the user.

        Returns:
            None

        Steps:
        - Send a GET request to the '/recommendations' endpoint with the user ID.
        - Assert that the response status code is 200.
        - Assert that the response data matches the expected recommendations.

        Requirements Addressed:
        - TR-AI-002 (Technical Specification/4.2 AI-Powered Assistance)
          - Ensures the endpoint provides real-time, context-aware recommendations.
        """
        # Send a GET request to the '/recommendations' endpoint with the user ID.
        response = self.client.get(f'/recommendations?user_id={user_id}')

        # Assert that the response status code is 200.
        self.assertEqual(response.status_code, 200, f"Expected status code 200, got {response.status_code}")

        # Parse the response data.
        data = json.loads(response.data)

        # Assert that the response data matches the expected recommendations.
        self.assertEqual(data.get('recommendations'), expected_recommendations,
                         f"Expected recommendations {expected_recommendations}, got {data.get('recommendations')}")