# Third-party imports
from flask import Flask  # Flask version 2.0.1

# Internal imports
from src.backend.playbook_engine.config import load_config
from src.backend.playbook_engine.routes import (
    create_playbook_route,
    update_playbook_route,
    execute_playbook_route,
)

def initialize_app():
    """
    Initializes the Flask application with configurations and routes.

    Requirements Addressed:
    - Dynamic Playbook Generation (Requirement ID: TR-DPG-004)
      Location: Technical Specification/4.4 Dynamic Playbook Generation
      Description:
      Utilize artificial intelligence to create and modify security playbooks in real-time
      based on emerging threats and organizational policies, ensuring responsive and adaptive
      incident handling strategies.

    Returns:
        Flask: The initialized Flask application instance.
    """
    # Step 1: Create a Flask application instance.
    # Initialize the Flask app which will serve as the core of the playbook engine.
    app = Flask(__name__)

    # Step 2: Load configuration settings using load_config.
    # This step ensures that the application is configured according to the organization's
    # policies and supports dynamic playbook generation as per TR-DPG-004.
    load_config(app)

    # Step 3: Register routes for playbook management.
    # Registering the routes for creating, updating, and executing playbooks.
    # These routes enable dynamic management of playbooks to respond to emerging threats,
    # aligning with the requirement for responsive and adaptive incident handling strategies.
    app.register_blueprint(create_playbook_route)
    app.register_blueprint(update_playbook_route)
    app.register_blueprint(execute_playbook_route)

    # Step 4: Return the initialized Flask application instance.
    return app

if __name__ == "__main__":
    # Initialize the application and start the Flask development server.
    # The server listens on all interfaces on port 5000.
    app = initialize_app()
    app.run(host='0.0.0.0', port=5000)