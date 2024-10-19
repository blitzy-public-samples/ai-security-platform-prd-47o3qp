# Start from the official Python 3.8 base image
# External Dependency: Python 3.8 base image
# Purpose: Provides the Python environment needed to run the Playbook Engine.
# Version specified in 'dependencies.external' of the JSON specification.
FROM python:3.8

# Set the working directory inside the Docker image to /app
# This is where the application code will reside in the container.
WORKDIR /app

# Copy the requirements.txt file into the Docker image at /app/
# Internal Dependency: requirements.txt
# Purpose: Lists the Python package dependencies required for the Playbook Engine.
# Referenced in 'dependencies.internal' of the JSON specification.
COPY requirements.txt /app/

# Install the Python dependencies listed in requirements.txt
# This installs all necessary Python packages for the Playbook Engine to function.
# Requirements Addressed:
# - Supports 'Dynamic Playbook Generation' by installing AI and ML libraries needed for real-time playbook creation.
# - Addresses Technical Requirements TR-DPG-004-1 and TR-DPG-004-2:
#   - TR-DPG-004-1: Develop AI algorithms for generating standardized playbooks compatible with XSOAR.
#   - TR-DPG-004-2: Incorporate real-time threat intelligence into playbook creation.
# - Refer to 'Technical Specification/4.4 Dynamic Playbook Generation'.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application source code into the Docker image at /app
# Internal Dependencies:
# - app.py: Initializes the Playbook Engine application.
#   - Purpose: Entry point for the Playbook Engine, starting the application.
#   - Referenced in 'dependencies.internal' of the JSON specification.
# - config.py: Loads configuration settings for the Playbook Engine.
#   - Purpose: Handles configuration parameters necessary for operation.
#   - Referenced in 'dependencies.internal' of the JSON specification.
# - Other source files necessary for the application.
COPY . /app

# Specify the command to run the application
# This starts the Playbook Engine by executing app.py.
CMD ["python", "app.py"]