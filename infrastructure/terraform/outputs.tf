// outputs.tf - Defines outputs for infrastructure modules
// This file provides essential information about the resources created, such as IDs, ARNs, and DNS names.
// These outputs are crucial for integration with other systems or for reference in further configurations.

// Requirements Addressed:
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)
//   Ensure seamless integration with existing security tools and external systems through well-documented APIs
//   and support for custom integrations, enhancing the platform's interoperability and functionality.

// External Dependencies:
// - AWS Provider (hashicorp/aws)
//   Version: >= 3.0.0

// Internal Dependencies:
// - main.tf: Orchestrates the deployment of the entire infrastructure using various modules.
// - variables.tf: Defines variables used across the Terraform configuration.
// - providers.tf: Configures the necessary providers for managing infrastructure resources.

///////////////////////////////////////////////////////////////////////////////

// Output: VPC ID
// Provides the ID of the VPC created for the infrastructure.
// This is essential for referencing the VPC in other configurations and integrations.
// Addresses Requirement:
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)

output "vpc_id" {
  description = "The ID of the VPC created for the infrastructure."
  value       = aws_vpc.main.id
}

///////////////////////////////////////////////////////////////////////////////

// Output: ECS Cluster ARN
// Provides the Amazon Resource Name (ARN) of the ECS cluster.
// Enables integration with services that require the ECS cluster ARN.
// Addresses Requirement:
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)

output "ecs_cluster_arn" {
  description = "The ARN of the ECS cluster."
  value       = aws_ecs_cluster.main.arn
}

///////////////////////////////////////////////////////////////////////////////

// Output: ALB DNS Name
// Provides the DNS name of the Application Load Balancer.
// Necessary for routing traffic and integrating with external systems.
// Addresses Requirement:
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)

output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer."
  value       = aws_lb.main.dns_name
}

///////////////////////////////////////////////////////////////////////////////

// Output: S3 Bucket ARN
// Provides the ARN of the S3 bucket used for data storage.
// Allows other services and configurations to reference the bucket.
// Addresses Requirement:
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)

output "s3_bucket_arn" {
  description = "The ARN of the S3 bucket used for data storage."
  value       = aws_s3_bucket.main.arn
}

///////////////////////////////////////////////////////////////////////////////

// Output: IAM Role ARN
// Provides the ARN of the IAM role for managing permissions.
// Essential for granting access to AWS resources in a secure manner.
// Addresses Requirement:
// - Integration Capabilities (Technical Specification/4.10 Integration Capabilities)

output "iam_role_arn" {
  description = "The ARN of the IAM role for managing permissions."
  value       = aws_iam_role.main.arn
}