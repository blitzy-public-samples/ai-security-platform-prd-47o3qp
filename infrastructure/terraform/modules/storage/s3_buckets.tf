#############################################
# S3 Buckets Configuration
#
# This Terraform configuration file is responsible for defining and managing
# S3 buckets within the storage module. The S3 buckets are used for storing data,
# backups, and logs, providing a scalable and secure storage solution.
#
# Requirements Addressed:
# - Data Management (Technical Requirements/4.11 Data Management):
#   - TR-DM-011-3 (High Priority): Implement data encryption at rest and in transit using industry-standard protocols (e.g., AES-256, TLS 1.2+).
#   - TR-DM-011-4 (High Priority): Ensure data redundancy and replication across multiple data centers for high availability.
#   - TR-DM-011-6 (High Priority): Enforce data retention policies adhering to regulatory requirements (e.g., GDPR, HIPAA).
#   - TR-DM-011-7 (Medium Priority): Implement data integrity checks using checksums and hash verifications.
# - These requirements ensure robust data storage, retrieval, and processing systems to maintain data integrity, availability, and compliance across all platform components.
#############################################

# External dependency: aws_s3_bucket resource from the 'hashicorp/aws' provider (version >= 3.0.0)
# Purpose: To define and manage AWS S3 buckets.
# Version specified in the provider configuration (see infrastructure/terraform/providers.tf)

# Variables used for configuring S3 buckets (defined in infrastructure/terraform/variables.tf):
# - var.bucket_name_prefix: Defines the prefix for the S3 bucket name.
# - var.tags: A map of tags to apply to the S3 bucket for resource identification and management.

# Resource: aws_s3_bucket "main"
# Description: Defines an S3 bucket for storing data, backups, and logs.

resource "aws_s3_bucket" "main" {
  # Specify the bucket name using the provided prefix.
  # Note: Bucket names must be globally unique in AWS; consider appending unique identifiers.
  bucket = var.bucket_name_prefix

  # Enable versioning to maintain data integrity and support data retention policies
  # as per TR-DM-011-6.
  versioning {
    enabled = true
  }

  # Implement server-side encryption to secure data at rest using industry-standard protocols
  # as specified in TR-DM-011-3.
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  # Apply tags for resource identification and management, supporting resource tracking and
  # cost allocation.
  tags = var.tags
}

# Output: s3_bucket_arn
# Description: The ARN of the created S3 bucket.
# Provides the Amazon Resource Name which uniquely identifies the bucket for use in other resources.

output "s3_bucket_arn" {
  description = "The ARN of the created S3 bucket."
  value       = aws_s3_bucket.main.arn
}