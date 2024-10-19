# Import statements with versions
from flask import request, jsonify  # Flask version 2.0.1
from src.backend.ai_recommendation_engine.app import app  # Import Flask app instance
from src/backend/ai_recommendation_engine.services import generate_recommendations
from src/backend/ai_recommendation_engine.models import RecommendationData

# Controller logic for AI-powered recommendations
# Addresses Requirement:
# - 'AI-Powered Assistance' (Technical Specification/4.2 AI-Powered Assistance)
#   - Implements machine learning models for generating actionable recommendations. (TR-AI-002-1)
#   - Ensures recommendations are updated in real-time based on incident data. (TR-AI-002-2)
#   - Maintains compliance with data privacy regulations in AI operations. (TR-AI-002-5)

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    """
    Handles HTTP GET requests to retrieve recommendations for a user.

    Requirements Addressed:
    - Provides real-time, context-aware recommendations to support security analysts.
      (Technical Specification/4.2 AI-Powered Assistance)
    - Ensures recommendations are updated in real-time based on incident data. (TR-AI-002-2)
    - Maintains compliance with data privacy regulations in AI operations. (TR-AI-002-5)

    Parameters:
    - user_id (string): The ID of the user requesting recommendations.

    Returns:
    - JSON response containing a list of recommended item IDs.

    Steps:
    1. Extract the user_id from the request arguments.
    2. Create a RecommendationData instance using the user_id.
    3. Call the generate_recommendations function with the RecommendationData instance.
    4. Return the list of recommended item IDs as a JSON response.
    """
    # Step 1: Extract the user_id from the request arguments
    user_id = request.args.get('user_id')
    if not user_id:
        # Return an error response if user_id is not provided
        return jsonify({'error': 'user_id parameter is required.'}), 400

    # Step 2: Create a RecommendationData instance using the user_id
    recommendation_data = RecommendationData(user_id=user_id)

    # Step 3: Call the generate_recommendations function with the RecommendationData instance
    # The generate_recommendations function utilizes AI models to generate actionable recommendations.
    # It accesses real-time data to ensure recommendations are context-aware.
    recommended_items = generate_recommendations(recommendation_data)

    # Step 4: Return the list of recommended item IDs as a JSON response
    # Ensure that the response maintains compliance with data privacy regulations (TR-AI-002-5).
    return jsonify({'recommended_items': recommended_items}), 200

# Note:
# - This controller depends on the generate_recommendations function in services.py
#   and the RecommendationData model in models.py.
# - The app instance is imported from app.py to register the route decorator.