# Required provider for MongoDB
# Version: 1.0.0
# Purpose: Terraform provider for managing MongoDB resources.
# Reference to external dependency as per specification dependencies.
terraform {
  required_providers {
    mongodb = {
      source  = "hashicorp/mongodb"
      version = "1.0.0" # Version specified in dependencies.
    }
  }
}

# Provider configuration (Assuming authentication details are managed securely)
provider "mongodb" {
  # Configuration for connecting to MongoDB provider.
  # Authentication and endpoint details should be provided securely via environment variables or shared credentials.
}

# Variable definitions for module inputs
# Default values are provided as per 'globals' in the specification.

# Variable for MongoDB instance type
# Parameter 'instance_type' as per resource parameters.
variable "instance_type" {
  description = "The instance type to use for the MongoDB instance."
  type        = string
  default     = "db.t3.medium" # Default from globals in specification.
}

# Variable for MongoDB storage size in GB
# Parameter 'storage_size' as per resource parameters.
variable "storage_size" {
  description = "The storage size in GB for the MongoDB instance."
  type        = number
  default     = 20 # Default from globals in specification.
}

# Variable for VPC ID
# Input from internal dependency 'vpc' module.
variable "vpc_id" {
  description = "The ID of the VPC in which to deploy the MongoDB instance."
  type        = string
}

# Variable for Security Group IDs
# Input from internal dependency 'security_groups' module.
variable "security_group_ids" {
  description = "List of security group IDs to associate with the MongoDB instance."
  type        = list(string)
}

# Resource block for creating a MongoDB instance.
# Requirement Addressed:
# - Employ a NoSQL database (e.g., MongoDB) for unstructured data storage.
#   Location: Technical Specification/4.11 Data Management (TR-DM-011-2)
resource "mongodb_instance" "mongodb" {
  description = "Creates a MongoDB instance for unstructured data storage."

  # Define the MongoDB instance type and storage size.
  # Step 1: Define instance type and storage size as per resource parameters.
  instance_type = var.instance_type
  storage_size  = var.storage_size

  # Configure the instance within the specified VPC and security groups.
  # Step 2: Configure VPC and security groups from dependencies.
  vpc_id             = var.vpc_id
  security_group_ids = var.security_group_ids

  # Apply encryption and backup settings as per compliance requirements.
  # Requirements Addressed:
  # - Implement data encryption at rest and in transit using industry-standard protocols (e.g., AES-256, TLS 1.2+).
  #   Location: Technical Specification/4.11 Data Management (TR-DM-011-3)
  # - Develop automated backup and recovery procedures with point-in-time recovery capabilities.
  #   Location: Technical Specification/4.11 Data Management (TR-DM-011-5)
  encryption_at_rest_enabled     = true  # Enables encryption at rest.
  encryption_in_transit_enabled  = true  # Enables encryption in transit.
  backup_enabled                 = true  # Enables automated backups.
  backup_retention_period        = 7     # Retain backups for 7 days.
  backup_window                  = "02:00-03:00" # Backup window as per best practice.

  # Ensure data redundancy and replication across multiple data centers.
  # Requirement Addressed:
  # - Ensure data redundancy and replication across multiple data centers for high availability.
  #   Location: Technical Specification/4.11 Data Management (TR-DM-011-4)
  multi_az_deployment = true # Enables Multi-AZ deployment for high availability.

  # Enforce data retention policies adhering to regulatory requirements.
  # Requirement Addressed:
  # - Enforce data retention policies adhering to regulatory requirements (e.g., GDPR, HIPAA).
  #   Location: Technical Specification/4.11 Data Management (TR-DM-011-6)
  # Additional configuration for data retention policies can be added here.

  # Other configurations can be added here as per compliance and best practices.
}

# Output block for the MongoDB endpoint URL.
# Provides the endpoint URL for applications to connect to the MongoDB instance.
output "mongodb_endpoint" {
  description = "The endpoint URL for the MongoDB instance."
  value       = mongodb_instance.mongodb.endpoint
}