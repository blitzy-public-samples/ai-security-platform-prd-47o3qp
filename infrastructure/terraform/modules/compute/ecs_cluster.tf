# ECS Cluster Terraform Configuration
#
# This Terraform configuration file defines and manages the ECS (Elastic Container Service) cluster within the compute module.
#
# Requirement Addressed:
# - Name: Scalability and Performance
#   - Location: Technical Specification/1.1 System Objectives
#   - Description: Design a scalable architecture capable of handling increasing data volumes and user bases without performance degradation.
#
# Dependencies:
# - Internal:
#   - security_groups (infrastructure/terraform/modules/network/security_groups.tf)
#     - Purpose: Defines security groups associated with the ECS cluster for controlling inbound and outbound traffic.
#   - vpc (infrastructure/terraform/modules/network/vpc.tf)
#     - Purpose: Provides the VPC configuration necessary for the ECS cluster's networking.
# - External:
#   - Provider: hashicorp/aws >= 3.0.0  # AWS provider version >= 3.0.0
#     - Purpose: To define and manage AWS ECS clusters.

# Variable: cluster_name
#
# The name of the ECS cluster to be created.
# Default value is "my-ecs-cluster" as specified in the globals.
variable "cluster_name" {
  description = "The name of the ECS cluster."
  type        = string
  default     = "my-ecs-cluster"
}

# Variable: tags
#
# A map of tags to assign to the ECS cluster for resource identification and management.
variable "tags" {
  description = "A map of tags to assign to the ECS cluster."
  type        = map(string)
  default     = {}
}

# Resource: aws_ecs_cluster.main
#
# This resource defines an ECS cluster to run containerized applications on AWS.
# It addresses the requirement of designing a scalable architecture capable of handling increasing data volumes and user bases without performance degradation.
# Requirement Location: Technical Specification/1.1 System Objectives
#
# Steps:
# 1. Create an ECS cluster with the specified name.
# 2. Attach tags to the ECS cluster for resource identification and management.
resource "aws_ecs_cluster" "main" {
  name = var.cluster_name
  tags = var.tags
}

# Output: cluster_arn
#
# The ARN of the created ECS cluster.
output "cluster_arn" {
  description = "The ARN of the created ECS cluster."
  value       = aws_ecs_cluster.main.arn
}