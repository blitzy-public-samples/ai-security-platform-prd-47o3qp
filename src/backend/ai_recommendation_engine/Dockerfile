# Use the official Python 3.8 image as the base image
# External Dependency: Python 3.8 (Technical Specification/4.2 AI-Powered Assistance)
FROM python:3.8  # Version 3.8

# Set the working directory to /app
# This sets the directory where our application's code will reside inside the container
WORKDIR /app

# Copy the requirements.txt file into the container
# Internal Dependency: requirements.txt specifies Python dependencies for the AI Recommendation Engine
COPY requirements.txt /app/

# Install the Python dependencies specified in requirements.txt
# Installing necessary dependencies to implement machine learning models for generating actionable recommendations
# Requirements Addressed: AI-Powered Assistance (Technical Specification/4.2 AI-Powered Assistance, Requirement ID: TR-AI-002)
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code into the container
# Internal Dependencies: app.py, config.py, models.py, services.py, controllers.py, routes.py
COPY . /app

# Expose the necessary port for the Flask application
# Exposing port 5000 for the application to listen on
EXPOSE 5000

# Define the command to run the Flask application using app.py as the entry point
# Entry point for the AI Recommendation Engine application
# This command starts the Flask app which provides real-time, context-aware recommendations
# Related to Requirement ID: TR-AI-002 (Technical Specification/4.2 AI-Powered Assistance)
CMD ["python", "app.py"]