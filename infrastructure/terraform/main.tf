################################################################################
# Main Terraform configuration file
# Location: infrastructure/terraform/main.tf
#
# Description:
# The main Terraform configuration file orchestrates the deployment of the entire
# infrastructure. It integrates various modules and configurations to set up a
# scalable and secure environment on AWS, including network, compute, storage,
# and IAM resources.
#
# Requirements Addressed:
# 1. Scalability and Performance
#    - Location: Technical Specification/1.1 System Objectives
#    - Description: Design a scalable architecture capable of handling increasing
#      data volumes and user bases without performance degradation.
# 2. Security and Compliance
#    - Location: Technical Requirements/TR-SC-013
#    - Description: Ensure the platform is secure against unauthorized access,
#      data breaches, and other security threats through robust authentication,
#      authorization, encryption, and compliance with relevant regulations.
################################################################################

###############################################################################
# Module: VPC
# Source: infrastructure/terraform/modules/network/vpc.tf
#
# Purpose:
# Defines the Virtual Private Cloud (VPC) settings for network isolation and
# security, addressing the need for a secure network environment.
#
# Requirements Addressed:
# - Security and Compliance (Technical Requirements/TR-SC-013)
#   Ensures network isolation to protect resources from unauthorized access.
###############################################################################

module "vpc" {
  source = "./modules/network/vpc"

  # CIDR block for the VPC
  cidr_block = var.vpc_cidr_block

  # Enable DNS support in the VPC
  enable_dns_support = true

  # Enable DNS hostnames in the VPC
  enable_dns_hostnames = true

  # Tags for resource identification and management
  tags = {
    Name        = "${var.project_name}-vpc"
    Environment = var.environment
  }

  # Steps:
  # 1. Create a VPC with the specified CIDR block.
  # 2. Enable DNS support and hostnames for the VPC.
  # 3. Attach tags for resource identification and management.
}

###############################################################################
# Module: ECS Cluster
# Source: infrastructure/terraform/modules/compute/ecs_cluster.tf
#
# Purpose:
# Defines the ECS cluster configurations for running containerized applications,
# supporting the scalability of compute resources.
#
# Requirements Addressed:
# - Scalability and Performance (Technical Specification/1.1 System Objectives)
#   Provides a scalable compute environment to handle increasing workloads.
###############################################################################

module "ecs_cluster" {
  source = "./modules/compute/ecs_cluster"

  # Name of the ECS cluster
  name = "${var.project_name}-ecs-cluster"

  # Tags for resource identification and management
  tags = {
    Name        = "${var.project_name}-ecs-cluster"
    Environment = var.environment
  }

  # Steps:
  # 1. Create an ECS cluster with the specified name.
  # 2. Attach tags for resource identification and management.
}

###############################################################################
# Module: Security Groups
# Source: infrastructure/terraform/modules/network/security_groups.tf
#
# Purpose:
# Defines security groups for controlling network access to resources, enhancing
# security by restricting inbound and outbound traffic.
#
# Requirements Addressed:
# - Security and Compliance (Technical Requirements/TR-SC-013)
#   Implements network-level security controls to prevent unauthorized access.
###############################################################################

module "security_groups" {
  source = "./modules/network/security_groups"

  vpc_id = module.vpc.vpc_id

  # Security group configurations are defined within the module.
  # Ensures only authorized traffic can access the resources.
}

###############################################################################
# Module: IAM Roles
# Source: infrastructure/terraform/modules/iam/iam_roles.tf
#
# Purpose:
# Defines IAM roles for managing permissions and access control, ensuring that
# services have the necessary permissions to operate securely.
#
# Requirements Addressed:
# - Security and Compliance (Technical Requirements/TR-SC-013)
#   Enforces strict access controls and permissions management.
###############################################################################

module "iam_roles" {
  source = "./modules/iam/iam_roles"

  # IAM role configurations are defined within the module.
  # Provides necessary permissions while adhering to the principle of least privilege.
}

###############################################################################
# Module: S3 Buckets
# Source: infrastructure/terraform/modules/storage/s3_buckets.tf
#
# Purpose:
# Defines S3 bucket configurations for data storage, ensuring secure and reliable
# storage of data.
#
# Requirements Addressed:
# - Scalability and Performance (Technical Specification/1.1 System Objectives)
#   Offers scalable storage solutions to handle increasing data volumes.
# - Security and Compliance (Technical Requirements/TR-SC-013)
#   Ensures data at rest is secure and access is controlled.
###############################################################################

