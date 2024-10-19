# Dockerfile for building the Incident Management Service Docker image.
# This Dockerfile sets up the environment, installs necessary dependencies,
# and configures the application for deployment.

# Requirements Addressed:
# - Incident Response Automation (Technical Specification/4.1 Incident Response Automation):
#   Automates the detection, logging, analysis, and resolution of security incidents
#   using AI-driven workflows to ensure consistent and efficient incident handling.

# Use the official Python 3.8 image as the base image (Version: 3.8)
FROM python:3.8

# Set the working directory to /app
# This defines where our application code will reside within the container.
WORKDIR /app

# Copy the requirements.txt file into the container.
# The requirements.txt file lists all Python dependencies required by the Incident Management Service.
COPY requirements.txt .

# Install the Python dependencies listed in requirements.txt.
# This includes third-party libraries such as:
# - Flask (Version 1.1.2): Web framework for handling HTTP requests and routing.
# - pymongo (Version 3.6.3): MongoDB client for database operations.
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire incident_management_service directory into the container.
# This includes app.py (Main application entry point) and all application code.
COPY . /app

# Expose the port that the Flask application will run on.
# According to TR-IR-001-5 (Technical Specification/4.1 Incident Response Automation),
# ensure scalability to handle peak incident loads without degradation.
EXPOSE 5000

# Set the entry point to run the Flask application using app.py.
# This command tells Docker what to execute when the container starts.
CMD ["python", "app.py"]