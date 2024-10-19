"""
Initializes the playbook engine module, setting up necessary configurations and exposing key functionalities
for managing playbooks, including creation, updating, and execution using AI-driven strategies.

Addresses Requirements:
- Dynamic Playbook Generation (Technical Specification/4.4 Dynamic Playbook Generation)
  - Utilizes artificial intelligence to create and modify security playbooks in real-time.
  - Ensures responsive and adaptive incident handling strategies.

Dependencies:
- Flask (version 2.0.1): Provides the web framework for defining API routes.
- Internal modules: config, models, services, controllers, routes.
"""

# External dependency
from flask import Flask  # Flask version 2.0.1 provides the web framework for defining API routes.

# Internal dependencies
from .config import load_config  # Loads configuration settings for the playbook engine (Technical Specification/4.4.4 TR-DPG-004-2).
from .models import Playbook  # Represents a playbook entity (Technical Specification/4.4.4 TR-DPG-004-1).
from .services import (
    create_playbook,
    update_playbook,
    execute_playbook
)  # Core services for playbook management (Technical Specification/4.4 TR-DPG-004).

from .controllers import (
    create_playbook_controller,
    update_playbook_controller,
    execute_playbook_controller
)  # Handles the logic for playbook operations (Technical Specification/4.4.4 TR-DPG-004-4).

from .routes import initialize_app  # Initializes the Flask application with configurations and routes.

# Global variable 'app': Flask application instance
app = Flask(__name__)  # Initializes the Flask app (Technical Specification/1.3 System Architecture).

# Load configuration settings into the Flask app
load_config(app)
# The load_config function applies settings to the app, enabling dynamic adjustments (Technical Specification/4.4.4 TR-DPG-004-2).

# Initialize the Flask application with routes and controllers
initialize_app(app)
# The initialize_app function sets up API routes and binds controllers to endpoints,
# allowing interaction with playbook functionalities (Technical Specification/4.4.4 TR-DPG-004-4, TR-DPG-004-5).

# Expose key functionalities for managing playbooks
__all__ = [
    'app',
    'create_playbook',
    'update_playbook',
    'execute_playbook',
    'Playbook',
    'create_playbook_controller',
    'update_playbook_controller',
    'execute_playbook_controller'
]
# The __all__ list defines public objects of this module, exposing essential functionalities
# required for dynamic playbook generation and management (Technical Specification/4.4 TR-DPG-004).

"""
By setting up the Flask application and exposing core services and controllers,
this module enables the creation, updating, and execution of playbooks using AI-driven strategies,
thus addressing the requirement for Dynamic Playbook Generation as specified in Technical Specification/4.4.
"""