module "s3_buckets" {
  source = "./modules/storage/s3_buckets"

  # S3 bucket configurations are defined within the module.
  # Implements encryption and access controls as per security requirements.
}

###############################################################################
# Module: ALB (Application Load Balancer)
# Source: infrastructure/terraform/modules/load_balancer/alb.tf
#
# Purpose:
# Defines the Application Load Balancer settings for distributing traffic,
# enhancing performance and reliability of applications.
#
# Requirements Addressed:
# - Scalability and Performance (Technical Specification/1.1 System Objectives)
#   Distributes incoming traffic to multiple targets, ensuring high availability.
###############################################################################

module "alb" {
  source = "./modules/load_balancer/alb"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.public_subnet_ids

  # ALB configurations are defined within the module.
  # Facilitates load balancing across multiple ECS services.
}

###############################################################################
# Module: ECS Service
# Source: infrastructure/terraform/modules/compute/ecs_service.tf
#
# Purpose:
# Defines ECS service configurations for managing containerized applications,
# enabling deployment of scalable and resilient services.
#
# Requirements Addressed:
# - Scalability and Performance (Technical Specification/1.1 System Objectives)
#   Automates scaling of containerized applications based on demand.
###############################################################################

module "ecs_service" {
  source = "./modules/compute/ecs_service"

  cluster_arn        = module.ecs_cluster.cluster_arn
  task_definition    = module.ecs_task.task_definition_arn
  desired_count      = var.ecs_desired_count
  subnet_ids         = module.vpc.private_subnet_ids
  security_group_ids = [module.security_groups.ecs_service_sg_id]
  load_balancer_arn  = module.alb.alb_arn

  # ECS service configurations are defined within the module.
  # Manages the deployment and scaling of ECS tasks.
}

###############################################################################
# Module: Databases
# Sources:
# - MongoDB: infrastructure/terraform/modules/database/mongodb.tf
# - PostgreSQL: infrastructure/terraform/modules/database/postgresql.tf
#
# Purpose:
# Defines database configurations and resources, providing scalable and secure
# data storage solutions.
#
# Requirements Addressed:
# - Scalability and Performance (Technical Specification/1.1 System Objectives)
#   Supports increasing data volumes with scalable database solutions.
# - Security and Compliance (Technical Requirements/TR-DM-011)
#   Ensures data is securely stored and managed according to compliance standards.
###############################################################################

module "mongodb" {
  source = "./modules/database/mongodb"

  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids
  security_group_ids = [module.security_groups.db_sg_id]

  # MongoDB configurations are defined within the module.
  # Provides unstructured data storage with necessary security measures.
}

module "postgresql" {
  source = "./modules/database/postgresql"

  vpc_id             = module.vpc.vpc_id
  subnet_ids         = module.vpc.private_subnet_ids
  security_group_ids = [module.security_groups.db_sg_id]

  # PostgreSQL configurations are defined within the module.
  # Provides structured data storage with necessary security measures.
}

###############################################################################
# Outputs
# Provides essential information about the created resources, facilitating
# integration and further configurations.
###############################################################################

output "vpc_id" {
  description = "The ID of the created VPC."
  value       = module.vpc.vpc_id

  # Requirement Addressed:
  # - Facilitates resource management and integration by providing the VPC ID.
}

output "ecs_cluster_arn" {
  description = "The ARN of the ECS cluster."
  value       = module.ecs_cluster.cluster_arn

  # Requirement Addressed:
  # - Necessary for deploying ECS services and tasks within the cluster.
}

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer."
  value       = module.alb.alb_dns_name

  # Requirement Addressed:
  # - Provides the endpoint for accessing applications behind the ALB.
}

output "mongodb_endpoint" {
  description = "The endpoint for the MongoDB database."
  value       = module.mongodb.endpoint

  # Requirement Addressed:
  # - Allows applications to connect to the MongoDB database securely.
}

output "postgresql_endpoint" {
  description = "The endpoint for the PostgreSQL database."
  value       = module.postgresql.endpoint

  # Requirement Addressed:
  # - Allows applications to connect to the PostgreSQL database securely.
}