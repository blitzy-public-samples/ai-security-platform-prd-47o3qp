from typing import List, Dict  # Built-in typing module (Python 3.8+)

class RecommendationData:
    """
    A data model representing the information required to generate recommendations for a user.

    Addresses:
    - Requirement ID: TR-AI-002 (AI-Powered Assistance)
    - Location: Technical Specification/4.2 AI-Powered Assistance
      - Description: Provide data models necessary for generating actionable recommendations using AI.

    This class supports:
    - Implementing machine learning models for generating actionable recommendations (TR-AI-002-1).
    - Ensuring recommendations are updated in real-time based on incident data (TR-AI-002-2).

    Attributes:
        user_id (str): The unique identifier for the user.
        item_ids (List[str]): A list of item identifiers associated with the user.
    """

    def __init__(self, user_id: str, item_ids: List[str]):
        """
        Initializes a RecommendationData instance with a user ID and a list of item IDs.

        Parameters:
            user_id (str): The unique identifier for the user.
            item_ids (List[str]): A list of item identifiers associated with the user.

        Steps:
            1. Assign the user_id to the instance variable.
            2. Assign the item_ids to the instance variable.
        """
        # Assign the user_id to the instance variable.
        self.user_id: str = user_id
        # Assign the item_ids to the instance variable.
        self.item_ids: List[str] = item_ids

    def to_dict(self) -> Dict[str, object]:
        """
        Converts the RecommendationData instance into a dictionary format.

        Returns:
            Dict[str, object]: A dictionary representation of the RecommendationData instance.

        Steps:
            1. Create a dictionary with keys 'user_id' and 'item_ids'.
            2. Assign the instance's user_id and item_ids to the dictionary.
            3. Return the dictionary.
        """
        # Create a dictionary with keys 'user_id' and 'item_ids'.
        data_dict = {
            'user_id': self.user_id,
            'item_ids': self.item_ids
        }
        # Return the dictionary.
        return data_dict