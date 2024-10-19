# Dockerfile for building the Docker image of the notification service.
# This Dockerfile sets up the environment, installs necessary dependencies, and configures the application to run as a containerized service.
# 
# Requirement Addressed:
# - Name: Containerization
# - Description: Ensures the notification service is containerized for consistent deployment across different environments.
# - Location: Technical Specification/4.5 Notification and Alert Interface

# Step 1: Use the official Python 3.8 image as the base image.
# External Dependency:
# - Name: Python
# - Module: python
# - Version: 3.8
# - Purpose: Base image for running Python applications.
FROM python:3.8  # Version 3.8 specified for consistency across environments.

# Step 2: Set the working directory to /app.
# This sets the directory where the application code will reside inside the container.
WORKDIR /app

# Step 3: Copy the requirements.txt file into the /app directory.
# Internal Dependency:
# - Name: requirements.txt
# - Module: src/backend/notification_service/requirements.txt
# - Purpose: Lists the Python dependencies required for the notification service.
COPY requirements.txt /app/requirements.txt

# Step 4: Run pip install to install the dependencies listed in requirements.txt.
# Installs all necessary Python packages required by the notification service.
RUN pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the rest of the application code into the /app directory.
# Includes all Python modules, configurations, and resources needed to run the service.
COPY . /app

# Step 6: Set the entry point to run the FastAPI application using uvicorn.
# Internal Dependency:
# - Name: app.py
# - Module: src/backend/notification_service/app.py
# - Purpose: Entry point for the notification service application.
# This command starts the FastAPI application, allowing it to accept incoming requests.
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]