import unittest  # Built-in module for unit testing (version: built-in)
from src.backend.ai_recommendation_engine.models import RecommendationData  # Importing RecommendationData model for testing

class TestRecommendationData(unittest.TestCase):
    """
    A test suite for the RecommendationData class.

    Requirements Addressed:
    - AI-Powered Assistance
      Location: Technical Specification/4.2 AI-Powered Assistance
      Description: Ensure the integrity and correctness of data models used for generating actionable recommendations.
    """

    def test_recommendation_data_initialization(self):
        """
        Tests the initialization of the RecommendationData class.

        Steps:
        1. Create an instance of RecommendationData with a sample user_id and item_ids.
        2. Assert that the user_id is correctly assigned.
        3. Assert that the item_ids are correctly assigned.

        This test verifies that the RecommendationData model properly initializes its attributes,
        ensuring data integrity as per the requirement specified in Technical Specification/4.2 AI-Powered Assistance.
        """
        # Step 1: Create an instance with sample data
        sample_user_id = 'user_123'
        sample_item_ids = ['item_1', 'item_2', 'item_3']
        recommendation_data = RecommendationData(user_id=sample_user_id, item_ids=sample_item_ids)

        # Step 2: Assert that the user_id is correctly assigned
        self.assertEqual(
            recommendation_data.user_id,
            sample_user_id,
            "The user_id should be correctly assigned."
        )

        # Step 3: Assert that the item_ids are correctly assigned
        self.assertEqual(
            recommendation_data.item_ids,
            sample_item_ids,
            "The item_ids should be correctly assigned."
        )

    def test_recommendation_data_to_dict(self):
        """
        Tests the to_dict method of the RecommendationData class.

        Steps:
        1. Create an instance of RecommendationData with a sample user_id and item_ids.
        2. Call the to_dict method on the instance.
        3. Assert that the returned dictionary matches the expected structure and values.

        This test ensures that the to_dict method accurately serializes the data model,
        complying with the requirements in Technical Specification/4.2 AI-Powered Assistance.
        """
        # Step 1: Create an instance with sample data
        sample_user_id = 'user_123'
        sample_item_ids = ['item_1', 'item_2', 'item_3']
        recommendation_data = RecommendationData(user_id=sample_user_id, item_ids=sample_item_ids)

        # Step 2: Call the to_dict method
        result_dict = recommendation_data.to_dict()

        # Step 3: Assert that the returned dictionary matches the expected structure and values
        expected_dict = {
            'user_id': sample_user_id,
            'item_ids': sample_item_ids
        }
        self.assertEqual(
            result_dict,
            expected_dict,
            "The to_dict method should return the correct dictionary representation."
        )