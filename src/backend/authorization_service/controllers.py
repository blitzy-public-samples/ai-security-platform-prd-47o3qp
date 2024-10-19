from flask import request, jsonify  # Flask version: 2.0.1
from .models import Role, Permission  # Defines the user roles and associated permissions.
from .services import assign_role_to_user, check_permission  # Provides role assignment and permission checking functionalities.
from .app import app  # Import the Flask app instance.

@app.route('/roles', methods=['POST'])
def create_role():
    """
    Creates a new role with specified permissions.

    Addresses Requirement:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      - Technical Requirements/4.6 User and System Management
        - Requirement ID: TR-USM-006
        - Description: Implement Role-Based Access Control (RBAC) for user permissions.

    Returns:
        dict: A dictionary containing the status and details of the created role.
    """
    # Step 1: Parse the role_name and permissions from the request.
    data = request.get_json()
    role_name = data.get('role_name')
    permissions = data.get('permissions', [])

    # Validate input data
    if not role_name:
        return jsonify({'status': 'failure', 'message': 'Role name is required'}), 400
    if not isinstance(permissions, list):
        return jsonify({'status': 'failure', 'message': 'Permissions must be a list'}), 400

    # Step 2: Create a new Role instance using the parsed data.
    new_role = Role(name=role_name)

    # Step 2.1: Retrieve Permission instances based on provided permission names or IDs.
    permission_objects = []
    for perm in permissions:
        # Assuming 'perm' can be either permission name or ID.
        if isinstance(perm, int):
            # Fetch Permission by ID
            permission = Permission.get_by_id(perm)
        elif isinstance(perm, str):
            # Fetch Permission by name
            permission = Permission.get_by_name(perm)
        else:
            # Invalid permission format
            permission = None

        if permission:
            permission_objects.append(permission)
        else:
            # Permission does not exist
            return jsonify({'status': 'failure', 'message': f'Permission {perm} does not exist'}), 400

    # Step 2.2: Associate permissions with the role.
    new_role.permissions = permission_objects

    # Step 3: Save the Role instance to the database.
    try:
        new_role.save()
    except Exception as e:
        # Log the exception for debugging purposes (implementation not shown).
        return jsonify({'status': 'failure', 'message': 'Error saving the role to the database'}), 500

    # Step 4: Return a response indicating the success of the operation.
    return jsonify({
        'status': 'success',
        'message': 'Role created successfully',
        'role': new_role.to_dict()
    }), 201

@app.route('/assign-role', methods=['POST'])
def assign_role():
    """
    Assigns an existing role to a user.

    Addresses Requirement:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      - Technical Requirements/4.6 User and System Management
        - Requirement ID: TR-USM-006
        - Description: Implement Role-Based Access Control (RBAC) for user permissions.

    Returns:
        dict: A dictionary containing the status of the assignment operation.
    """
    # Step 1: Parse the user_id and role_id from the request.
    data = request.get_json()
    user_id = data.get('user_id')
    role_id = data.get('role_id')

    # Validate input data
    if not user_id:
        return jsonify({'status': 'failure', 'message': 'User ID is required'}), 400
    if not role_id:
        return jsonify({'status': 'failure', 'message': 'Role ID is required'}), 400

    # Step 2: Call the assign_role_to_user function from the services module.
    try:
        # The 'assign_role_to_user' function assigns a role to a user and returns True if successful.
        assignment_result = assign_role_to_user(user_id, role_id)
    except Exception as e:
        # Log the exception for debugging purposes (implementation not shown).
        return jsonify({'status': 'failure', 'message': 'Error assigning role to user'}), 500

    # Step 3: Return a response indicating the success or failure of the role assignment.
    if assignment_result:
        return jsonify({'status': 'success', 'message': 'Role assigned to user successfully'}), 200
    else:
        return jsonify({'status': 'failure', 'message': 'Failed to assign role to user'}), 400