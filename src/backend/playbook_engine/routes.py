"""
Defines the API routes for managing playbooks, including creation, updating, and execution using AI-driven strategies.
Requirements Addressed:
- Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation):
  Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats and
  organizational policies, ensuring responsive and adaptive incident handling strategies.
"""

# External Dependencies
from flask import Flask, request, jsonify  # Provides the web framework for defining API routes. Version: Flask 2.0.1

# Internal Dependencies
from .app import app  # Flask application instance initialized with configurations and routes.
from .controllers import (
    create_playbook_controller,  # Handles the logic for creating a new playbook.
    update_playbook_controller,  # Handles the logic for updating an existing playbook.
    execute_playbook_controller  # Handles the logic for executing a playbook.
)

# Define the route for creating a new playbook
@app.route('/playbooks', methods=['POST'])
def create_playbook_route():
    """
    Defines the route for creating a new playbook.
    Requirements Addressed:
    - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation):
      Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats
      and organizational policies, ensuring responsive and adaptive incident handling strategies.

    Parameters:
        None (Flask uses the global request object)

    Returns:
        JSONResponse: The response containing the created playbook details.
    """
    # Parse the request data for playbook creation
    playbook_data = request.get_json()
    if not playbook_data:
        return jsonify({'error': 'Invalid input data'}), 400

    # Call the create_playbook_controller with the parsed data
    # This step handles the logic for creating a new playbook using AI-driven strategies
    created_playbook = create_playbook_controller(playbook_data)

    # Return the response with the created playbook details
    return jsonify(created_playbook), 201

# Define the route for updating an existing playbook
@app.route('/playbooks/<playbook_id>', methods=['PUT'])
def update_playbook_route(playbook_id):
    """
    Defines the route for updating an existing playbook.
    Requirements Addressed:
    - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation):
      Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats
      and organizational policies, ensuring responsive and adaptive incident handling strategies.

    Parameters:
        playbook_id (str): The ID of the playbook to update.

    Returns:
        JSONResponse: The response indicating the success or failure of the update operation.
    """
    # Parse the request data for playbook update
    update_data = request.get_json()
    if not update_data:
        return jsonify({'error': 'Invalid input data'}), 400

    # Call the update_playbook_controller with the playbook ID and parsed data
    # This step handles the logic for updating an existing playbook using AI-driven strategies
    updated_playbook = update_playbook_controller(playbook_id, update_data)

    if updated_playbook.get('error'):
        # Return error response if update failed
        return jsonify(updated_playbook), 404

    # Return the response indicating the success of the update
    return jsonify(updated_playbook), 200

# Define the route for executing a playbook
@app.route('/playbooks/<playbook_id>/execute', methods=['POST'])
def execute_playbook_route(playbook_id):
    """
    Defines the route for executing a playbook.
    Requirements Addressed:
    - Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation):
      Utilize artificial intelligence to create and modify security playbooks in real-time based on emerging threats
      and organizational policies, ensuring responsive and adaptive incident handling strategies.

    Parameters:
        playbook_id (str): The ID of the playbook to execute.

    Returns:
        JSONResponse: The response indicating the success or failure of the execution operation.
    """
    # Parse the request data for playbook execution (if any execution parameters are provided)
    execution_params = request.get_json() or {}

    # Call the execute_playbook_controller with the playbook ID and execution parameters
    # This step handles the logic for executing the playbook using AI-driven strategies
    execution_result = execute_playbook_controller(playbook_id, execution_params)

    if execution_result.get('error'):
        # Return error response if execution failed
        return jsonify(execution_result), 404

    # Return the response indicating the success of the execution
    return jsonify(execution_result), 200