# Dockerfile for building the Authorization Service container
#
# This Dockerfile sets up the environment with necessary dependencies and configurations
# for implementing Role-Based Access Control (RBAC) for user permissions.
#
# Requirement Addressed:
# - Name: Role-Based Access Control (RBAC)
# - Location: Technical Requirements/4.6 User and System Management
#   - Description: Implement Role-Based Access Control (RBAC) for user permissions.

# Use the official Python 3.8 image as the base image
# We use Python 3.8 to ensure compatibility with our codebase and dependencies
FROM python:3.8  # Base Image: python:3.8 (version 3.8)

# Set the working directory within the container to /app
# All subsequent commands will be run in this directory
WORKDIR /app

# Copy the requirements.txt file into the container at /app/
# The requirements.txt lists all the Python dependencies required for the authorization service
COPY requirements.txt /app/

# Install the Python dependencies listed in requirements.txt
# This includes packages necessary for RBAC implementation and other functionalities
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire authorization service source code into the container
# This includes app.py (the entry point for the authorization service application)
# and other modules required for the service to run
COPY . /app

# Expose port 5000 to allow external access to the authorization service
# The service runs on port 5000 by default
EXPOSE 5000

# Set the entry point to run the Flask application using app.py
# app.py starts the authorization service which includes RBAC functionality as per the requirements
CMD ["python", "app.py"]